# Next.js & Tailwind CSS 프로젝트 가이드

## Next.js 페이지와 컴포넌트 구성

### layout.tsx & page.tsx
- **layout.tsx**: 모든 페이지에 공통적으로 사용되는 레이아웃 파일입니다.
- **page.tsx**: `app` 폴더(애플리케이션의 루트)에 있는 페이지의 콘텐츠가 됩니다.

### page.tsx 작성하기
`src/app/page.tsx` 파일을 열고 다음과 같이 수정합니다.

```tsx
export default function Home() {
  return (
    <main>
      <h1>Next.js sample.</h1>
      <p>This is sample application.</p>
    </main>
  );
}
```

### 폰트와 여백 조정하기
이제 Tailwind CSS를 이용하여 텍스트 스타일을 조정해 보겠습니다.

```tsx
export default function Home() {
  return (
    <main>
      <h1 className="text-2xl m-5">Next.js sample.</h1>
      <p className="text-lg m-5">This is sample application.</p>
    </main>
  );
}
```

이렇게 하면 제목과 메시지의 폰트 크기가 조정됩니다.

---

## Tailwind CSS 주요 클래스
Tailwind CSS는 스타일을 빠르게 적용할 수 있는 유틸리티 기반 CSS 프레임워크입니다.

### 폰트 크기
| 클래스 (`class`) | 크기 (`font-size`) |
|-----------------|-----------------|
| `text-xs` | `0.75rem` (12px) |
| `text-sm` | `0.875rem` (14px) |
| `text-base` | `1rem` (16px) (기본값) |
| `text-lg` | `1.125rem` (18px) |
| `text-xl` | `1.25rem` (20px) |
| `text-2xl` | `1.5rem` (24px) |

### 폰트 스타일
| 클래스 (`class`) | 설명 |
|-----------------|-----------------|
| `italic` | 기울임체 적용 |
| `not-italic` | 기본 글씨체 유지 |

### 폰트 두께
| 클래스 (`class`) | `font-weight` |
|-----------------|-----------------|
| `font-thin` | `100` (가장 얇음) |
| `font-light` | `300` |
| `font-normal` | `400` (기본값) |
| `font-bold` | `700` (굵은 글씨) |
| `font-black` | `900` (가장 두꺼운 글씨) |

### 텍스트 정렬
| 클래스 (`class`) | 설명 |
|-----------------|-----------------|
| `text-left` | 왼쪽 정렬 |
| `text-center` | 가운데 정렬 |
| `text-right` | 오른쪽 정렬 |

---

## Next.js에서 라우팅 처리하기

### 파일 시스템 기반 라우팅
- `app/other/page.tsx` 파일을 생성하여 새로운 페이지를 추가할 수 있습니다.
- 해당 폴더명이 자동으로 URL 경로가 됩니다.

```tsx
import Link from 'next/link';

export default function Other() {
  return (
    <main>
      <h1 className="title">Other page</h1>
      <p className="msg">이건 다른 페이지입니다.</p>
      <div>
        <Link href="/">go back!!</Link>
      </div>
    </main>
  );
}
```

### 동적 라우팅
폴더명을 대괄호(`[]`)로 감싸면 해당 부분이 동적 라우팅을 위한 변수로 인식됩니다.
예를 들어 `/name/[name]/page.tsx`를 생성하면 `/name/사용자이름` 형식의 URL을 처리할 수 있습니다.

```tsx
export default function Name({ params }: { params: { name: string } }) {
  return (
    <main>
      <h1 className="title">Name page</h1>
      <p>당신은 '{params.name}'님이군요.</p>
      <div>
        <a href="/">go back!!</a>
      </div>
    </main>
  );
}
```

---

## 글로벌 스타일 설정하기

### Tailwind CSS @apply 활용하기
`src/app/global.css` 파일을 열어 다음과 같은 스타일을 추가할 수 있습니다.

```css
.title {
  @apply text-2xl m-5 text-red-500;
}
.msg {
  @apply text-lg m-5 text-gray-900;
}
.input {
  @apply p-1 border-solid border-2 border-gray-400 rounded-sm;
}
.btn {
  @apply px-7 py-2 mx-2 bg-blue-800 text-white rounded-lg;
}
```

이제 기존 컴포넌트에서 Tailwind 클래스를 대신하여 위에서 정의한 클래스를 사용할 수 있습니다.

```tsx
<input type="text" className="input" />
<button className="btn">Click</button>
```

---

## Next.js에서 이미지 최적화하기
Next.js에서는 `<Image>` 컴포넌트를 활용하여 이미지를 최적화할 수 있습니다.

```tsx
import Image from 'next/image';

export default function Other() {
  return (
    <main>
      <h1 className="title">Other page</h1>
      <Image src="/nextjs.png" alt="Next.js 로고" width={200} height={200} />
    </main>
  );
}
```

**`<img>` 대신 `<Image>`를 사용하면 자동으로 WebP 변환 및 지연 로딩이 적용됩니다.**

---

## 프로젝트 실행 방법

1. 패키지 설치
```sh
yarn install
```

2. 개발 서버 실행
```sh
yarn dev
```

3. 웹 브라우저에서 실행
- [http://localhost:3000](http://localhost:3000)에서 프로젝트를 확인할 수 있습니다.

---

## 결론
이 문서는 Next.js 및 Tailwind CSS를 활용하여 기본적인 레이아웃, 스타일 설정 및 라우팅을 구성하는 방법을 다룹니다. 
