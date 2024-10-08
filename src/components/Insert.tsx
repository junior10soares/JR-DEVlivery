import Image from "next/image";

import shoes from '@/assets/shoes.png';

export default function Insert() {
    return (
        <div className="hidden justify-center my-6 lg:flex">
            <div className="bg-slate-200 p-10 rounded-xl grid grid-cols-2 w-[1600px]">
                <div className="mx-36">
                    <p className="text-5xl text-orange-500 font-bold mb-6">25% OFF</p>
                    <strong className="text-6xl">Summer Sale</strong>
                    <p className="text-gray-400 text-xl mt-6">Discover our summer styles with discount</p>
                    <p className="flex mt-24 justify-center items-center rounded-lg h-12 text-white bg-black w-36">Shop Now</p>
                </div>

                <div className="flex items-center justify-center">
                    <Image alt='Shoes' src={shoes} height={320} width={490} />
                </div>
            </div>
        </div>
    );
}
