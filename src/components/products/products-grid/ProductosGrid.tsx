import { Product } from "@/interfaces/product.interface"
import { ProductGridItem } from "./ProductGridItem"
import { Pagination } from "@/components"

interface Props {
    products: Product[]
}

export const ProductosGrid = ({ products }: Props) => {
  return (    
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
    {
        products.map(product => (
            <ProductGridItem
                key={product.id}
                product={ product }
            />
        ))
    }
    </div>      
  )
}
