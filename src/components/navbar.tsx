import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return(
    <div className="flex justify-between px-5 py-2 outline-none">
      <Link href='/' className="flex gap-2 items-center">
        <div className="text-6xl font-bold">
          HomeBins
        </div>
        <Image
          src="/assets/images/open-box.png"
          alt="HomeBins Logo"
          width={32}
          height={32}
        />
      </Link>
    </div>
  )
}