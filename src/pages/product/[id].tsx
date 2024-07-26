import { Header } from "@/components/Header";
import { stripe } from "@/lib/stripe";

import axios from "axios";
import { useState } from "react";
import Stripe from "stripe";

import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";

interface ProductProps {
    product: {
        id: string
        name: string
        imageUrl: string
        price: string
        description: string
        defaultPriceId: string
    }
}

export default function Product({ product }: ProductProps) {
    const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);

    async function handleBuyButton() {
        try {
            setIsCreatingCheckoutSession(true);

            const response = await axios.post('/api/checkout', {
                priceId: product.defaultPriceId,
            })
            const { checkoutUrl } = response.data;

            window.location.href = checkoutUrl;

        } catch (err) {
            setIsCreatingCheckoutSession(false);
            alert('Falha ao redirecionar ao checkout!')
        }
    }

    return (
        <>
            <Head>
                <title>{product.name} | JR DEVlivery</title>
            </Head>

            <Header />

            <div className="grid grid-cols-2 mt-28">
                <div>
                    <Image src={product.imageUrl} width={520} height={480} alt="" />
                </div>

                <div className="flex flex-col p-10">
                    <strong className="text-4xl">{product.name}</strong>
                    <p className="text-xl mt-10 hidden md:flex">{product.description}</p>
                    <span className="text-3xl mt-10">{product.price}</span>
                    <button
                        className="bg-custom-yellow hover:bg-yellow-400 text-white mt-10 md:mt-auto h-12 w-full rounded-md"
                        disabled={isCreatingCheckoutSession}
                        onClick={handleBuyButton}
                    >
                        Comprar agora
                    </button>
                </div>
            </div>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {
                params: { id: 'prod_MLH5Wy0Y97hDAC' }
            }
        ],
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
    if (!params || !params.id) {
        return {
            notFound: true,
        };
    }

    const productId = params.id;

    const product = await stripe.products.retrieve(productId, {
        expand: ['default_price']
    });

    const price = product.default_price as Stripe.Price;
    const productPrice = price.unit_amount !== null ? price.unit_amount / 100 : 0;

    return {
        props: {
            product: {
                id: product.id,
                name: product.name,
                imageUrl: product.images[0],
                price: new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL'
                }).format(productPrice * 1),
                description: product.description,
                defaultPriceId: price.id
            }
        },
        revalidate: 60 * 60 * 1
    }
}