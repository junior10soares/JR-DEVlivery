import Image from 'next/image'
import imgGifa from '../assets/a.gif'
import imgGifb from '../assets/b.gif'
import imgGifc from '../assets/c.gif'
import imgGifd from '../assets/d.gif'
import imgGife from '../assets/e.gif'
import imgGiff from '../assets/f.gif'
import imgGifg from '../assets/g.gif'
import imgGifh from '../assets/h.gif'
import imgGifi from '../assets/i.gif'

export function ListGifs() {
    return (
        <div className="grid lg:grid-cols-9 gap-1 items-center justify-center">
            <Image alt='gifa' src={imgGifa} height={150} width={150} />
            <Image alt='gifa' src={imgGifb} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGifc} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGifd} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGife} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGiff} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGifg} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGifh} height={150} width={150} className='hidden sm:block' />
            <Image alt='gifa' src={imgGifi} height={150} width={150} className='hidden sm:block' />
        </div>
    )
}