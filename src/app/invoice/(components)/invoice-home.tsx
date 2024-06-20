"use client";
import { useState, useEffect } from "react";
import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Reorder } from "framer-motion";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import { FormInputs } from "./types";

const InvoiceHome = () => {
  const [invoices, setInvoices] = useState<FormInputs[]>([]);
  const [isChecked, setIsChecked] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      items: [{ ItemName: "", Quantity: 1, price: 0, total: 0 }],
    },
    mode: "onChange",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  //  onsubmit add invoices logic
  const onSubmit: SubmitHandler<FormInputs> = (formData) => {
    getValues();
    const newInvoice: FormInputs = {
      ...formData,
      id: Date.now().toString(),
      status: "pending",
    };
    const updatedInvoices = [...invoices, newInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
  };

  const router = useRouter();
  // get invoices from localStorage
  useEffect(() => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      setInvoices(JSON.parse(storedInvoices));
    }
  }, []);
  // shorted by name logic
  const handleCheckboxChange = (isChecked: any) => {
    setIsChecked((prevState) => !prevState);
    const sortedInvoices = [...invoices].sort((a, b) => {
      if (isChecked) {
        return a.ClientsName.localeCompare(b.ClientsName);
      } else {
        return b.ClientsName.localeCompare(a.ClientsName);
      }
    });
    setInvoices(sortedInvoices);
  };
  // Filter by pending
  const handleCheckboxPending = (isChecked: any) => {
    setIsChecked((prevState) => !prevState);
    const sortedInvoices = [...invoices].sort((a, b) => {
      if (isChecked) {
        return a.status.localeCompare(b.status);
      } else {
        return b.status.localeCompare(a.status);
      }
    });
    setInvoices(sortedInvoices);
  };

  console.log(isChecked);
  // fields Addition logic
  const handleQuantityChange = (index: any) => (event: any) => {
    const quantity = parseFloat(event.target.value);
    const price = getValues(`items.${index}.price`);
    const total = quantity * price;
    setValue(`items.${index}.Quantity`, quantity);
    setValue(`items.${index}.total`, total);
  };

  const handlePriceChange = (index: any) => (event: any) => {
    const price = parseFloat(event.target.value);
    const quantity = getValues(`items.${index}.Quantity`);
    const total = quantity * price;
    setValue(`items.${index}.price`, price);
    setValue(`items.${index}.total`, total);
  };

  const handleSaveAsDraft = () => {
    const draftInvoice = {
      ...getValues(),
      id: Date.now().toString(),
      status: "draft",
    };
    const updatedInvoices = [...invoices, draftInvoice];
    setInvoices(updatedInvoices);
    localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
    alert("Invoice saved as draft");
  };
  return (
    <div className="container mt-10">
      <div className="flex gap-5 justify-between items-center">
        <div className="flex flex-col items-center">
          <p className="font-bold text-2xl">Invoices</p>
          <p className="text-xs text-slate-500 dark:text-gray-300">
            There are {invoices.length} total invoices
          </p>
        </div>
        <div className="flex items-center gap-3 mr-5">
          <p className="text-lg text-slate-700">
            {/* Checkbox is {JSON.stringify(isChecked)} */}
          </p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-sm bg-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                Filter by status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 h-20 flex flex-col gap-1 text-center pl-6">
              <div className="flex gap-2 items-center">
                <Checkbox
                  id="Checkbox"
                  checked={isChecked}
                  onCheckedChange={handleCheckboxPending}
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  pending
                </label>
              </div>
              <div className="flex gap-2 items-center ">
                <Checkbox />
                <label htmlFor="terms" className="text-sm font-medium">
                  paid
                </label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox />
                <label htmlFor="terms" className="text-sm font-medium">
                  draft
                </label>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="text-sm bg-blue-800 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition duration-300">
                Sort by Name
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-20 h-10 flex justify-center">
              <div className="flex gap-2 items-center justify-betweenw-full">
                <Checkbox
                  id="sortCheckbox"
                  checked={isChecked}
                  onCheckedChange={handleCheckboxChange}
                />
                <label htmlFor="terms" className="text-sm font-medium">
                  Name
                </label>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          <Drawer direction="left">
            <DrawerTrigger>
              <Button
                variant={"secondary"}
                className="hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-400 bg-green-600   text-white hover:bg-green-600"
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
              <form onSubmit={handleSubmit(onSubmit)} className="p-5">
                <ScrollArea className="h-[520px] rounded-md px-5">
                  <div>
                    <p>Street Address</p>
                    <Input
                      {...register("streetAddress", {
                        required: true,
                        minLength: {
                          value: 1,
                          message: "Street Address is required",
                        },
                      })}
                      className={cn("input dark:bg-[#252945]", {
                        "border border-red-500": errors.streetAddress,
                      })}
                      placeholder="Street Address"
                    />
                    {errors.streetAddress && (
                      <p className="text-xs text-red-500 mt-1">
                        streetaddress is required
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3 mt-5">
                    <div>
                      <p className="text-xs mb-1">City</p>
                      <Input
                        placeholder="city"
                        className={cn(
                          "outline-none border rounded-md dark:bg-[#252945]",
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
                        placeholder="post code"
                        className={cn(
                          "outline-none border rounded-md dark:bg-[#252945]",
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
                        placeholder="country"
                        className={cn(
                          "outline-none border rounded-md dark:bg-[#252945]",
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
                      placeholder="clientsname"
                      className={cn(
                        "outline-none border rounded-md dark:bg-[#252945]",
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
                      placeholder="clientsemail"
                      className={cn(
                        "outline-none  rounded-md dark:bg-[#252945]",
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
                      {fields.map((field, index) => (
                        <div key={field.id} className="flex items-center gap-2">
                          <Input
                            type="text"
                            className={cn(
                              "outline-none border rounded-md dark:bg-[#252945]"
                            )}
                            {...register(`items.${index}.ItemName`, {
                              required: true,
                            })}
                            placeholder="Item name"
                          />
                          <Input
                            type="number"
                            className={cn(
                              "outline-none    rounded-md dark:bg-[#252945]"
                            )}
                            {...register(`items.${index}.Quantity`, {
                              required: true,
                            })}
                            placeholder="Qty"
                            onChange={handleQuantityChange(index)}
                          />
                          <Input
                            type="number"
                            className={cn(
                              "outline-none  rounded-md dark:bg-[#252945]"
                            )}
                            {...register(`items.${index}.price`, {
                              required: true,
                            })}
                            placeholder="Price"
                            onChange={handlePriceChange(index)}
                          />
                          <div className="border p-2 px-8 rounded-md dark:bg-[#252945]">
                            <p>${getValues(`items.${index}.total`)}</p>
                          </div>
                          <Button
                            onClick={() => remove(index)}
                            variant={"outline"}
                            size={"sm"}
                            className="border-none m-2"
                          >
                            <Image
                              src="/delete.svg"
                              height={20}
                              width={120}
                              alt="delete"
                            />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <Button
                      onClick={() =>
                        append({
                          ItemName: "",
                          Quantity: 1,
                          price: 0,
                          total: 0,
                        })
                      }
                      size={"sm"}
                      className="mr-2 dark:bg-[#1E2139] dark:text-white text-sm"
                    >
                      <Image
                        src="/add.svg"
                        height={20}
                        width={20}
                        alt="add"
                        className="mr-2"
                      />
                      Add new item
                    </Button>
                  </div>
                </ScrollArea>
                <DrawerFooter>
                  <div className="flex justify-between w-full">
                    <DrawerClose>
                      <Button className="  dark:bg-[#1E2139] dark:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] transition duration-300">
                        Discard
                      </Button>
                    </DrawerClose>
                    <div>
                      <Button
                        onClick={handleSaveAsDraft}
                        className="dark:bg-[#1E2139] dark:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] transition duration-300"
                      >
                        Save as draft
                      </Button>
                      <Button
                        type="submit"
                        className="ml-2 dark:bg-[#1E2139] dark:text-white hover:shadow-[2px_2px_0px_0px_rgba(0,0,0)] transition duration-300"
                      >
                        Save & send
                      </Button>
                    </div>
                  </div>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      {invoices.length > 0 ? (
        <>
          <h2 className="font-bold m-6 my-3">Invoice List</h2>
          <ScrollArea className="h-[480px] rounded-md px-5 mt-10">
            <Reorder.Group
              axis="y"
              values={invoices}
              onReorder={setInvoices}
              className="space-y-4"
            >
              {invoices.map((invoice) => (
                <Reorder.Item
                  key={invoice.id}
                  value={invoice}
                  className="w-[950px] hover:border-blue-700 mx-auto p-7 flex text-sm justify-between items-center border rounded-lg cursor-pointer bg-white dark:bg-[#1E2139] font-bold"
                  onClick={() => router.push(`/invoice/${invoice.id}`)}
                >
                  <div className="flex gap-5 items-center">
                    <p className="">#{invoice.id}</p>
                    <p className="text-gray-400 text-xs">
                      {invoice.ClientsName}
                    </p>
                    <p className="text-gray-400 text-xs">{invoice.city}</p>
                  </div>
                  <div className="flex gap-5 items-center">
                    <p>{invoice.postCode}</p>
                    <Button
                      size={"lg"}
                      variant={"outline"}
                      className={cn(
                        "rounded-md w-32 text-sm font-semibold dark:bg-[#2B2736]",
                        {
                          "bg-[#F3FDF9] text-[#84E4B6] hover:text-[#84E4B6]":
                            invoice.status === "paid",
                          "bg-[#FFF8F0] text-[#FF9F4D] hover:text-[#FF9F4D]":
                            invoice.status === "pending",
                          "bg-[#E0E0E0] ":
                            invoice.status === "draft",
                        }
                      )}
                    >
                      {invoice.status
                        ? `${invoice.status
                            .charAt(0)
                            .toUpperCase()}${invoice.status.slice(1)}`
                        : "Pending"}
                    </Button>
                  </div>
                </Reorder.Item>
              ))}
            </Reorder.Group>
          </ScrollArea>
        </>
      ) : (
        <>
          <div className="flex justify-center mt-20">
            <Image src="/inbg.svg" height={100} width={300} alt="no-invoices" />
          </div>
          <div className="text-center mt-5">
            <p className="text-lg font-semibold">There is nothing here</p>
            <p className="text-xs text-gray-400 mt-2">
              Create an invoice by clicking the New <br />
              Invoice button and get started
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default InvoiceHome;
