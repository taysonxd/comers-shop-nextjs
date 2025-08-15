import { getCartItems } from "@/cart/actions/actions";
import { Footer, Sidebar, TopMenu } from "../../components";

export default async function ShopLayout({ children }: { children: React.ReactNode; }) {

  const cartItems = await getCartItems();
    
  return (
    <div className="min-h-screen">

      <TopMenu cartItems={ cartItems } />
      <Sidebar />

      <div className="px-0 sm:px-10">
        { children }
      </div>

      <Footer />
    </div>
  );
}