interface ButtonAddCartProps {
    onClick: () => void;
    title: string
}

export function ButtonAddCart({ onClick, title }: ButtonAddCartProps) {
    return (
        <div className='flex justify-center items-center'>
            <button
                onClick={onClick}
                className='mt-8 bg-black hover:bg-white hover:border border-black hover:text-black text-white h-14 w-64 font-bold rounded-md'
            >
                {title}
            </button>
        </div>
    );
}
