import { useEffect } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import Head from 'next/head';

import logo from '../assets/logo.gif';
import styles from '../styles/animation.module.css';

export default function Home() {
    const router = useRouter();

    useEffect(() => {
        const timeout = setTimeout(() => {
            router.push('/dashboard');
        }, 3000);

        return () => clearTimeout(timeout)
    }, []);

    return (
        <>
            <Head>
                <title>JR DEVlivery</title>
            </Head>
            <div className="bg-custom-yellow h-screen flex flex-col items-center justify-center">
                <Image className={`${styles['slide-in-left']}`} width={450} alt='logo' src={logo} />
            </div>
        </>
    );
}
