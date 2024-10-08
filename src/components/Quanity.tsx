import { useEffect, useState } from 'react';

export function Quanity() {
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const storedQuantity = localStorage.getItem('quantity');
        if (storedQuantity) {
            setQuantity(Number(storedQuantity));
        }
    }, []);

    const increaseQuantity = () => {
        setQuantity(prevQuantity => {
            const newQuantity = prevQuantity + 1;
            localStorage.setItem('quantity', newQuantity.toString());
            return newQuantity;
        });
    };

    const decreaseQuantity = () => {
        setQuantity(prevQuantity => {
            if (prevQuantity > 1) {
                const newQuantity = prevQuantity - 1;
                localStorage.setItem('quantity', newQuantity.toString());
                return newQuantity;
            }
            return prevQuantity; // Não permitir que a quantidade fique abaixo de 1
        });
    };

    return (
        <div className='flex items-center gap-1'>
            <button onClick={decreaseQuantity} className='h-8 w-8 border font-bold hover:bg-gray-50'>-</button>
            <span className='font-bold text-xl'>{quantity}</span>
            <button onClick={increaseQuantity} className='h-8 w-8 border font-bold hover:bg-gray-50'>+</button>
        </div>
    );
}
