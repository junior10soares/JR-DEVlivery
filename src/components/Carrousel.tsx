import Image from "next/image";
import { useState } from "react";

import shoes from '@/assets/shoes.png';

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    images: string[];
}

interface CarrouselProps {
    product: Product | null
}

export function Carroulsel({ product }: CarrouselProps) {

    const images = [...(product?.images || []), shoes];
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className='relative w-[800px] h-[448px] bg-slate-100 rounded-3xl overflow-hidden'>
            <Image
                src={images[currentIndex]}
                alt={product?.title || ''}
                layout='fill'
                objectFit='contain'
            />
            <button
                onClick={prevImage}
                className='absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200'
            >
                &lt;
            </button>
            <button
                onClick={nextImage}
                className='absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg hover:bg-gray-200'
            >
                &gt;
            </button>
        </div>
    )
}