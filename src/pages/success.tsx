import { GetServerSideProps } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { stripe } from "../lib/stripe";
import { Header } from "@/components/Header";

interface SuccessProps {
    customerName: string;
    product: {
        name: string;
        imageUrl: string;
    }
}

export default function Success({ customerName, product }: SuccessProps) {
    return (
        <>
            <Head>
                <title>Compra efetuada | JR DEVlivery</title>
            </Head>

            <Header />

            <div className="flex flex-col items-center justify-center gap-10">
                <h1 className="text-4xl text-center mt-20">Compra efetuada</h1>
                <div className="flex w-60 h-60 items-center justify-center border border-black rounded-full">
                    <Image src={product.imageUrl} width={160} height={170} alt={product.name} />
                </div>
                <p className="text-2xl">
                    Uhuul <strong>{customerName}</strong>, sua <strong>{product.name}</strong> já está a caminho da sua casa.
                </p>
                <Link href="/dashboard" className="bg-custom-yellow hover:bg-yellow-400 text-white p-2 h-12 rounded-md">
                    <span className="text-xl">Voltar ao catálogo</span>
                </Link>
            </div>
        </>
    )
}

export const getServerSideProps: GetServerSideProps<SuccessProps> = async ({ query }) => {
    if (!query.session_id || typeof query.session_id !== 'string') {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }

    const sessionId = query.session_id;

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId, {
            expand: ['line_items', 'line_items.data.price.product']
        });

        const customerName = session.customer_details?.name || 'Cliente';

        let product: {
            name: string;
            imageUrl: string;
        } = {
            name: 'Produto',
            imageUrl: '/default-image-url.jpg'
        };

        if (session.line_items && session.line_items.data.length > 0) {
            const price = session.line_items.data[0].price;
            if (price && price.product) {
                if (typeof price.product === 'object' && 'name' in price.product) {
                    product.name = price.product.name || 'Produto';

                    if ('images' in price.product && price.product.images && price.product.images.length > 0) {
                        product.imageUrl = price.product.images[0];
                    }
                } else if (typeof price.product === 'string') {
                    product.name = price.product;
                }
            }
        }

        return {
            props: {
                customerName,
                product
            }
        };
    } catch (error) {
        console.error('Erro ao recuperar sessão do Stripe:', error);
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        };
    }
};