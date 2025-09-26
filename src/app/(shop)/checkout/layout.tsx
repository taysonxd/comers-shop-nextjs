import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function CheckoutLayout({ children }: {
 children: React.ReactNode;
}) {

    const session = await getServerSession();

    if( !session?.user ) 
        redirect('/auth/login?redirectTo=/checkout/address');

    return (
        <>
        { children }
        </>
    );
}