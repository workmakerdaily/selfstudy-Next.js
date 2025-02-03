"use server";
import { SWRProvider } from "./swr-provider";
import GetData from "./GetData";

export default async function Home() {
  return (
    <main>
      <h1 className="title">Index page</h1>
      <p className="msg font-bold">
        SWR로 데이터를 가져옵니다.
      </p>
      <SWRProvider>
        <GetData />
      </SWRProvider>
    </main>
  );
}