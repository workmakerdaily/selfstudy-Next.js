import { ReactNode } from "react";

interface Data {
    title: string;
}

interface Props {
    // ReactNode는 JSX.Element, string, number, null, undefined, 
    // ReactElement 등의 다양한 React 요소를 포함할 수 있는 타입입니다.
    children: ReactNode;
    data?: Data;
}

export default function Layout({ children, data }: Props) {
    return (
        <>
            <h1 className="Header">{data?.title}</h1>
            <main>{ children }</main>
            <hr className="footer"></hr>
            <p className="footer">copyright 2025 Kim.</p>
        </>
    );
}