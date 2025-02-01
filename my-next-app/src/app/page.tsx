'use client';

import { useState } from "react";
import Link from 'next/link';

export default function Home() {

  const [input, setInput] = useState("");
  const [message, setMessage] = useState("your name:");

  const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  const doClick = () => {
    setMessage("Hello, " + input + "!!");
    setInput("");
  };

  return (
    <main>
      <h1 className="title">Next.js sample.</h1>
      <p className="msg">{message}</p>
      <div className="m-5">
        <input type="text" onChange={doChange} value={input} className="input" />
        <button onClick={doClick} className="btn">Click</button>
        <Link href="/other">go other page</Link>
      </div>
    </main>
  );
}