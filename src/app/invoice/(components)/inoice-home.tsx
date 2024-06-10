"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

type FormInputs = {
  id: string;
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  ClientsName: string;
  ClientsEmail: string;
  ItemName: string;
  Quantity: number;
  price: number;
};

const InvoiceHome = (props: any) => {
  const [invoices, setInvoices] = useState<FormInputs[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    const newInvoice = {
      ...formData,
      id: Date.now().toString(),
    };
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const router = useRouter();

  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);

  interface User {
    id: number;
    name: string;
  }
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
  return (
    <div className="container mt-10">
      <div className="flex gap-5 justify-between items-center">
        <div className="flex flex-col items-center">
          <p className="font-bold">Invoices</p>
          <p className="text-xs text-slate-500">
            There are {invoices.length} total invoices
          </p>
        </div>
        <div className="font-bold">Filter by status</div>
        <div className="font-bold">Sort by</div>
        <div>
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
                <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                  <div>
                    <p>Street Address</p>
                    <Input
                      className={cn(
                        "outline-none border rounded-md",
                        errors.streetAddress
                          ? "border-red-500"
                          : "border-slate-300"
                      )}
                      placeholder="address"
                      {...register("streetAddress", { required: true })}
                    />
                    {errors.streetAddress && (
                      <span className="text-red-500 text-xs">
                        This field is required
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div>
                      <p className="text-xs mb-1">City</p>
                      <Input
                        className={cn(
                          "outline-none border rounded-md",
                          errors.city ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("city", { required: true })}
                      />
                      {errors.city && (
                        <span className="text-red-500 text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs mb-1">Post Code</p>
                      <Input
                        className={cn(
                          "outline-none border rounded-md",
                          errors.postCode
                            ? "border-red-500"
                            : "border-slate-300"
                        )}
                        {...register("postCode", { required: true })}
                      />
                      {errors.postCode && (
                        <span className="text-red-500 text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs mb-1">Country</p>
                      <Input
                        className={cn(
                          "outline-none border rounded-md",
                          errors.country ? "border-red-500" : "border-slate-300"
                        )}
                        {...register("country", { required: true })}
                      />
                      {errors.country && (
                        <span className="text-red-500 text-xs">
                          This field is required
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-5">
                    <p className="text-sm font-bold mb-4">Bill To</p>
                    <p className="text-xs font-normal mb-1">Clients Name</p>
                    <Input
                      className={cn(
                        "outline-none border rounded-md",
                        errors.ClientsName
                          ? "border-red-500"
                          : "border-slate-300"
                      )}
                      {...register("ClientsName", { required: true })}
                    />
                    {errors.ClientsName && (
                      <span className="text-red-500 text-xs">
                        This field is required
                      </span>
                    )}
                    <p className="text-xs font-normal mb-1 mt-3">
                      Clients Email
                    </p>
                    <Input
                      className={cn(
                        "outline-none border rounded-md",
                        errors.ClientsEmail
                          ? "border-red-500"
                          : "border-slate-300"
                      )}
                      {...register("ClientsEmail", { required: true })}
                    />
                    {errors.ClientsEmail && (
                      <span className="text-red-500 text-xs">
                        This field is required
                      </span>
                    )}
                    <div className="mt-5">
                      <p className="font-bold">Items List</p>
                      {inputs.map((input: any) => (  
                        <div key={input.id} className="flex items-center gap-2">
                          <Input
                            type="text"
                            className={cn(
                              "outline-none border rounded-md",
                              errors.ItemName
                                ? "border-red-500"
                                : "border-slate-300"
                            )}
                            {...register("ItemName", { required: true })}
                            placeholder="Item name"
                          />
                          <Input
                            type="number"
                            className={cn(
                              "outline-none border rounded-md",
                              errors.Quantity
                                ? "border-red-500"
                                : "border-slate-300"
                            )}
                            {...register("Quantity", { required: true })}
                            placeholder="Qty"
                          />
                          <Input
                            type="number"
                            className={cn(
                              "outline-none border rounded-md",
                              errors.price
                                ? "border-red-500"
                                : "border-slate-300"
                            )}
                            {...register("price", { required: true })}
                            placeholder="Price"
                          />
                          <Button
                            onClick={DeleteInputs}
                            variant={"outline"}
                            size={"sm"}
                            className="border-none m-2"
                          >
                            <Image
                              src="/delete.svg"
                              height={50}
                              width={100}
                              alt="new"
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
                      <Image
                        src="/add.svg"
                        height={20}
                        width={20}
                        alt="new"
                        className="mr-2"
                      />
                      Add new item
                    </Button>
                  </div>
                  <DrawerFooter>
                    <Button
                      type="submit"
                      className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-300"
                    >
                      Save & send
                    </Button>
                    <DrawerClose className=" top-3 right-0 mr-5">
                      <Button variant="outline">
                        <Image
                          src="/cros.svg"
                          height={20}
                          width={20}
                          alt="new"
                        />
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </form>
              </ScrollArea>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      <h2 className="font-bold  m-6 my-3">Invoice List</h2>
      <ScrollArea className="h-[480px] rounded-md px-5 mt-10">
        <div className="">
          <div>
            {invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="mt-4 p-4 flex justify-between items-center border rounded-lg cursor-pointer bg-[#7777BD] text-white font-bold"
                onClick={() => router.push(`/invoice/${invoice.id}`)}
              >
                <p>{invoice.streetAddress}</p>
                <p>{invoice.city}</p>
                <p>{invoice.postCode}</p>
                <p className="bg-gray-600 p-2 text-white rounded-md text-sm font-semibold">
                  pending
                </p>
              </div>
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default InvoiceHome;
