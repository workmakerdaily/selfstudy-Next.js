'use client';
import { useSearchParams } from "next/navigation";
import { Suspense } from "react"; 

function SearchParamsContent() {

  const searchParams = useSearchParams();

  return (
    <main>
      <h1 className="title">Index page</h1>
      <ul>파라미터
        <li>ID: {searchParams.get('id')}</li>
        <li>PASS: {searchParams.get('pass')}</li>
      </ul>
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <SearchParamsContent />
    </Suspense>
  );
}