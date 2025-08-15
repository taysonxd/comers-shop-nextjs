'use client'

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface Props {
    totalPages: number;
}

export const Pagination = ({ totalPages = 4 }: Props) => {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    
    const createPageURL = (pageNumber: number | string) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };
        
    return (
        <div className="flex justify-center">
            <nav aria-label="Page navigation example">
                <ul className="flex list-style-none">
                    <li className="page-item disabled">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded",
                                {                                
                                    "text-gray-500 pointer-events-none focus:shadow-none": currentPage === 1,
                                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none": currentPage !== 1
                                }
                            )}                            
                            href={createPageURL( currentPage - 1 )} tabIndex={-1}
                            aria-disabled={ currentPage === 1 }
                        >
                            Anterior
                        </Link>
                    </li>
                    {
                        Array.from({ length: totalPages }, (_, i) => ++i ).map(page => (
                            <li key={page} className="page-item active">
                                <Link
                                    className={clsx({
                                        "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none": currentPage !== page,
                                        "page-link relative block py-1.5 px-3 border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md": currentPage === page
                                    })}
                                    href={createPageURL(page)}
                                >
                                    { page }
                                    <span className="visually-hidden"></span>
                                </Link>
                            </li>                    
                        ))
                    }                    
                    <li className="page-item">
                        <Link
                            className={clsx(
                                "page-link relative block py-1.5 px-3 border-0 bg-transparent outline-none transition-all duration-300 rounded",
                                {                                
                                    "text-gray-500 pointer-events-none focus:shadow-none": currentPage === totalPages,
                                    "text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none": currentPage !== totalPages
                                }
                            )}                            
                            href={createPageURL( currentPage + 1 )}
                        >
                            Siguiente
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

