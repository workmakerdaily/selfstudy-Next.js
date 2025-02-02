import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";

const inter = Inter({ subsets: ['latin'] });

interface Data {
    title: string;
    msg: string;
}

interface Props {
    data: Data;
}

export default function Name({ data }: Props) {

    const router = useRouter();

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
    const path = [
        '/name/kim',
        '/name/lee',
        '/name/park'
    ];
    return {
        paths: path,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps<Props> = async ({ params }) => {
    const dataMap: Record<string, Data> = {
        kim: {
            title: 'KIM-web',
            msg: "This is Kim's web site."
        },
        lee: {
            title: 'Lee의 방',
            msg: '여기는 Lee의 방입니다.'
        },
        park: {
            title: 'Park의 페이지',
            msg: '안녕! Park의 페이지입니다!'
        }
    };

    if (!params?.name || !dataMap[params.name as string]) {
        return {
            notFound: true
        };
    }

    return {
        props: {
            data: dataMap[params.name as string]
        }
    };
}