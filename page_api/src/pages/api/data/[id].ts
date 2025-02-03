import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    name: string,
    mail: string,
    age: string
};

const data = [
    {
        "name": "kim",
        "mail": "kim@gilbut",
        "age": "39"
    },
    {
        "name": "lee",
        "mail": "lee@flower",
        "age": "28"
    },
    {
        "name": "park",
        "mail": "park@happy",
        "age": "17"
    },
    {
        "name": "joe",
        "mail": "joe@change",
        "age": "6"
    },
];

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    // req.query.id가 undefined일 경우 기본값을 0으로 설정
    const id = parseInt(req.query.id as string, 10);
    const validId = Math.max(0, Math.min(id, data.length - 1));
    const result = data[validId];
    res.status(200).json(result);
}