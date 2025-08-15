'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

const options = {
    'desc': 'Precio: mayor a menor',
    'asc': 'Precio: menor a mayor',
};

export const SortBySelect = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [openSort, setOpenSort] = useState(false);
    const [sortType, setSortType] = useState('Ordenar por');
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleSearch = useDebouncedCallback((sortBy) => {
        const params = new URLSearchParams(searchParams);
        
        if (sortBy) params.set('sort', `price:${sortBy}`);
        else params.delete('sort');
        
        replace(`${pathname}?${params.toString()}`);
    }, 300);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
        if ( dropdownRef.current && !dropdownRef.current.contains(event.target as Node) )
            setOpenSort(false);      
        };

        document.addEventListener('mousedown', handleClickOutside);
        setSortType(options['desc']);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
    return (
        <div className="flex items-end">        
            <div ref={dropdownRef} className="relative">
                <button
                    onClick={() => setOpenSort((prev) => !prev)}
                    className="flex items-center justify-end w-50 py-2 text-sm font-semibold text-left bg-transparent rounded-lg"
                >
                    <span>{sortType}</span>
                    <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        className={`w-4 h-4 transition-transform duration-200 transform ${
                            openSort ? 'rotate-180' : 'rotate-0'
                        }`}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>

            {openSort && (
                <div className="absolute z-50 w-full origin-top-right transition ease-out duration-100 transform scale-100 opacity-100">
                    <div className="px-2 pt-2 pb-2 bg-white rounded-md shadow-lg dark:bg-gray-700">
                        <div className="flex flex-col">
                        {Object.entries(options).map((option, index) =>
                            sortType !== option[1] ? (
                                <span
                                    key={index}                                
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setSortType(option[1]);
                                        handleSearch(option[0])
                                        setOpenSort(false);
                                    }}
                                    className="flex cursor-pointer flex-row items-start rounded-lg bg-transparent p-2 hover:bg-gray-200"
                                >
                                    <div>
                                        <p className="font-semibold">{option[1]}</p>
                                    </div>
                                </span>
                            ) : null
                        )}
                        </div>
                    </div>
                </div>
            )}
            </div>
        </div>    
    );
}