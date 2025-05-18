import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

type Feature = {
  id: number;
  feature: string;
};

export type Subscription = {
  id: number;
  name: string;
  price: number;
  days: number;
  currency: string;
  weekdays: string[];
  features: Feature[];
  cupsADay: number;
};

type Response = {
  code: number;
  message: string;
  data: Subscription[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSubscriptions() {
  const response = await fetch("https://api.hoopla.uz/api/v1/subscriptions/", {
    method: "GET",
  });

  const res = (await response.json()) as Response;

  return { subscription: res.data };
}
