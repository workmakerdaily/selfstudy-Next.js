"use client";
import { useState } from "react";
import useSWR from "swr";

const url = 'http://localhost:3000/rh';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
    fetch(input, init).then(res => res.json());

export default function Home() {

    const [name, setName] = useState('');
    const [pass, setPass] = useState('');

    const { data, error, mutate, isLoading } = useSWR(url, fetcher);

    const doName = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setName(val);
    };

    const doPass = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value;
        setPass(val);
    };

    async function login(formData: FormData) {
        fetch('/rh', {
            method: 'POST',
            body: formData
        }).then(response => {
            void response;
            setName('');
            setPass('');
            mutate();
        })
            .catch(error => {
                console.log(error);
            });
    }

    return (
        <main>
            <h1 className="title">Login page</h1>
            <p className="msg font-bold">
                이름과 패스워드를 입력:
            </p>
            <form action={login}>
                <div>
                    <input type="text" className="input mx-5 my-1"
                        name="name" value={name} onChange={doName} />
                </div>
                <div>
                    <input type="password" className="input mx-5 my-1"
                        name="pass" value={pass} onChange={doPass} />
                </div>
                <div className="mx-3">
                    <button className="btn my-1">
                        Click
                    </button>
                </div>
            </form>
            <pre className="msg border p-2">
                {error ? 'ERROR!!' : isLoading ?
                    'loading...' : data.content}
            </pre>
        </main>
    )
}