# Fetch를 이용한 데이터 액세스

## 데이터를 이용하려면?
자바스크립트에서 데이터를 가져오기 위해 Ajax를 사용하며, `fetch` 함수를 이용해 서버에서 필요한 정보를 얻을 수 있습니다. 타입스크립트에서도 동일한 방식으로 사용됩니다.

Next.js에서는 확장된 `fetch` 함수를 제공하며, 클라이언트 및 서버에서 모두 사용할 수 있도록 지원합니다.

```tsx
// fetch 함수 호출 방법 (1)
변수 = await fetch(주소, 옵션)

// fetch 함수 호출 방법 (2)
fetch(주소, 옵션).then(인수 => {..후처리...})
```

`fetch` 함수의 반환값은 `Response` 객체이며, 다음 메서드를 통해 데이터를 가져올 수 있습니다.

```tsx
// 텍스트 데이터 가져오기
<< Response >>.text()
  
// JSON 객체로 가져오기
<< Response >>.json()
```

## 옵션 인수 설정

`fetch` 함수의 두 번째 인수로 옵션을 지정할 수 있으며, `cache` 값을 설정해야 합니다.

- **force-cache**: 데이터를 캐싱하여 저장합니다.
- **no-store**: 캐싱하지 않고 매번 새로운 데이터를 가져옵니다.

```tsx
const resp = await fetch(
  url,
  { cache: 'no-store' }
);
```

## JSON 데이터 준비하기

Next.js의 `public` 폴더에 `sample.json` 파일을 저장하여 데이터를 관리할 수 있습니다.

```json
{
    "message": "샘플 데이터입니다.",
    "data": [
        { "name": "kim", "mail": "kim@gilbut", "age": "39" },
        { "name": "lee", "mail": "lee@flower", "age": "28" },
        { "name": "park", "mail": "park@happy", "age": "17" }
    ]
}
```

## 서버 컴포넌트에서 fetch 사용하기

```tsx
'use server';

const url = 'http://localhost:3000/sample.json';

async function getSampleData() {
  const resp = await fetch(url, { cache: 'no-store' });
  return await resp.json();
}

export default async function Home() {
  const data = await getSampleData();
  return (
    <main>
      <h1>Index page</h1>
      <p>{data.message}</p>
    </main>
  );
}
```

## 클라이언트 컴포넌트에서 fetch 사용하기

```tsx
"use client";
import { useState } from "react";

const url = 'http://localhost:3000/sample.json';

async function getSampleData() {
  const resp = await fetch(url, { cache: 'no-store' });
  return await resp.json();
}

export default function Home() {
  const [msg, setMsg] = useState('dummy message.');

  function doAction() {
    getSampleData().then(resp => setMsg(resp.message));
  }

  return (
    <main>
      <h1>Index page</h1>
      <p>{msg}</p>
      <button onClick={doAction}>Click</button>
    </main>
  );
}
```

---

# 서버 액션

## 서버 액션이란?
서버에서 실행되는 함수를 정의하여 클라이언트 컴포넌트에서 호출할 수 있습니다. 서버 액션은 `"use server"`를 선언하여 사용합니다.

### 서버 액션 구현 예제

#### 1. 서버 액션 함수 작성하기

```tsx
"use server";

const url = 'http://localhost:3000/sample.json';

export async function serverAction() {
  const resp = await fetch(url, { cache: 'no-store' });
  const result = await resp.json();
  console.log("Get message!", result.message);
}
```

#### 2. 서버 액션 호출하기

```tsx
"use server";
import { serverAction } from "./server-action";

export default async function Home() {
  return (
    <main>
      <h1>Index page</h1>
      <form action={serverAction}>
        <button>Click</button>
      </form>
    </main>
  );
}
```

---

# SWR을 이용한 데이터 액세스

## SWR 설치

```bash
npm install swr
```

## SWR 사용하기

```tsx
"use client";
import useSWR from 'swr';

const url = '/sample.json';

const fetcher = (input: RequestInfo, init?: RequestInit) =>
  fetch(input, init).then(res => res.json());

export default function Home() {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return (
    <main>
      <h1>Index page</h1>
      <p>{isLoading ? 'Loading...' : data?.message}</p>
    </main>
  );
}
```

## 서버 컴포넌트에서 SWR 사용하기

```tsx
"use server";
import { SWRProvider } from "./swr-provider";
import GetData from "./GetData";

export default async function Home() {
  return (
    <SWRProvider>
      <GetData />
    </SWRProvider>
  );
}
```

---

## 마무리
이 문서는 `fetch`, `SWR`, `Next.js의 서버 액션`을 활용하여 데이터를 불러오고, 관리하는 방법을 설명합니다.

- `fetch` 기본 사용법과 `Next.js`에서의 차이점
- `서버 액션`을 활용하여 서버에서 데이터를 가져오는 방법
- `SWR`을 활용한 네트워크 액세스 및 데이터 관리

Next.js에서의 데이터 관리가 필요한 경우 위 내용을 참고하여 개발을 진행하면 됩니다.