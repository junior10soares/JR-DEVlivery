import { AppProps } from "next/app";

import '@/styles/global.css';

import { Header } from "@/components/Header";

export default function App({ Component, pageProps }: AppProps) {

    return (
        <div className="px-28">
            <Header />
            <Component {...pageProps} />
        </div>
    );
}
