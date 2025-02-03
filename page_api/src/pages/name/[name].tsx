import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ['latin'] });

interface Data {
    title: string;
    msg: string;
}

interface Props {
    initialData: Data;
}

export default function Name({ initialData }: Props) {
    const router = useRouter();
    const [data, setData] = useState(initialData);

    useEffect(() => {
        const interval = setInterval(() => {
            const d = new Date().toISOString();
            setData((prev) => ({
                ...prev,
                msg: prev.title + " (" + d + ")"
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <main>
            <h1 className="header">{data.title}</h1>
            <p>name: {router.query.name}</p>
            <p>message: {data.msg}</p>
            <div><Link href="/">Go Back!!</Link></div>
        </main>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = [
        { params: { name: "kim" } },
        { params: { name: "lee" } },
        { params: { name: "park" } }
    ];

    return {
        paths,
        fallback: "blocking" // 정적 페이지가 없으면 서버에서 생성 후 제공
    };
};

const data = {
    kim: {
        title: "김철수",
        msg: "김철수입니다."
    },
    lee: {
        title: "이영희",
        msg: "이영희예요~~"
    },
    park: {
        title: "박지영",
        msg: "박지영입니다~"
    }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const name = params?.name as keyof typeof data;

    return {
        props: {
            initialData: data[name] || { title: "Unknown", msg: "페이지를 찾을 수 없습니다." }
        },
        revalidate: 15 // ISR: 15초마다 페이지 재생성
    };
};
