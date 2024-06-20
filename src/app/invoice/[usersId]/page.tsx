"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerClose,
  DrawerTrigger,
  DrawerFooter,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormInputs } from "../(components)/types";

const UserPage = () => {
  const [invoice, setInvoice] = useState<FormInputs | null>(null);
  const router = useRouter();
  const { usersId } = useParams();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [status, setStatus] = useState("pending");

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });
  //  Get invoices from localStorag
  useEffect(() => {
    if (usersId) {
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        try {
          const invoices = JSON.parse(storedInvoices);
          const foundInvoice = invoices.find((inv: any) => inv.id === usersId);
          if (foundInvoice) {
            setInvoice(foundInvoice);
            setValue("streetAddress", foundInvoice.streetAddress);
            setValue("city", foundInvoice.city);
            setValue("postCode", foundInvoice.postCode);
            setValue("country", foundInvoice.country);
            setValue("ClientsName", foundInvoice.ClientsName);
            setValue("ClientsEmail", foundInvoice.ClientsEmail);
            foundInvoice.items.forEach((item: any, index: any) => {
              append(item);
            });
          }
        } catch (error) {
          console.error("Error parsing invoices from local storage:", error);
        }
      }
    }
  }, [usersId, setValue, append]);
  // Delete invoices logic
  const handleDelete = () => {
    if (invoice) {
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const updatedInvoices = invoices.filter(
          (inv: FormInputs) => inv.id !== invoice.id
        );
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        router.push("/invoice");
      }
    }
  };
  // Edit invoices logic
  const handleEditSave: SubmitHandler<FormInputs> = (formData) => {
    const updatedInvoice = {
      ...formData,
      id: invoice?.id || Date.now().toString(),
    };
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      const invoices = JSON.parse(storedInvoices);
      const updatedInvoices = invoices.map((inv: FormInputs) =>
        inv.id === updatedInvoice.id ? updatedInvoice : inv
      );
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setInvoice(updatedInvoice);
      setIsDrawerOpen(false);
    }
  };

  if (!invoice) {
    return <div className="container mt-10">Loading....</div>;
  }
  // inputs addition logic
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
  const items = watch("items");
  const grandTotal = items.reduce((acc, item) => acc + item.total, 0);
  //  update by status
  const markAsPaid = (invoiceId: string) => {
    const storedInvoices = localStorage.getItem("invoices");
    if (storedInvoices) {
      const invoices = JSON.parse(storedInvoices);
      const updatedInvoices = invoices.map((inv: { id: string }) => {
        if (inv.id === invoiceId) {
          return { ...inv, status: "paid" };
        }
        return inv;
      });
      localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
      setInvoice(updatedInvoices);
      const updatedInvoice = updatedInvoices.find(
        (inv: any) => inv.id === invoiceId
      );
      setInvoice(updatedInvoice);
      setStatus("paid");
    }
  };

  return (
    <div className="container mt-10">
      <Link href="/invoice" className="ml-44 mb-3 flex items-center">
        <Image
          src="/left.svg"
          height={30}
          width={20}
          alt="arrow"
          className="arrow-animate ml-2 dark:bg-white"
        />{" "}
        <p className="underline ml-3">Go Back</p>
      </Link>
      <div className="flex justify-between p-4 border w-[790px] mx-auto rounded-md bg-white dark:bg-[#1E2139] text-black text-sm font-bold mb-5">
        <div className="flex gap-3 items-center">
          <p className="dark:text-white">Status</p>
          <Button
            size="lg"
            className={cn(
              "rounded-md w-32 text-sm font-semibold dark:bg-[#2B2736]",
              {
                "bg-[#F3FDF9] text-[#84E4B6]": invoice.status === "paid",
                "bg-[#FFF8F0] text-[#FF9F4D]": invoice.status === "pending",
                "bg-[#E0E0E0] text-white": invoice.status === "draft",
              }
            )}
          >
            {invoice.status === "paid"
              ? "Paid"
              : invoice.status === "draft"
              ? "Draft"
              : "Pending"}
          </Button>
        </div>
        <div>
          <Button
            size={"lg"}
            className="mr-2 text-black hover:bg-white bg-white hover:text-black"
            variant={"outline"}
            onClick={() => setIsDrawerOpen(true)}
          >
            Edit
          </Button>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button size={"lg"} variant="destructive">
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete this invoice?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteOpen(false)}
                >
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button
            size={"lg"}
            onClick={() => markAsPaid(invoice.id)}
            className="ml-2 border text-black hover:bg-white bg-white hover:text-black"
          >
            Mark as paid
          </Button>
        </div>
      </div>
      <div className="p-4 border w-[790px] mx-auto rounded-md bg-white dark:bg-[#1E2139] dark:text-white text-black text-lg font-semibold">
        <div className="flex justify-between px-3">
          <div>
            <p>Invoice ID</p>
            <p className="text-gray-400 text-xs">#{invoice.id}</p>
            <p className=" mt-2">Name</p>
            <p className="text-gray-400 text-xs">{invoice.ClientsName}</p>
            <p className=" mt-2">Post Code</p>
            <p className="text-gray-400 text-xs">{invoice.postCode}</p>
          </div>
          <div>
            <p className="text-black dark:text-white">Email & Address</p>
            <div className="text-sm text-gray-400  flex flex-col gap-3">
              <p>{invoice.streetAddress}</p>
              <p>{invoice.city}</p>
              <p>{invoice.country}</p>
              <p>{invoice.ClientsEmail}</p>
            </div>
          </div>
        </div>
        <div className="bg-[#F9FAFE] dark:bg-[#252945] px-5 py-3 mt-5">
          <div className=" flex justify-between items-between mt-5 rounded-xl font-semibold">
            <p>Items Name</p>
            <p>Quantity</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          <ScrollArea className="h-[120px] rounded-md px-5 mt-2">
            {invoice.items && invoice.items.length > 0 ? (
              invoice.items.map((item, index) => (
                <div
                  key={index}
                  className="flex text-sm text-gray-400 justify-between  items-center mt-3 font-semibold"
                >
                  <p>{item.ItemName}</p>
                  <p className="w-10 flex justify-end">{item.Quantity}</p>
                  <p className="w-10 flex justify-end">{item.price}</p>
                  <p>{item.total}</p>
                </div>
              ))
            ) : (
              <p className="text-red-700 mr-16">No items listed</p>
            )}
          </ScrollArea>
        </div>
        <div className="flex items-center justify-between bg-[#373B53] text-white p-5">
          <p className="text-sm">Total Amount</p>
          <p className="font-bold text-xl">${grandTotal.toFixed(2)}</p>
        </div>
      </div>
      <Drawer
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
        direction="left"
      >
        <DrawerContent>
          <form onSubmit={handleSubmit(handleEditSave)} className="p-5">
            <ScrollArea className="h-[520px] rounded-md px-5 ">
              <div>
                <p>Street Address</p>
                <Input
                  className={cn(
                    "outline-none border rounded-md dark:bg-[#252945]",
                    errors.streetAddress ? "border-red-500" : "border-slate-300"
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
                    className={cn(
                      "outline-none border rounded-md dark:bg-[#252945]",
                      errors.postCode ? "border-red-500" : "border-slate-300"
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
                  className={cn(
                    "outline-none border rounded-md dark:bg-[#252945]",
                    errors.ClientsName ? "border-red-500" : "border-slate-300"
                  )}
                  {...register("ClientsName", { required: true })}
                />
                {errors.ClientsName && (
                  <span className="text-red-500 text-xs">
                    This field is required
                  </span>
                )}
                <p className="text-xs font-normal mb-1 mt-3">Clients Email</p>
                <Input
                  className={cn(
                    "outline-none border rounded-md dark:bg-[#252945]",
                    errors.ClientsEmail ? "border-red-500" : "border-slate-300"
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
                          "outline-none rounded-md dark:bg-[#252945] ",
                          errors.items?.[index]?.ItemName
                            ? "border-red-500"
                            : "border-slate-300"
                        )}
                        {...register(`items.${index}.ItemName`, {
                          required: true,
                        })}
                        placeholder="Item name"
                      />
                      <Input
                        type="number"
                        className={cn(
                          "outline-none rounded-md dark:bg-[#252945]",
                          errors.items?.[index]?.Quantity
                            ? "border-red-500"
                            : "border-slate-300"
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
                          "outline-none    rounded-md dark:bg-[#252945]",
                          errors.items?.[index]?.price
                            ? "border-red-500"
                            : "border-slate-300"
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
                          width={100}
                          alt="delete"
                        />
                      </Button>
                    </div>
                  ))}
                  <Button
                    onClick={() =>
                      append({ ItemName: "", Quantity: 1, price: 0, total: 0 })
                    }
                    size={"sm"}
                    className="mr-2 text-sm dark:bg-[#252945] dark:text-white"
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
              </div>
            </ScrollArea>
            <DrawerFooter>
              <div className="flex gap-2 mx-auto">
                <Button
                  className="w-40 dark:bg-[#252945] dark:text-white"
                  onClick={() => setIsDrawerOpen(false)}
                >
                  Discard
                </Button>
                <Button
                  type="submit"
                  className="w-40 dark:bg-[#252945] dark:text-white"
                >
                  Save & send
                </Button>
                <DrawerClose className=""></DrawerClose>
              </div>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserPage;
