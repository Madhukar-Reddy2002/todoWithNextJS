import Link from "next/link";
import Image from "next/image";
import Ms from '../public/MS.png';
import { HiOutlinePlus } from "react-icons/hi";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center bg-slate-800 px-8 py-3 outline-double">
      <Link className="text-white font-bold outline-dotted rounded-full" href={"/"} >
        <Image src={Ms}  height={50} width={50} />
      </Link>
      <Link className="bg-white p-2 rounded-full" href={"/addTopic"}>
        <HiOutlinePlus />
      </Link>
    </nav>
  );
}
