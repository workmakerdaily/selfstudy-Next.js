# Next.js의 앱 라우터와 페이지 라우터

## 앱 라우터(App Router)와 페이지 라우터(Page Router)
Next.js에는 **앱 라우터**와 **페이지 라우터** 두 가지 라우팅 방식이 존재한다.

### 1. 앱 라우터 (App Router)
- `app/` 폴더 내부에 `layout.tsx`와 `page.tsx`를 조합하여 페이지를 생성한다.
- 애플리케이션 전체를 아우르는 **공통 레이아웃**이 존재한다.
- 여러 페이지를 생성하고 서로 연동하는 애플리케이션에 적합하다.

### 2. 페이지 라우터 (Page Router)
- `pages/` 폴더 내부에 각 페이지의 `index.tsx` 파일이 배치된다.
- 공통 레이아웃이 없으며, 페이지별로 독립적인 형태로 제작된다.
- **정적 페이지 위주**의 프로젝트에 적합하다.
- 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)과 같은 기능을 지원한다.

## 페이지 라우터를 이용한 프로젝트 생성
Next.js 프로젝트 생성 시 **App Router를 사용할 것이냐는 질문에 No**를 선택하면 페이지 라우터 방식이 적용된다. 프로젝트를 생성한 후에는 변경할 수 없다.

## 페이지 라우터의 폴더 구조
```
/.next        - Next.js의 설정 파일 저장
/node_modules - 프로젝트의 패키지 모음
/public       - 정적 파일 저장
/src          - 애플리케이션의 소스 코드
  ├── pages   - 웹 페이지 파일 저장
  ├── styles  - 스타일 파일 저장
```

### `pages/` 폴더의 구성
- `api/` - 웹 API를 만들기 위한 폴더
- `fonts/` - 로컬 폰트 파일 저장
- `_app.tsx` - 애플리케이션의 모든 페이지에 적용되는 설정
- `_document.tsx` - HTML 구조 및 메타데이터 설정
- `index.tsx` - 홈페이지의 콘텐츠

## `_document.tsx`와 `_app.tsx`
### `_document.tsx`
```tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```
- `<Html />` → `<html>` 태그를 나타냄
- `<Head />` → `<head>` 태그를 나타냄
- `<Main />` → 각 페이지의 콘텐츠가 들어가는 자리
- `<NextScript />` → Next.js가 사용하는 스크립트 포함

### `_app.tsx`
```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
```
- `globals.css`를 불러와 **모든 페이지에 적용**
- `Component`는 각 페이지의 컴포넌트를 나타냄
- `pageProps`는 페이지에 전달할 속성

## 페이지 생성 및 라우팅
Next.js의 페이지 라우터에서는 **`pages/` 폴더 내부의 파일이 곧 라우트**가 된다.

### 페이지 생성 예시
#### `pages/other.tsx`
```tsx
import Link from "next/link";

export default function Other() {
  return (
    <main>
      <h1>Other Page</h1>
      <p>이것은 다른 페이지입니다.</p>
      <Link href="/">홈으로 이동</Link>
    </main>
  );
}
```

#### `pages/index.tsx`
```tsx
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Home Page</h1>
      <p>Next.js 페이지 라우터 예제</p>
      <Link href="/other">다른 페이지로 이동</Link>
    </main>
  );
}
```

### 동적 라우팅
#### `pages/name/[name].tsx`
```tsx
import { useRouter } from "next/router";
import Link from "next/link";

export default function Name() {
  const router = useRouter();
  return (
    <main>
      <h1>Name Page</h1>
      <p>입력한 이름: {router.query.name}</p>
      <Link href="/">홈으로 이동</Link>
    </main>
  );
}
```
`/name/사용자이름` 형태로 URL을 입력하면 `router.query.name`을 통해 값을 가져올 수 있다.

## 레이아웃 커스터마이징
Next.js의 **페이지 라우터에는 공통 레이아웃이 기본적으로 제공되지 않는다.** 따라서, `_app.tsx`를 수정하여 레이아웃을 적용해야 한다.

### `_layout.tsx`
```tsx
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <h1 className="header">Next.js Application</h1>
      <main>{children}</main>
      <footer>© 2025 Kim.</footer>
    </>
  );
}
```

### `_app.tsx` 수정
```tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./_layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```
모든 페이지가 `_layout.tsx`에서 정의한 레이아웃을 따르게 된다.

## 정적 속성 (Static Props)
Next.js에서 서버 사이드 렌더링(SSR) 및 정적 사이트 생성(SSG)을 위해 `getStaticProps` 함수를 사용할 수 있다.

### `getStaticProps` 사용 예제
```tsx
import { GetStaticProps } from "next";
import Link from "next/link";

interface Data {
  title: string;
  msg: string;
}

interface Props {
  data: Data;
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const data: Data = {
    title: "Home Page",
    msg: "이것은 Next.js 예제입니다."
  };
  return { props: { data } };
};

export default function Home({ data }: Props) {
  return (
    <main>
      <h1>{data.title}</h1>
      <p>{data.msg}</p>
      <Link href="/other">다른 페이지로 이동</Link>
    </main>
  );
}
```

## 결론
Next.js의 **페이지 라우터**는 정적 페이지 위주의 애플리케이션에 적합하며, 파일 기반 라우팅을 제공한다. 또한 `getStaticProps` 등을 활용하여 서버 사이드 렌더링 및 정적 사이트 생성을 쉽게 구현할 수 있다. 필요에 따라 앱 라우터와 비교하여 적절한 방식을 선택하면 된다.
