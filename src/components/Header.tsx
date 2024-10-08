import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ShoppingBag } from 'lucide-react';

import logo from '@/assets/logo.png';

export function Header() {
    const [cartLength, setCartLength] = useState(0);

    const updateCartLength = () => {
        const cartString = localStorage.getItem('cart');
        if (cartString) {
            const cart = JSON.parse(cartString);
            setCartLength(cart.length);
        } else {
            setCartLength(0);
        }
    };

    useEffect(() => {
        updateCartLength(); // Atualiza a quantidade ao montar o componente

        const handleStorageChange = () => {
            updateCartLength(); // Atualiza quando há uma alteração no localStorage
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    return (
        <div className='flex h-20 justify-between items-center border-b-2'>
            <Link className='flex items-center' href='/'>
                <Image alt='' src={logo} height={24} width={100} />
            </Link>
            <Link
                href='/cart'
                className={`flex gap-2 border border-black rounded-md p-2 relative ${cartLength === 0 ? 'cursor-not-allowed opacity-50' : 'hover:bg-black hover:text-white'}`}
            >
                <ShoppingBag />
                View Cart
                {cartLength > 0 && (
                    <span className='bg-red-600 text-center font-bold text-white rounded-full h-5 w-5 text-sm absolute bottom-8 left-28'>
                        {cartLength}
                    </span>
                )}
            </Link>
        </div>
    );
}
