
import { Title } from "@/components";
import { redirect } from "next/navigation";
import { getServerSession } from 'next-auth';

export default async function ProfilePage() {

    const session = await getServerSession();

    if( !session?.user )
        redirect('/');

    return (
        <div>
            <Title title="Perfil" />
            <pre>
            {
                JSON.stringify(session, null, 2)
            }
            </pre>            
        </div>
    );
}