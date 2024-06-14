import { useForm } from "react-hook-form";
import { FormInputs } from "./types";
import React from 'react'
export const {
  register,
  handleSubmit,
  control,
  setValue,
  getValues,
  formState: { errors },
} = useForm<FormInputs>();

export const handleQuantityChange =
  (index: any) => (event: { target: { value: string } }) => {
    const quantity = parseFloat(event.target.value);
    const price = getValues(`items.${index}.price`);
    const total = quantity * price;
    setValue(`items.${index}.Quantity`, quantity);
    setValue(`items.${index}.total`, total);
  };

export const handlePriceChange =
  (index: any) => (event: { target: { value: string } }) => {
    const price = parseFloat(event.target.value);
    const quantity = getValues(`items.${index}.Quantity`);
    const total = quantity * price;
    setValue(`items.${index}.price`, price);
    setValue(`items.${index}.total`, total);
  };

const constant = () => {
  return (
    <div>constant</div>
  )
}

export default constant