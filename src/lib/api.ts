const API_BASE = "https://api.hoopla.uz/api/v1";

type ApiResponse<T> = {
  code: number;
  message: string;
  data: T;
};

export type PartnerData = {
  id: number;
  partnerId: number;
  name: string;
  pictureUrl: string;
  location: { lat: number; lng: number } | null;
  phoneNumbers: { phoneNumber: string }[] | null;
  workingHours: { weekDay: string; openAt: string; closeAt: string }[] | null;
  pictures: { pictureUrl: string }[] | null;
  urls: { urlType: string; url: string }[] | null;
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

export type Banner = {
  id: number;
  title: string | null;
  imageUrl: string;
  linkType: "partner" | "drink" | "url";
  linkValue: string;
};

async function get<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_BASE}${path}`);
    if (!response.ok) return null;
    const res = (await response.json()) as ApiResponse<T>;
    return res.data ?? null;
  } catch {
    return null;
  }
}

export function getPartnerDetail(shopId: string) {
  return get<PartnerData>(`/shops/shop?shopId=${encodeURIComponent(shopId)}`);
}

export async function getShopDrinks(shopId: string) {
  const data = await get<{ categories: ShopDrinkCategory[] }>(
    `/shops/drinks?shopId=${encodeURIComponent(shopId)}`
  );
  return data?.categories ?? [];
}

export async function getPartnerBanners(partnerId: number) {
  if (!partnerId) return [];
  return (await get<Banner[]>(`/banners/partner/${partnerId}`)) ?? [];
}

export function formatBalance(amount: number): string {
  return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}
