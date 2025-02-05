"use client";
import { useState } from "react";

const apiUrl = "/chat"; // Next.js API 라우트 사용

export default function Home() {
  const [input, setInput] = useState("");
  const [prompt, setPrompt] = useState("");
  const [assistant, setAssistant] = useState("");

  const doChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };

  async function doAction() {
    setAssistant("wait...");

    fetch('/rh', {
      method: 'POST',
      body: JSON.stringify({ prompt: input })
    })
      .then(resp => resp.json())
      .then((value) => {
        setPrompt(input);
        setInput('');
        setAssistant(value.content);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <main>
      <h1 className="title">Index page</h1>
      <p className="msg font-bold">프롬프트를 입력:</p>
      <div className="m-5">
        <input type="text" className="input" name="input"
          onChange={doChange} value={input} />
        <button className="btn" onClick={doAction}>Send</button>
      </div>
      <div className="prompt">
        <p className="">PROMPT: {prompt}</p>
        <p className="">ASSISTANT: {assistant}</p>
      </div>
    </main>
  );
}
