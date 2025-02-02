import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "./_layout";

export default function App({ Component, pageProps }: AppProps) {
  console.log(pageProps);
  return (<Component {...pageProps} />);
}
