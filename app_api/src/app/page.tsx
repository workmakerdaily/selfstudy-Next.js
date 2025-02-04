"use client";
import { useState } from 'react';
import useSWR from 'swr';

const url = 'http://localhost:3000/rh';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(res => res.json());

export default function Home() {

  const [input, setInput] = useState('');
  const { data, error, mutate, isLoading } = useSWR(url, fetcher);

  const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    setInput(val);
    mutate(url + val);
  };

  const doAction = () => {
    const opts = {
      method: 'POST',
      body: JSON.stringify({ content: input })
    };
    fetch(url, opts).then(resp => {
      setInput('');
      mutate(url);
    });
  }

  return (
    <main>
      <h1 className="title">Index page</h1>
      <p className="msg font-bold">
        SWR로 데이터를 가져옵니다.
      </p>
      <input type="text" className="input m-5"
        value={input} onChange={doChange} />
      <button onClick={doAction} className="btn">Click</button>
      <pre className="msg border p-2">
        {error ? 'ERROR!!' : isLoading ?
          'loading...' : data.content}
      </pre>
    </main>
  );
}