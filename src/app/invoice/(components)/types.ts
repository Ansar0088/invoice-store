export type FormInputs = {
  map(arg0: (invoice: any) => any): unknown;
  id: string;
  streetAddress: string;
  city: string;
  postCode: string;
  country: string;
  ClientsName: string;
  ClientsEmail: string;
  items: {
    ItemName: string;
    Quantity: number;
    price: number;
    total: number;
  }[];
  status: "pending" | "paid" | "draft" | string;
};
