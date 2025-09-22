import { getCartItems } from "@/cart/actions/actions";
import { Footer, Sidebar, TopMenu } from "../../components";

export default async function ShopLayout({ children }: { children: React.ReactNode; }) {

  const cartItems = await getCartItems();
        
  return (
    <div className="min-h-screen relative">
      <TopMenu cartItems={ cartItems } />      
      <Sidebar />      

      <div className="pt-14 px-2 sm:px-10">
        { children }
      </div>

      <Footer />
    </div>
  );
}