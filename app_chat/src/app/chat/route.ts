"use server";

export async function POST(request: Request) {
    try {
        const { input } = await request.json();
        if (!input) {
            return new Response(JSON.stringify({ error: "입력이 비어 있습니다." }), { status: 400 });
        }

        const api_key = process.env.OPENAI_API_KEY;
        if (!api_key) {
            return new Response(JSON.stringify({ error: "API Key가 없습니다." }), { status: 500 });
        }

        const openaiUrl = "https://api.openai.com/v1/chat/completions";
        const body_content = {
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "한국어로 100글자 이내로 응답하세요." },
                { role: "user", content: input }
            ]
        };

        const response = await fetch(openaiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            body: JSON.stringify(body_content)
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: `OpenAI 요청 실패: ${response.status}` }), { status: response.status });
        }

        const json_data = await response.json();
        const result = json_data.choices?.[0]?.message?.content?.trim() || "응답을 가져올 수 없습니다.";

        return new Response(JSON.stringify({ response: result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        console.error("API 요청 중 오류 발생:", error);
        return new Response(JSON.stringify({ error: "서버 오류 발생" }), { status: 500 });
    }
}
