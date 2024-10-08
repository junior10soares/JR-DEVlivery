import { useState, useEffect } from "react";
import Stripe from "stripe";

import { Header } from "@/components/Header";
import { ListGifs } from "@/components/ListGifs";
import { stripe } from "@/lib/stripe";
import { CiSearch } from 'react-icons/ci';

import { GetStaticProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

interface HomeProps {
    products: {
        id: string
        name: string
        imageUrl: string
        price: string
    }[]
}

export default function Dashboard({ products }: HomeProps) {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [sliderRef, instanceRef] = useKeenSlider({
        breakpoints: {
            "(min-width: 400px)": {
                slides: { perView: 3.5, spacing: 5 },
            },
            "(min-width: 1000px)": {
                slides: { perView: 3.5, spacing: 10 },
            },
        },
    });

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        if (instanceRef.current) {
            instanceRef.current.update();
        }
    }, [searchTerm, instanceRef]);

    return (
        <>
            <Head>
                <title>Dashboard | JR DEVlivery</title>
            </Head>

            <Header />
            <ListGifs />

            <div className="flex items-center justify-center mt-10 mb-20">
                <input
                    type="text"
                    className="absolute border border-black rounded-full h-14 w-80 md:w-92 px-5 placeholder-gray-400"
                    placeholder="Busque o que você precisa"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <CiSearch size={30} className='relative ml-60' />
            </div>

            <strong className="p-10 text-2xl">Recomendados para você</strong>
            <div ref={sliderRef} className="keen-slider mt-8">
                {filteredProducts.length === 0 ? (
                    <div className="keen-slider__slide">
                        <p className="text-center">Nenhum produto encontrado</p>
                    </div>
                ) : (
                    filteredProducts.map(product => (
                        <Link href={`/product/${product.id}`} key={product.id} prefetch={false}>
                            <div className="keen-slider__slide">
                                <div className="flex flex-col items-center">
                                    <Image src={product.imageUrl} width={250} height={120} alt={product.name} />
                                    <strong className="text-2xl mt-2">{product.name}</strong>
                                    <span className="text-2xl mt-2 mb-3">{product.price}</span>
                                    <strong className="bg-black text-white w-32 h-7 mt-1 rounded-lg text-center">Ver detalhes</strong>
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const response = await stripe.products.list({
        expand: ['data.default_price']
    });

    const products = response.data.map(product => {
        const price = product.default_price as Stripe.Price;
        const productPrice = price.unit_amount !== null ? price.unit_amount / 100 : 0;

        return {
            id: product.id,
            name: product.name,
            imageUrl: product.images[0],
            price: new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(productPrice * 1),
        }
    })
    return {
        props: {
            products
        },
        revalidate: 60 * 60 * 2,
    }
}
