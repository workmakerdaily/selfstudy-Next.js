import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ['latin'] });

export default function Other() {
    return (
        <main>
            <h1>Other page.</h1>
            <p>이것은 다른 페이지 입니다.</p>
            <div><Link href="/">Go Back!!</Link></div>
        </main>
    );
}