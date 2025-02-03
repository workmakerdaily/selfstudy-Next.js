# Next.js 페이지 라우터와 서버 사이드 렌더링

## 서버와 클라이언트
Next.js는 클라이언트 사이드뿐만 아니라 서버 사이드 기능도 갖추고 있으며, 서버 사이드에서 미리 컴포넌트를 렌더링하여 HTML 페이지로 전송할 수도 있습니다.

---

## CSR, SSR, SSG, ISR

### 1. 클라이언트 사이드 렌더링 (CSR - Client-Side Rendering)
- JavaScript가 브라우저에서 실행되면서 페이지를 동적으로 렌더링하는 방식.
- 초기 로딩 속도가 느릴 수 있으나 페이지 전환이 빠름.
- SEO(검색 엔진 최적화)에 불리함.

### 2. 서버 사이드 렌더링 (SSR - Server-Side Rendering)
- 페이지 요청 시 서버에서 HTML을 생성하여 클라이언트에게 전달하는 방식.
- SEO에 유리하지만, 요청마다 서버 부하가 발생할 수 있음.

### 3. 정적 사이트 생성 (SSG - Static Site Generation)
- 빌드 시 미리 HTML을 생성하여 정적 페이지를 제공하는 방식.
- SEO에 유리하며 빠른 로딩 속도를 제공하지만, 데이터 변경 시 새로운 빌드가 필요함.

### 4. 점진적 정적 생성 (ISR - Incremental Static Regeneration)
- SSG와 SSR의 중간 형태로, 특정 시간마다 정적 페이지를 갱신할 수 있음.
- 빠른 초기 로딩 속도와 최신 데이터 반영이 가능함.

### 5. CSR vs SSR vs SSG vs ISR 비교
| 방식  | 초기 로딩 속도 | SEO 적합성 | 서버 부하 | 데이터 최신화 |
|-------|-------------|-----------|---------|----------|
| **CSR** | 느림 | 낮음 | 낮음 | 즉시 반영 |
| **SSR** | 보통 | 높음 | 높음 | 즉시 반영 |
| **SSG** | 빠름 | 매우 높음 | 없음 | 빌드 시 반영 |
| **ISR** | 빠름 | 매우 높음 | 낮음 | 일정 주기 반영 |

---

## Next.js 라우팅 시스템과 렌더링 방식
Next.js는 다음과 같은 두 가지 라우팅 시스템을 제공합니다:

### 1. 앱 라우터
- 컴포넌트 단위로 서버 컴포넌트와 클라이언트 컴포넌트를 구분하여 렌더링됨.
- 서버 컴포넌트는 클라이언트 측에서 동적으로 업데이트되지 않는 요소를 담당.
- 클라이언트 컴포넌트는 사용자 상호작용이 필요한 동적인 요소를 담당.

### 2. 페이지 라우터
- 페이지 단위로 렌더링 장소(서버/클라이언트)와 시점(빌드 시/요청 시)을 결정.
- **정적 렌더링**: 빌드 시 미리 렌더링된 HTML 제공.
- **동적 렌더링**: 요청 시마다 서버에서 HTML을 생성하여 제공.

---

## 페이지 라우터의 렌더링 방식
### 1. 서버 사이드 렌더링 (SSR)
```tsx
export const getServerSideProps = async ({ params }) => {
  const data = await fetchData(params.id);
  return { props: { data } };
};
```

### 2. 정적 사이트 생성 (SSG)
```tsx
export const getStaticProps = async () => {
  const data = await fetchData();
  return { props: { data } };
};
```

### 3. 점진적 정적 재생성 (ISR)
```tsx
export const getStaticProps = async () => {
  const data = await fetchData();
  return { props: { data }, revalidate: 10 };
};
```

### 4. 동적 라우팅과 정적 사이트 생성 (SSG with Dynamic Routes)
```tsx
export const getStaticPaths = async () => {
  const paths = [{ params: { id: '1' } }, { params: { id: '2' } }];
  return { paths, fallback: false };
};
```

---

## Next.js 실행 및 빌드
### 1. 개발 모드 실행
```bash
npm run dev
```

### 2. 빌드 및 실행
```bash
npm run build
npm start
```

---

## 결론
- **CSR**: 빠른 페이지 전환이 필요한 경우 (예: 대시보드, 관리자 페이지)
- **SSR**: SEO가 중요하고, 데이터가 자주 변경되는 경우 (예: 뉴스, 검색 결과 페이지)
- **SSG**: 정적인 콘텐츠가 많고 SEO가 중요한 경우 (예: 블로그, 문서 사이트)
- **ISR**: 정적인 페이지이지만 일정 시간마다 데이터 업데이트가 필요한 경우 (예: 상품 목록 페이지)
