import { Pagination, ProductosGrid, SearchInput, SearchInputRange, SortBySelect, Title } from "@/components";
import * as api from '@/services'

interface Props {
  searchParams: Promise<{
    query?: string;
    page?: string;
    priceMin?: string;
    priceMax?: string;
    orderBy?: string;
  }>
}

export default async function ShopPage({ searchParams }: Props) {

  const queryParams = await searchParams;  
  const { items: products, limit, total } = await api.getProducts(queryParams);
    
  return (
    <>
      <Title
        title="Productos"
        subtitle="Todos los productos"
        className="mb-2"
      />

      <div className="flex flex-col sm:flex-row mb-10 gap-5">
        <SearchInput />
        <SearchInputRange />
        <div className="flex ml-auto">
          <SortBySelect />
        </div>
      </div>

      <ProductosGrid products={products} />

      {
        (Math.ceil(total/limit) > 1) && ( <Pagination totalPages={ Math.ceil(total/limit) }/> )
      }
    </>
  );
}
