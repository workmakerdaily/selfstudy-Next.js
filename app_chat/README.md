# OpenAI API 준비하기

## API 이용과 OpenAI
Next.js는 단독으로 사용할 수 있을 뿐만 아니라 다른 서비스와 함께 사용하여 더욱 강력한 기능을 구현할 수 있습니다.

OpenAI는 생성형 AI 서비스인 ChatGPT를 제공하는 기업으로, OpenAI API를 통해 GPT 모델을 외부에서 사용할 수 있도록 지원합니다. 이를 활용하면 Next.js 앱 내에서 OpenAI의 기능을 사용할 수 있습니다.

OpenAI API는 필요에 따라 크레딧을 구매하는 방식으로 이용되며, 수백에서 수천 번의 AI 모델 액세스가 몇 달러 정도이므로 시험해보는 데 큰 비용이 들지 않습니다.

- OpenAI 플랫폼: [https://platform.openai.com](https://platform.openai.com)

---

## OpenAI 계정 등록하기
OpenAI API를 사용하려면 먼저 계정을 등록해야 합니다. 계정은 이메일 주소, Google 계정, Microsoft 계정을 이용해 생성할 수 있습니다.

---

## OpenAI 플랫폼 이용하기

### API 키 등록하기
계정 등록 후 반드시 해야 할 일은 API 키를 등록하는 것입니다.

API 키는 프로그램이 OpenAI API에 액세스할 때 필요한 인증 키이며, 계정과 프로그램을 식별하는 역할을 합니다. API Keys 페이지에서 "Create new secret key" 버튼을 클릭하여 키를 생성한 후 반드시 안전한 곳에 보관해야 합니다.

---

## 크레딧 구입하기
크레딧 사용 현황은 "Usage overview"에서 확인할 수 있으며, 크레딧을 구매하려면 **Settings → Billing** 메뉴에서 결제 정보를 입력하고 충전할 수 있습니다.

---

# Next.js에서 채팅 기능 이용하기

## Next.js에서 OpenAI API 사용 방법
Next.js에서 OpenAI API를 사용하는 방법에는 여러 가지가 있지만, 가장 간단한 방법은 `fetch` 함수를 이용하여 API에 직접 요청하는 것입니다.

### 요청 형식
```typescript
{
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer " + << API 키 >>
  },
  body: JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "user", content: "Hello, how are you?" }
    ]
  })
}
```

### 응답 형식
OpenAI API는 JSON 형식으로 응답을 반환합니다.
```typescript
{
  "id": "ID 값",
  "object": "chat.completion",
  "created": 타임스탬프,
  "model": "모델명",
  "choices": [응답 메시지],
  "usage": {
    "prompt_tokens": 프롬프트 토큰 수,
    "completion_tokens": 응답 토큰 수,
    "total_tokens": 전체 토큰 수
  }
}
```

---

## API 라우트 만들기 (Next.js)
Next.js의 API 라우트를 사용하여 OpenAI API와 연동하는 예제입니다.

### `.env.local` 파일 설정
```
OPENAI_API_KEY="your-api-key-here"
```

### `app/chat/route.ts` 파일 작성
```typescript
"use server";

export async function POST(request: Request) {
    try {
        const { input } = await request.json();
        if (!input) {
            return new Response(JSON.stringify({ error: "입력이 비어 있습니다." }), { status: 400 });
        }

        const api_key = process.env.OPENAI_API_KEY;
        if (!api_key) {
            return new Response(JSON.stringify({ error: "API Key가 없습니다." }), { status: 500 });
        }

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${api_key}`
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [
                    { role: "system", content: "한국어로 100글자 이내로 응답하세요." },
                    { role: "user", content: input }
                ]
            })
        });

        const json_data = await response.json();
        const result = json_data.choices?.[0]?.message?.content?.trim() || "응답을 가져올 수 없습니다.";

        return new Response(JSON.stringify({ response: result }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "서버 오류 발생" }), { status: 500 });
    }
}
```

---

## OpenAI 패키지 이용하기
더 간편하게 OpenAI API를 사용할 수 있도록 OpenAI의 공식 `openai` 패키지를 사용할 수도 있습니다.

### 패키지 설치
```bash
npm install openai
```

### `app/chat/route.ts` 수정 (OpenAI 패키지 사용)
```typescript
"use server";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
    const { input } = await request.json();

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: input }],
        });

        return new Response(JSON.stringify({ response: response.choices[0].message.content?.trim() }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });

    } catch (error) {
        return new Response(JSON.stringify({ error: "OpenAI API 호출 실패" }), { status: 500 });
    }
}
```

---

## Next.js에서 API 호출하는 클라이언트 컴포넌트
다음은 API에 요청을 보내고 응답을 화면에 출력하는 Next.js 클라이언트 컴포넌트입니다.

### `app/page.tsx`
```tsx
"use client";
import { useState } from "react";

const apiUrl = "/chat";

export default function Home() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    const res = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResponse(data.response);
  };

  return (
    <main>
      <h1>Chat with AI</h1>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handleSubmit}>Send</button>
      <p>Response: {response}</p>
    </main>
  );
}
```

---

## 결론
이 문서에서는 Next.js에서 OpenAI API를 활용하는 방법을 설명했습니다.  
- 기본적인 `fetch`를 이용한 API 호출
- Next.js API 라우트를 활용한 서버 통신
- OpenAI 패키지를 활용한 더 간결한 구현 방법

이제 OpenAI API를 Next.js 프로젝트에서 자유롭게 활용할 수 있습니다. 🚀

