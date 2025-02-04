"use server";
import fs from 'fs';

const path = './form.txt';

export async function GET(request: Request) {
    const content = fs.readFileSync(path, { flag: 'a+' })
        .toString().trim();

    return new Response(JSON.stringify({ content: content.toString() }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}

export async function POST(request: Request) {
    void request;

    const formData = await request.formData();
    const name = formData.get('name');
    const pass = formData.get('pass');
    const content = "Name: " + name + "\n" +
        "PASS: " + pass;

    fs.writeFileSync(path, content);

    return new Response(JSON.stringify({ status: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}