import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-[#125175] p-4 w-full z-[1] rounded-tl-lg rounded-tr-lg text-xs md:text-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Edunify
        </Link>
        <div className="space-x-4">
          <Link href="/" className="text-white hover:text-yellow-400">
            Add School
          </Link>
          <Link
            href="/show-schools"
            className="text-white hover:text-yellow-400"
          >
            Show School
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
