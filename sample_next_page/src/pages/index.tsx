import { Inter } from "next/font/google";
import Link from "next/link";
import { GetStaticProps } from "next";

interface Data {
  title: string;
  msg: string;
}

interface Props {
  data: Data;
}

const inter = Inter({ subsets: ['latin'] });

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const data: Data = {
    title: "Index page.",
    msg: "시작페이지입니다."
  };
  return { props: { data } };
};

export default function Home({ data }: Props) {
  return (
    <main>
      <p>{data.msg}</p>
      <div><Link href="/other">Go "Other".</Link></div>
    </main>
  );
}
