'use client'
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem, 
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Separator } from "@/components/ui/separator";
const sideheader = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { setTheme } = useTheme();

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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="mt-10">
              <p className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0">
                <Image src='/light.svg' height={50} width={50} alt="dark"/>
              </p>
              <p className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-white transition-all dark:rotate-0 dark:scale-100">
              <Image src='/dark.svg' height={50} width={50} alt="dark" className="text-white"/>
              </p>
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Separator className=" w-full right-0 mx-0"/>
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
