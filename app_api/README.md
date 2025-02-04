# Next.js 페이지 라우터와 API 사용법

## 1. 웹 액세스와 API

지금까지는 Next.js 애플리케이션을 컴포넌트 기반 페이지 형태로 구현했습니다. 하지만 웹 애플리케이션에서는 API를 이용해 데이터를 주고받을 수 있습니다.

### API란?
API(Application Programming Interface)는 웹 애플리케이션의 기능이나 데이터를 공유하는 서비스 인터페이스입니다. API는 JSON 또는 XML과 같은 데이터 형식으로 정보를 주고받으며, HTML을 포함하지 않습니다.

## 2. Next.js에서 API 작성하기

### 2.1 API 라우팅 방식
Next.js에서는 **페이지 라우터**와 **앱 라우터**에 따라 API 작성 방식이 다릅니다. 여기서는 **페이지 라우터 방식**을 사용합니다.

### 2.2 `api` 폴더
Next.js의 `pages/api` 폴더는 API 코드를 배치하는 전용 폴더입니다. 해당 폴더 내에 배치된 파일들은 자동으로 API 엔드포인트로 인식됩니다.

## 3. 기본 API 작성

### 3.1 `hello.ts` 파일 생성
`pages/api/hello.ts` 파일을 만들고 다음과 같이 작성합니다.

```typescript
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}
```

### 3.2 API 테스트
브라우저에서 `http://localhost:3000/api/hello`에 접근하면 다음과 같은 JSON 응답을 확인할 수 있습니다.

```json
{
  "name": "John Doe"
}
```

## 4. 컴포넌트에서 API 사용하기

### 4.1 `swr` 설치
API 데이터를 가져오기 위해 `swr`을 사용합니다. 설치 명령어는 다음과 같습니다.

```bash
npm install swr
```

### 4.2 `index.tsx` 파일 수정
`pages/index.tsx`를 수정하여 API 데이터를 가져오도록 합니다.

```tsx
"use client";
import useSWR from 'swr';

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
```

## 5. 앱 라우터와 라우트 핸들러

Next.js의 **앱 라우터(App Router)** 에서는 `api` 폴더 없이 `app` 폴더 내에서 어디든 API를 배치할 수 있습니다. 이를 위해 **라우트 핸들러(Route Handler)** 를 사용합니다.

### 5.1 라우트 핸들러 기본 개념
라우트 핸들러는 요청을 처리하는 역할을 하며, HTTP 메서드(GET, POST 등)에 따라 다르게 정의됩니다.

```typescript
export async function GET(request: Request) {
  return new Response(JSON.stringify({ content: "Hello, this is API content!" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
```

이 코드를 `app/rh/route.ts`에 배치하면 `/rh` 경로로 접근 시 JSON 데이터가 반환됩니다.

### 5.2 ID를 이용한 데이터 가져오기
쿼리 파라미터를 이용해 특정 ID의 데이터를 가져오는 API를 구현할 수 있습니다.

```typescript
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    let id = searchParams.get('id') ? Number(searchParams.get('id')) : 0;
    if (isNaN(id)) id = 0;

    const data = await fetch("http://localhost:3000/sample.json").then(res => res.json());
    const item = data.data[Math.max(0, Math.min(id, data.data.length - 1))];

    return new Response(JSON.stringify(item), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
```

### 5.3 POST 요청 처리하기
데이터를 파일에 저장하는 API를 구현할 수 있습니다.

```typescript
import fs from 'fs';
const path = './data.txt';

export async function POST(request: Request) {
    const body = await request.json();
    fs.appendFileSync(path, body.content + "\n");
    return new Response(JSON.stringify({ content: 'ok' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
```

## 6. 마무리
이 문서는 Next.js에서 API를 구현하고 활용하는 방법을 설명합니다.

- **페이지 라우터와 앱 라우터에서 API를 작성하는 방법**
- **라우트 핸들러를 사용하여 GET 및 POST 요청 처리하기**
- **useSWR을 활용하여 API 데이터를 클라이언트 컴포넌트에서 가져오기**

Next.js에서 API를 효율적으로 사용하려면, 위 내용을 참고하여 `fetch`, `SWR`, `라우트 핸들러`를 활용한 다양한 방법을 실험해보는 것이 중요합니다. 필요한 경우 API 요청 캐싱, 비동기 처리 최적화, 보안 설정 등을 추가하여 더욱 강력한 기능을 구현할 수 있습니다.
