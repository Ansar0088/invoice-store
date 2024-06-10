"use client";
import { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
const DrawerMian = () => {
  const [inputs, setInputs] = useState([3]);

  const AddInputs = () => {
    if (inputs.length < 1) {
      setInputs([1]);
    } else {
      setInputs([...inputs, inputs.length + 1]);
    }
  };

  const DeleteInputs = () => {
    if (inputs.length > 1) {
      setInputs(inputs.slice(0, inputs.length - 1));
    }
  };
  interface Input {
    id: number;
    name: string;
  }
  return (
    <>
      <Drawer direction="left">
        <DrawerTrigger>
          <Button
            variant={"secondary"}
            className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-400 bg-blue-800 text-white hover:bg-blue-800"
          >
            <Image
              src="/add.svg"
              height={20}
              width={20}
              alt="new"
              className="mr-2"
            />
            New invoice
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <ScrollArea className="h-[680px] rounded-md px-5 ">
            <form className="p-5">
              <div>
                <p>Street Address</p>
                <Input
                  className={cn("outline-none border rounded-md")}
                  placeholder="address"
                />
              </div>
              <div className="flex gap-3 mt-5">
                <div>
                  <p className="text-xs mb-1">City</p>
                  <Input className={cn("outline-none border rounded-md")} />
                </div>
                <div>
                  <p className="text-xs mb-1">Post Code</p>
                  <Input className={cn("outline-none border rounded-md")} />
                </div>
                <div>
                  <p className="text-xs mb-1">Country</p>
                  <Input className={cn("outline-none border rounded-md")} />
                </div>
              </div>
              <div className="mt-5">
                <p className="text-sm font-bold mb-4">Bill To</p>
                <p className="text-xs font-normal mb-1">Clients Name</p>
                <Input className={cn("outline-none border rounded-md")} />

                <p className="text-xs font-normal mb-1 mt-3">Clients Email</p>
                <Input className={cn("outline-none border rounded-md")} />

                <div className="mt-5">
                  <p className="font-bold">Items List</p>
                  {inputs.map((input: any) => (
                    <div key={input.id} className="flex items-center gap-2">
                      <Input
                        type="text"
                        className="border my-2 "
                        placeholder="Item name"
                      />
                      <Input
                        type="text"
                        className="border my-2 "
                        placeholder="Qty"
                      />
                      <Input
                        type="text"
                        className="border my-2 "
                        placeholder="Price"
                      />
                      <Button
                        onClick={DeleteInputs}
                        variant={"outline"}
                        size={"sm"}
                        className="border-none"
                      >
                        <Image
                          src="/delete.svg"
                          height={50}
                          width={100}
                          alt="new"
                          className=""
                        />
                      </Button>
                    </div>
                  ))}
                </div>
                <Button
                  onClick={AddInputs}
                  size={"sm"}
                  className="mr-2 text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300"
                >
                  Add
                </Button>
              </div>
              <DrawerFooter>
                <Button
                  type="submit"
                  className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300"
                >
                  Save & send
                </Button>
                <DrawerClose className="absolute top-3 right-0 mr-5">
                  <Button variant="outline">
                    <Image src="/cros.svg" height={20} width={20} alt="new" />
                  </Button>
                </DrawerClose>
              </DrawerFooter>
            </form>
          </ScrollArea>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerMian;
