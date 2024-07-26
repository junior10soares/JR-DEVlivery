import { FaMapMarker } from 'react-icons/fa'

import logo from '../../public/a.webp'

import Image from 'next/image';
import Link from 'next/link';

export function Header() {

    return (
        <div className='bg-black flex items-center text-center justify-between p-5 mb-5'>
            <Link href='/dashboard'>
                <div className={`bg-black flex items-center justify-center`}>
                    <Image alt='logo' src={logo} height={80} />
                    <strong className='text-white text-2xl hidden md:flex'>JR DEVlivery</strong>
                </div>
            </Link>
            <div className='flex gap-3'>
                <strong className='text-1xl text-white'>Rua Antônio Graciano da Rocha, 511</strong>
                <FaMapMarker color='red' size={20} />
            </div>
        </div>
    )
}