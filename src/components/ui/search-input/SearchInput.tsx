'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import { useDebouncedCallback } from 'use-debounce';

export const SearchInput = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleSearch = useDebouncedCallback((term) => {
        const params = new URLSearchParams(searchParams);
        
        if (term) params.set('q', term);
        else params.delete('q');
        
        replace(`${pathname}?${params.toString()}`);
    }, 300);
    
    return (
        <div>
            <span className='font-light text-xl'>Busqueda</span>
            <div className="relative">                    
                <input
                    className="w-[400px] bg-gray-50 rounded pl-3 pr-10 py-1 border-b-2 text-xl border-gray-200 focus:outline-none focus:border-blue-500"
                    type="text"
                    placeholder="Titulo o descripción"
                    onChange={(e) => {
                        handleSearch(e.target.value);
                    }}
                    defaultValue={searchParams.get('q')?.toString()}
                />
                <IoSearchOutline size={20} className="absolute top-2 right-2" />
            </div>
        </div>

    )
}
