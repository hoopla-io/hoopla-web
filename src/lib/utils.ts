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

export type PartnerData = {
  id: number;
  partnerId: number;
  name: string;
  pictureUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  phoneNumbers: {
    phoneNumber: string;
  }[];
  workingHours: {
    weekDay: string;
    openAt: string;
    closeAt: string;
  }[];
  pictures: {
    pictureUrl: string;
  }[];
  urls: {
    urlType: string;
    url: string;
  }[];
  drinks: {
    id: number;
    name: string;
    pictureUrl: string;
  }[];
};

type Response<T> = {
  code: number;
  message: string;
  data: T;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function getSubscriptions() {
  const response = await fetch("https://api.hoopla.uz/api/v1/subscriptions/", {
    method: "GET",
  });

  const res = (await response.json()) as Response<Subscription[]>;

  return { subscription: res.data };
}

export async function getPartnerDetail(id: string) {
  const response = await fetch(
    `https://api.hoopla.uz/api/v1/shops/shop?shopId=${id}`,
    {
      method: "GET",
    }
  );

  const res = (await response.json()) as Response<PartnerData>;

  return { partnerData: res.data };
}
