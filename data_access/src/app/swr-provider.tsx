"use client";
import { ReactNode } from "react";
import { SWRConfig } from "swr";

interface Props {
    children: ReactNode;
}

export const SWRProvider = ({ children }: Props) => {
    return <SWRConfig>{children}</SWRConfig>;
}