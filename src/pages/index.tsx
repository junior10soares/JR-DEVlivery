import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetStaticProps } from 'next';

import Insert from '@/components/Insert';
import { axiosBase } from '@/lib/axios';

interface Product {
    id: number;
    images: string;
    title: string;
    description: string;
    price: number;
}

interface HomeProps {
    products: Product[];
}

export default function Home({ products }: HomeProps) {
    return (
        <div className='w-full'>
            <Head>
                <title>E-Commerce | Home</title>
            </Head>

            <Insert />

            <strong className='text-3xl font-bold my-16 block'>Explore our latest drops</strong>

            <div className='flex flex-col gap-6 lg:grid grid-cols-4 my-6 lg:gap-24'>
                {products.map(product => (
                    <Link key={product.id} href={`/product/${product.id}`}>
                        <div className='bg-slate-100 hover:bg-white p-8 rounded-2xl w-full mb-2'>
                            <Image
                                alt={product.title}
                                src={product.images[0]}
                                width={100}
                                height={150}
                                className='w-full h-auto'
                            />
                            <strong>{product.title}</strong>
                            <p className='truncate mt-1'>{product.description}</p>
                            <span className='font-bold mt-1 block'>${product.price.toFixed(2)}</span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export const getStaticProps: GetStaticProps = async () => {
    try {
        const response = await axiosBase.get<{ products: Product[] }>('/products');

        const products: Product[] = response.data.products
            .slice(0, 4)
            .map(product => ({
                id: product.id,
                images: product.images || '',
                title: product.title,
                description: product.description,
                price: product.price,
            }));

        return {
            props: {
                products,
            },
            revalidate: 60 * 60 * 1,
        };
    } catch (error) {
        console.error('Error fetching products:', error);
        return {
            props: {
                products: [],
            },
        };
    }
};
