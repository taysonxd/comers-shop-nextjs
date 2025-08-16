import Link from 'next/link';
import React from 'react'
import { IoSearch } from 'react-icons/io5';

export const NoResults = () => {
    return (
        <div className="flex h-100 flex-col items-center justify-center">
            <IoSearch size={80} className='text-gray-400'/>
            <span className='text'>No se encontraron resultados </span>
            <span className='text-xl font-semibold text-center'>Ajusta los parametros para abarcar más resultados</span>            
        </div> 
    );
}
