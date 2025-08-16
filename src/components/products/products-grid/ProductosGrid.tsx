import { Product } from "@/interfaces/product.interface"
import { ProductGridItem } from "./ProductGridItem"
import { NoResults, Pagination } from "@/components"

interface Props {
    products: Product[]
}

export const ProductosGrid = ({ products }: Props) => {

  if (!products.length)
    return ( <NoResults /> );
  
  return (    
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">
    {
      !!products.length && (
        products.map(product => (
            <ProductGridItem
              key={product.id}
              product={product}
            />
        ))
      )        
    }  
    </div>      
  )
}
