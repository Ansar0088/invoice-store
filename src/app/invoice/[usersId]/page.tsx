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
import { useForm, SubmitHandler } from "react-hook-form";
import { cn } from "@/lib/utils";

type FormInputs = {
  id: string;
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  ClientsName: string;
  ClientsEmail: string;
};

const UserPage = () => {
  const router = useRouter();
  const { usersId } = useParams();
  const [invoice, setInvoice] = useState<FormInputs | null>(null);
  const [editedInvoice, setEditedInvoice] = useState<FormInputs | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (usersId) {
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        try {
          const invoices = JSON.parse(storedInvoices);
          const foundInvoice = invoices.find((inv: any) => inv.id === usersId);
          if (foundInvoice) {
            setInvoice(foundInvoice);
            setEditedInvoice(foundInvoice);
            setValue("streetAddress", foundInvoice.streetAddress);
            setValue("city", foundInvoice.city);
            setValue("postCode", foundInvoice.postCode);
            setValue("country", foundInvoice.country);
            setValue("ClientsName", foundInvoice.ClientsName);
            setValue("ClientsEmail", foundInvoice.ClientsEmail);
          } else {
            console.error("Invoice not found for ID:", usersId);
          }
        } catch (error) {
          console.error("Error parsing invoices from local storage:", error);
        }
      } else {
        console.error("No invoices found in local storage");
      }
    }
  }, [usersId, setValue]);

  const handleDelete = () => {
    if (invoice) {
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const updatedInvoices = invoices.filter(
          (inv: any) => inv.id !== invoice.id
        );
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        router.push("/invoice");
      }
    }
  };

  const handleEditSave: SubmitHandler<FormInputs> = (formData) => {
    if (editedInvoice) {
      const updatedInvoice = {
        ...editedInvoice,
        ...formData,
      };
      const storedInvoices = localStorage.getItem("invoices");
      if (storedInvoices) {
        const invoices = JSON.parse(storedInvoices);
        const updatedInvoices = invoices.map((inv: any) =>
          inv.id === updatedInvoice.id ? updatedInvoice : inv
        );
        localStorage.setItem("invoices", JSON.stringify(updatedInvoices));
        setInvoice(updatedInvoice);
        setIsDrawerOpen(false);
      }
    }
  };

  if (!invoice) {
    return <div className="container mt-10">Loading....</div>;
  }

  return (
    <div className="container mt-10">
      <Link href={"/invoice"}>
        <Button className="mr-5">Back</Button>
      </Link>
      <div className="flex justify-between p-4 border w-[790px] mx-auto rounded-md bg-[#5858a8] text-white font-bold mb-5">
        <div className="flex gap-3 items-center">
          <p>Status</p>
          <span
            style={{
              backgroundColor: "#1F2A3E",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            Paid
          </span>
        </div>
        <div>
          <Button
            className="mr-2 text-black"
            variant={"outline"}
            onClick={() => setIsDrawerOpen(true)}
          >
            Edit
          </Button>
          <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive">Delete</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogDescription>
                  Are you sure you want to delete this invoice?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={handleDelete}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex justify-between p-4 border w-[790px] mx-auto rounded-md bg-[#7777BD] text-white font-bold">
        <div>
          <p className="text-black">Invoice ID:</p>
          <p>{invoice.id}</p>
          <p className="text-black">Name:</p>
          <p>{invoice.ClientsName}</p>
        </div>
        <div>
          <p className="text-black">Description</p>
          <p>{invoice.streetAddress}</p>
          <p>{invoice.city}</p>
          <p>{invoice.postCode}</p>
          <p>{invoice.country}</p>
          <p>{invoice.ClientsEmail}</p>
        </div>
      </div>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="left">
        <DrawerContent>
          <form onSubmit={handleSubmit(handleEditSave)} className="p-5">
            <div>
              <p>Street Address</p>
              <Input
                className={cn(
                  "outline-none border rounded-md",
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
                  "outline-none border rounded-md",
                  errors.ClientsEmail ? "border-red-500" : "border-slate-300"
                )}
                {...register("ClientsEmail", { required: true })}
              />
              {errors.ClientsEmail && (
                <span className="text-red-500 text-xs">
                  This field is required
                </span>
              )}
            </div>
            <DrawerFooter>
              <Button type="submit">Save & send</Button>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default UserPage;
