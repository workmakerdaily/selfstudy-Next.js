"use server";
import OpenAI from "openai";

const api_key = process.env.OPENAI_API_KEY;

const openai = new OpenAI({ apiKey: api_key });

export async function GET(request: Request) {
    return new Response(JSON.stringify({ content: 'nodata.' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    const input = await request.json();

    // OpenAI가 요구하는 정확한 타입을 따르게 함함
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
        {
            role: "user", // role은 반드시 "user", "assistant", "system" 중 하나여야 함
            content: input.prompt as string // content는 반드시 string이어야 함
        }
    ];

    try {
        const resp = await openai.chat.completions.create({
            messages: messages,
            model: "gpt-3.5-turbo",
        });

        const message = resp.choices[0].message;
        const res = { content: message.content?.trim() };

        return new Response(JSON.stringify(res), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("OpenAI API Error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch response from OpenAI." }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
