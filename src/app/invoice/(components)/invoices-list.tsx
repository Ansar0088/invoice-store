"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";
import { useState } from "react";
import { FormInputs } from "./invoice-home";
import { useRouter } from "next/navigation";
// import Router from "next/navigation";
const invoicesList = () => {
  const [invoices, setInvoices] = useState<FormInputs[]>([]);
  const router = useRouter();

  return (
    <div>
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
              className="p-4 flex justify-between items-center border rounded-lg cursor-pointer bg-[#7777BD] text-white font-bold"
              onClick={() => Router.push(`/invoice/${invoice.id}`)}
            >
              <p>{invoice.streetAddress}</p>
              <p>{invoice.city}</p>
              <p>{invoice.postCode}</p>
              <p className="bg-gray-600 p-2 text-white rounded-md text-sm font-semibold">
                pending
              </p>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      </ScrollArea>
    </div>
  );
};

export default invoicesList;
