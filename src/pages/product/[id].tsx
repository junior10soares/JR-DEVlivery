import Head from 'next/head';
import { GetStaticPaths, GetStaticProps } from 'next';

import { ButtonAddCart } from '@/components/ButtonAddCart';
import { Quanity } from '@/components/Quanity';
import { Carroulsel } from '@/components/Carrousel';
import { axiosBase } from '@/lib/axios';
export interface Product {
    id: number;
    images: string[];
    title: string;
    description: string;
    price: number;
}

export interface ProductProps {
    product: Product | null;
}

export default function Product({ product }: ProductProps) {

    const addToCart = () => {
        const cartString = localStorage.getItem('cart');
        const cart = cartString ? JSON.parse(cartString) : [];

        const existingProductIndex = cart.findIndex((item: { id: number | undefined; }) => item.id === product?.id);

        if (existingProductIndex !== -1) {
            cart[existingProductIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 7 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));

        window.dispatchEvent(new Event('storage'));
    };

    return (
        <>
            <Head>
                <title>E-Commerce | Product</title>
            </Head>

            <div className='flex flex-col gap-10 lg:flex-row lg:col-span-2 justify-between my-20'>
                <Carroulsel product={product} />

                <div className='border p-9 border-black rounded-3xl w-[800px] h-[448px]'>
                    <strong className='text-2xl'>{product?.title}</strong>
                    <p className='text-2xl text-gray-400 font-bold mt-4 truncate'>{product?.description}</p>
                    <strong className='text-2xl mt-4 block border-b pb-10'>{`$${product?.price.toFixed(2)}`}</strong>
                    <p className='mt-6 font-bold mb-6'>Quantity</p>
                    <Quanity />
                    <ButtonAddCart onClick={addToCart} title='Add cart' />
                </div>
            </div>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    //pega o id do params
    const response = await axiosBase.get('/products');
    const products = response.data.products;

    const paths = products.map((product: Product) => ({
        params: { id: product.id.toString() },
    }));

    return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params || !params.id) {
        return {
            notFound: true,
        };
    }

    try {
        //pega o params do getStaticPaths a cima
        const response = await axiosBase.get(`/products/${params.id}`);
        const product: Product = response.data;

        return {
            props: {
                product,
            },
            revalidate: 60 * 60 * 1,
        };
    } catch (error) {
        console.error('Error fetching product:', error);
        return {
            props: {
                product: null,
            },
        };
    }
};
