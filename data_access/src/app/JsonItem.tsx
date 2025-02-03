"use client";

interface Props {
    data: {
        name: string;
        mail: string;
        age: string;
    };
}

export default function JsonItem({ data }: Props) {
    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.mail}</td>
            <td>{data.age}</td>
        </tr>
    );
}
