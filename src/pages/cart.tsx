import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Quanity } from '@/components/Quanity';
import { ButtonAddCart } from '@/components/ButtonAddCart';

interface CartProps {
    id: string;
    price: number;
    title: string;
    description: string;
    images: string[];
    quantity: number;
}

export default function Cart() {
    const [cart, setCart] = useState<CartProps[]>([]);

    useEffect(() => {
        const cartString = localStorage.getItem('cart');
        const cartData = cartString ? JSON.parse(cartString) : [];
        setCart(cartData);
    }, []);

    const totalPrice = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    const handleRemove = (id: string) => {
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="flex flex-col lg:flex-row lg:col-span-2 my-8 gap-16">
            <div className="flex flex-col gap-7">
                <h1 className="text-4xl font-bold">Your Bag</h1>
                {cart.map(item => (
                    <div key={item.id} className="flex flex-col lg:flex-row gap-4 border-b pb-4">
                        <div className="flex justify-center rounded-xl bg-slate-100 w-[205px] h-[165px]">
                            <Image alt="" src={item.images[0]} width={166} height={166} />
                        </div>
                        <main className="w-full flex flex-col lg:ml-10 justify-between">
                            <div className="flex">
                                <header className="font-bold text-xl flex-1">{item.title}</header>
                                <strong>${item.price}</strong>
                            </div>
                            <p className="text-xl text-gray-400 mb-16 w-[700px] truncate">{item.description}</p>
                            <footer className="flex">
                                <Quanity />
                                <button
                                    className="hover:text-black hover:border-b-black text-gray-400 ml-16 border-b"
                                    onClick={() => handleRemove(item.id)}
                                >
                                    Remove
                                </button>
                            </footer>
                        </main>
                    </div>
                ))}
            </div>
            <div className="lg:w-[1200px] flex flex-col justify-between h-[509px] border border-black rounded-xl p-9">
                <h1 className="font-bold text-4xl">Summary</h1>
                <div className="flex text-lg">
                    <p className="flex flex-1">Subtotal</p> <span>${totalPrice}</span>
                </div>
                <div className="flex text-lg">
                    <p className="flex flex-1">Shipping and delivery</p> <span>$20.00</span>
                </div>
                <div className="flex text-lg">
                    <p className="flex flex-1">Tax</p> <span>$6.00</span>
                </div>
                <div className="flex text-lg">
                    <p className="flex flex-1">Discount</p> <span className="text-orange-600">-$6.00</span>
                </div>
                <div className="border-b"></div>
                <div className="flex text-lg font-bold">
                    <p className="flex flex-1 text-2xl">Total</p> <span>{totalPrice}</span>
                </div>
                <ButtonAddCart title="Checkout" onClick={() => console.log('oi')} />
            </div>
        </div>
    );
}
