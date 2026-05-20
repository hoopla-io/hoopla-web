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
  phoneNumbers:
    | {
        phoneNumber: string;
      }[]
    | null;
  workingHours:
    | {
        weekDay: string;
        openAt: string;
        closeAt: string;
      }[]
    | null;
  pictures:
    | {
        pictureUrl: string;
      }[]
    | null;
  urls:
    | {
        urlType: string;
        url: string;
      }[]
    | null;
  drinks:
    | {
        id: number;
        name: string;
        pictureUrl: string;
      }[]
    | null;
};

type Response<T> = {
  code: number;
  message: string;
  data: T;
};

export type ShopDrink = {
  id: number;
  name: string;
  pictureUrl: string | null;
  productPrice: number;
};

export type ShopDrinkCategory = {
  id: number;
  name: string;
  drinks: ShopDrink[];
};

export type ShopDrinksResponse = {
  categories: ShopDrinkCategory[];
};

export type Banner = {
  id: number;
  title: string | null;
  imageUrl: string;
  linkType: "partner" | "drink" | "url";
  linkValue: string;
};

const API_BASE = "https://api.hoopla.uz/api/v1";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatBalance(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export async function getSubscriptions() {
  const response = await fetch(`${API_BASE}/subscriptions/`, {
    method: "GET",
  });

  const res = (await response.json()) as Response<Subscription[]>;

  return { subscription: res.data };
}

export async function getPartnerDetail(id: string) {
  const response = await fetch(`${API_BASE}/shops/shop?shopId=${id}`, {
    method: "GET",
  });

  const res = (await response.json()) as Response<PartnerData>;

  return { partnerData: res.data };
}

export async function getShopDrinks(shopId: string) {
  const response = await fetch(`${API_BASE}/shops/drinks?shopId=${shopId}`, {
    method: "GET",
  });

  const res = (await response.json()) as Response<ShopDrinksResponse | null>;

  return { categories: res.data?.categories ?? [] };
}

export async function getPartnerBanners(partnerId: number) {
  if (!partnerId) return { banners: [] as Banner[] };

  const response = await fetch(`${API_BASE}/banners/partner/${partnerId}`, {
    method: "GET",
  });

  const res = (await response.json()) as Response<Banner[] | null>;

  return { banners: res.data ?? [] };
}
