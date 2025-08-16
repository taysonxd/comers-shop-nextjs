'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { IoArrowUndoOutline, IoCloseOutline } from 'react-icons/io5';

import { Range } from 'react-range';
import { useDebouncedCallback } from 'use-debounce';

const STEP = 10;
const MIN = 1;
const MAX = 1000;
const MIN_GAP = 1;

type RangeValues = number[];

export const SearchInputRange = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [values, setValues] = useState([1, 1000]);

    const handleSearch = useDebouncedCallback(([minVal, maxVal]: RangeValues) => {
        const params = new URLSearchParams(searchParams);
        
        if (minVal && minVal > MIN) params.set('minPrice', minVal.toString());
        else params.delete('minPrice');

        if (maxVal && maxVal < MAX) params.set('maxPrice', maxVal.toString());
        else params.delete('maxPrice');
        
        replace(`${pathname}?${params.toString()}`);
    }, 350);

    const handleChange = ([minVal, maxVal]: RangeValues) => {
        
        if (minVal < MIN || maxVal > MAX) return;
        
        if (maxVal - minVal < MIN_GAP) {
            if (values[0] !== minVal) {
                minVal = maxVal - MIN_GAP;
            } else {
                maxVal = minVal + MIN_GAP;
            }
        }
        
        setValues([minVal, maxVal]);
        handleSearch([minVal, maxVal])
    };

    return (
        <div className="flex flex-col justify-center">
            <div className='flex gap-1'>
                <span className='font-light text-xl'>Rango de precio</span>
                {
                    (values[0] !== MIN || values[1] !== MAX) && (
                        <button
                            onClick={() => handleChange([MIN, MAX])}
                            className='p-1 rounded-xl cursor-pointer hover:bg-gray-200 transition-all'
                        >
                            <IoCloseOutline size={20}/>
                        </button>
                    )
                }
            </div>
            <div className="w-[350px] max-w-xl">                
                <div className="flex justify-between items-center">
                    <input
                        readOnly
                        disabled
                        type="text"
                        value={values[0]}
                        onChange={(e) => handleChange([Number(e.target.value), values[1]]) }
                        className="w-[60px] mr-4 text-center bg-gray-50 rounded py-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                    />

                    <Range
                        values={values}
                        step={STEP}
                        min={MIN}
                        max={MAX}
                        onChange={handleChange}
                        renderTrack={({ props, children }) => (
                            <div
                                {...props}
                                className="h-1 w-full bg-gray-200 rounded-md relative"
                            >
                                <div
                                    className="absolute top-0 bottom-0 bg-blue-500 rounded-md"
                                    style={{
                                        left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                                        width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
                                    }}
                                />
                                {children}
                            </div>
                        )}
                        renderThumb={({ props: { key, ...restProps}, index }) => (
                            <div
                                {...restProps}
                                key={index}
                                className="w-3 h-3 bg-blue-500 rounded-full -mt-0 flex items-center justify-center shadow-md"
                            />                                            
                        )}
                    />

                    <input
                        readOnly
                        disabled
                        type="text"                        
                        value={values[1]}
                        onChange={(e) => handleChange([values[0], Number(e.target.value)]) }
                        className="w-[60px] ml-4 text-center bg-gray-50 rounded py-1 border-b-2 border-gray-200 focus:outline-none focus:border-blue-500"
                    />
                </div>
            </div>
        </div>
    );
}
