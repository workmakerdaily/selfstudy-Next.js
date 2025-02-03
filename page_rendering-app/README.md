# App Router Rendering

## 1. 렌더링과 컴포넌트

App Router에서 렌더링 시 중요한 것은 **페이지가 아닌 컴포넌트**입니다.

Next.js의 App Router에서 페이지 생성은 **서버 모듈 그래프**와 **클라이언트 모듈 그래프**로 나뉩니다.
- **서버 모듈 그래프**: 서버에서 동작하는 코드와 의존성 그래프
- **클라이언트 모듈 그래프**: 클라이언트에서 동작하는 코드와 의존성 그래프

모든 컴포넌트는 다음 두 가지 중 하나입니다.
- **서버 컴포넌트**: 서버에서 실행
- **클라이언트 컴포넌트**: 클라이언트에서 실행

## 2. 명시적 렌더링 지정

컴포넌트가 서버에서 렌더링될지, 클라이언트에서 렌더링될지는 사용된 기능에 따라 결정됩니다. 
명시적으로 지정하려면 다음 지시문을 사용합니다.

- `use client`: 클라이언트 컴포넌트 지정
- `use server`: 서버 컴포넌트 지정

이 지시문은 해당 컴포넌트가 어느 환경에서 실행될지를 설정합니다.

## 3. 정적 페이지

서버 컴포넌트를 활용하여 **빌드 시 렌더링되는 정적 페이지**를 만들 수 있습니다.

### 예제: 정적 페이지

```tsx
'use server';
import { Metadata } from "next";

export async function generateMetadata() {
  return { title: 'Index page' };
}

const defaultProps = {
  title: "Static page",
  msg: "This is a static page sample."
};

export default async function Home() {
  return (
    <main>
      <h1 className="title">{defaultProps.title}</h1>
      <p className="msg">{defaultProps.msg}</p>
    </main>
  );
}
```

### 서버 컴포넌트의 주의점
- `async` 키워드를 사용하여 비동기 함수로 정의해야 합니다.
- `generateMetadata` 함수를 통해 메타데이터를 설정할 수 있습니다.
- `use client`를 추가하지 않으면 기본적으로 서버 컴포넌트로 처리됩니다.

## 4. 동적 렌더링 페이지

빌드 시 정적으로 생성되지 않고, 요청 시 동적으로 생성되는 페이지도 있습니다.

### 특정 경로를 정적 페이지로 변환하기
```tsx
const paths = [
  { name: 'kim' },
  { name: 'lee' },
  { name: 'park' }
];

export async function generateStaticParams() {
  return paths.map(path => ({ name: path.name }));
}

export default function Name({ params }: { params: { name: string } }) {
  const isValid = paths.some(path => path.name === params.name);

  return (
    <main>
      {isValid ? (
        <>
          <h1 className="title">Name = "{params.name}"</h1>
          <p className="msg">{params.name}님, 안녕하세요!</p>
        </>
      ) : (
        <>
          <h1 className="title"> "{params.name}"</h1>
          <p className="msg"> "{params.name}"은(는) 사용할 수 없습니다.</p>
        </>
      )}
    </main>
  );
}
```

- `generateStaticParams()`를 사용해 특정 경로를 정적 페이지로 빌드 가능
- `params` 객체를 통해 동적 값을 가져와 렌더링

## 5. 클라이언트 컴포넌트

**클라이언트에서만 실행해야 하는 기능이 있다면 클라이언트 컴포넌트를 사용해야 합니다.**

### 클라이언트 컴포넌트로 자동 지정되는 경우
- `useState`, `useEffect` 등 리액트 훅 사용 시
- `useRouter`, `useSearchParams` 등 Next.js의 클라이언트 전용 기능 사용 시

```tsx
'use client';
import { useSearchParams } from "next/navigation";

function SearchParamsContent() {
  const searchParams = useSearchParams();
  return (
    <main>
      <h1 className="title">Index page</h1>
      <ul>
        <li>ID: {searchParams.get('id')}</li>
        <li>PASS: {searchParams.get('pass')}</li>
      </ul>
    </main>
  );
}

export default function Home() {
  return <SearchParamsContent />;
}
```

- `useSearchParams()`를 사용하여 클라이언트 측에서 쿼리 파라미터를 가져옴
- `use client`를 추가하여 클라이언트 컴포넌트로 지정해야 오류 발생 방지

## 6. 쿼리 파라미터 활용

**쿼리 파라미터는 클라이언트 컴포넌트에서 다루어야 합니다.**

```tsx
const searchParams = useSearchParams();
console.log(searchParams.get('id')); // 쿼리 파라미터 'id' 값 출력
```

- `useSearchParams().get('key')`를 사용하여 URL에서 쿼리 파라미터 값을 추출
- 서버 컴포넌트에서는 `useSearchParams()` 사용 불가 (클라이언트 전용)

## 7. 정리

| 기능                     | 서버 컴포넌트 (`use server`) | 클라이언트 컴포넌트 (`use client`) |
|--------------------------|----------------------------|----------------------------------|
| `useState`, `useEffect` 사용 | ❌ 불가능                     | ✅ 가능                           |
| `useRouter`, `useSearchParams` 사용 | ❌ 불가능                     | ✅ 가능                           |
| 정적 페이지 생성           | ✅ 가능                     | ❌ 불가능                         |
| 쿼리 파라미터 사용         | ❌ 불가능                     | ✅ 가능                           |
| `generateMetadata` 사용   | ✅ 가능                     | ❌ 불가능                         |
| `generateStaticParams` 사용 | ✅ 가능                     | ❌ 불가능                         |

### 기본 원칙
- **서버에서 처리할 수 있는 것은 서버에서 실행하는 것이 좋음** → 빠른 로드 속도
- **클라이언트에서만 필요한 기능 (ex: 상태 관리, 쿼리 파라미터 등)은 클라이언트 컴포넌트에서 처리**

Next.js의 App Router를 활용할 때 위 개념을 숙지하면 더욱 효율적인 렌더링이 가능합니다.
