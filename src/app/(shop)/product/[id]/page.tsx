import { getProductById } from "@/api";
import { ProductMobileSlideshow } from "@/components/product/slideshow/ProductMobileSlideshow";
import { ProductSlideshow } from "@/components/product/slideshow/ProductSlideshow";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";
import { AddToCart } from "./ui/AddToCart";

interface Props {
    params: Promise<{
        id: string
    }>
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params
    const product = await getProductById(id);
        
    if( !product )
        return notFound();

    return (
        <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

            <div className="col-span-1 md:col-span-2">
                <ProductMobileSlideshow
                    title={ product.title }
                    images={[ product.image ]}
                    className='block md:hidden'
                />

                <ProductSlideshow
                    title={ product.title }
                    images={[ product.image ]}
                    className='hidden md:block'
                />
            </div>

            <div className="col-span-1 px-5">

                {/* <StockLabel /> */}

                <h1 className={ `${ titleFont.className } antialiased font-bold text-xl` }>
                    { product.title }
                </h1>
                <p className="text-lg mb-5">
                    ${ product.price }
                </p>

                <AddToCart product={product} />
                
                <h3 className="font-bold text-sm">Descripción</h3>
                <p className="font-light">
                    { product.description }
                </p>
            </div>
        </div>
    );
}