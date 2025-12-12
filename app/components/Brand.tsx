import Link from 'next/link'
import Image from 'next/image'

import Logo from "./../assets/images/logo.svg"

export default function Brand() {
    return (
        <Link href="/" className="flex items-center gap-2 text-blue-500 dark:text-blue-100">
            <Image src={Logo} alt="Dav/Devs Logo" width={16} height={16} />
            <span className="uppercase font-bold">Dav/Devs</span>
        </Link>
    )
}