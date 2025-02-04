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
    // req.query.id가 undefined이거나 string[]일 경우 오류를 방지하기 위해 parseInt 사용
    const id = parseInt(req.query.id as string, 10);
    // Math.max(0, Math.min(id, data.length - 1))을 사용하여 배열 인덱스가 범위를 벗어나지 않도록 보정
    const validId = Math.max(0, Math.min(id, data.length - 1));
    const result = data[validId];
    res.status(200).json(result);
}