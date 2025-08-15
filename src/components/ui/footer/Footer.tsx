import { titleFont } from "@/config/fonts"
import Link from "next/link"

export const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs my-15">
        
        <Link href="/">
            <span className={`${ titleFont.className } antialiased font-bold`}>Comers </span>
            <span>| Shop </span>
            <span>© { new Date().getFullYear() }</span>
        </Link>

        <Link
            href="/"
            className="mx-3"
        >
            Privacidad & Legal
        </Link>
        <Link
            href="/"
            className="mx-3"
        >
            Ubicaciones
        </Link>
    </div>
  )
}
