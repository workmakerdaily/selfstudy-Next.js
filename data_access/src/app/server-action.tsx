"use server";
import { redirect } from "next/navigation";
import fs from 'fs';

const fname = './data.txt';

if (!fs.existsSync(fname)) {
    fs.writeFileSync(fname, '', 'utf8'); // 빈 파일 생성
}

export async function serverAction(form: FormData) {
    const input = form.get("input");
    fs.appendFileSync(fname, input + "\n");
    redirect('/other');
}

export async function readData() {
    const data = fs.readFileSync(fname, 'utf8');
    return data;
}