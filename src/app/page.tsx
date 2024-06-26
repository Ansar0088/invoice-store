import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import SnowfallComponent from "./invoice/(components)/snowfall-component";
const Page = () => {

  return (
    <div>
      <SnowfallComponent />
      <div className="fixed inset-0 flex justify-center items-center">
        <div className="absolute inset-0 bg-black opacity-20 z-0"></div>
        <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center bg-white dark:bg-[#1E2139] shadow-md rounded-lg gap-3 p-12">
          <Image
            className="w-26 h-26 object-cover object-center"
            height={50}
            width={100}
            src="/side.png"
            alt="logo"
          />
          <p className="text-sm text-center font-semibold">
            View a Demo version
          </p>

          <div className="flex justify-center items-center gap-2">
            <Link href="/invoice">
              <Button
                type="button"
                className="rounded-2xl px-6 py-4 text-xs font-bold text-blue-600 hover:bg-[#EFEFEF] bg-[#EFEFEF]"
              >
                View as Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
