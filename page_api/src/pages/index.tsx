"use client";

import { Inter } from "next/font/google";
import useSWR from 'swr';

const inter = Inter({ subsets: ['latin'] });

const url = '/api/hello';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(res => res.json());

export default function Home() {

  const { data, error, isLoading } = useSWR(url, fetcher);

  return (
    <main>
      <h1 className="header">Index page</h1>
      <p>API를 이용하는 예제입니다.</p>
      <p className="border p-3">
        result: {error ? "ERROR!!" : isLoading ? "loading..." : data.name}
      </p>
    </main>
  );
}