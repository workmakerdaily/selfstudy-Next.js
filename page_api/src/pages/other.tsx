import { Inter } from "next/font/google";
import Link from "next/link";
import { GetStaticProps } from "next";

const inter = Inter({ subsets: ["latin"] });

interface Data {
    title: string;
    msg: string;
}

interface Props {
    data: Data;
}

export default function Other({ data }: Props) {
    return (
        <main>
            <h1 className="header">{data.title}</h1>
            <p>{data.msg}</p>
            <div>
                <Link href="/">Go Back!!</Link>
            </div>
        </main>
    );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
    const data: Data = {
        title: "Other page",
        msg: "정적 속성 예제입니다."
    };

    return {
        props: {
            data
        }
    };
};
