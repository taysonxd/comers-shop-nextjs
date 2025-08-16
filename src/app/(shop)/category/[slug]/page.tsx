import { ProductosGrid, SearchInputRange, SearchInput, SortBySelect, Title, Pagination } from "@/components";
import { Category } from "@/interfaces/product.interface";
import { notFound } from "next/navigation";
import * as api from '@/api'

interface Props {
    params: Promise<{
        slug: Category;        
    }>,
    searchParams: Promise<{
        slug: Category;
        query?: string;
        page?: string;
        priceMin?: string;
        priceMax?: string;
        orderBy?: string;
    }>
}

export default async function({ params, searchParams }: Props) {
  
  const { slug } = await params as { slug: keyof typeof Category};
  const queryParams = await searchParams;  
  
  const categories: Record<keyof typeof Category, { title: string; subtitle: string }>  = {
    electronics: {
      title: 'Electrónicos',
      subtitle: 'Todos los productos electrónicos'
    },
    jewelery: {
      title: 'Joyeria',
      subtitle: 'Todos los productos de joyeria'
    },
    men_s_clothing: {
      title: 'Hombres',
      subtitle: 'Todos los productos para hombres'
    },
    women_s_clothing: {
      title: 'Unisex',
      subtitle: 'Todos los productos para mujeres'
    },
  }        
  
  if (!categories[slug])
    notFound();

  const { items: products, limit, total } = await api.getProducts({ category: slug, ...queryParams});

  return (
    <>
      <Title
        title={ categories[slug].title }
        subtitle={ categories[slug].subtitle }
        className="mb-2"
      />

      <div className="flex flex-col sm:flex-row mb-10 gap-5">
        <SearchInput />
        <SearchInputRange />

        <div className="flex ml-auto">
          <SortBySelect />
        </div>
      </div>

      <ProductosGrid products={ products } />

      {
        (Math.ceil(total/limit) > 1) && ( <Pagination totalPages={ Math.ceil(total/limit) }/> )
      }
    </>
  );
}
