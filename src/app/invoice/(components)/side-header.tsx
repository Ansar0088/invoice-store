"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";

const sideheader = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="bg-[#7777bd] relative h-full p-3 flex flex-col items-center justify-between rounded-tr-3xl rounded-br-3xl">
      <div>
        <Image
          src="/invoice.png"
          width={120}
          height={100}
          alt="logo"
          className="rounded-full mt-5"
        />
      </div>
      <div className=" h-40 flex flex-col justify-between items-center w-full">
        <Button
          variant="outline"
          size="icon"
          className="mt-10 relative"
          onClick={toggleTheme}
        >
          {theme === "dark" ? (
            <Image
              src="/dark.svg"
              height={50}
              width={20}
              alt="Switch to light mode"
            />
          ) : (
            <Image
              src="/light.svg"
              height={50}
              width={20}
              alt="Switch to dark mode"
              className="text-white"
            />
          )}
        </Button>
        <Separator className=" w-full right-0 mx-0" />
        <Image
          src="/avtr.jpg"
          width={40}
          height={100}
          alt="logo"
          className="rounded-full"
        />
      </div>
    </div>
  );
};

export default sideheader;
