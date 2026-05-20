import Loading from "@/components/Loading";
import {
  getPartnerBanners,
  getPartnerDetail,
  getShopDrinks,
} from "@/lib/utils";
import PartnerDetailView from "@/views/partner.detail";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{
    partnerId: string;
  }>;
}) {
  const { partnerId } = await params;

  const shopDataPromise = (async () => {
    const partnerRequest = getPartnerDetail(partnerId);
    const drinksRequest = getShopDrinks(partnerId);
    const { partnerData } = await partnerRequest;
    const [{ categories }, { banners }] = await Promise.all([
      drinksRequest,
      getPartnerBanners(partnerData?.partnerId ?? 0),
    ]);
    return { partnerData, categories, banners };
  })();

  return (
    <Suspense fallback={<Loading />}>
      <PartnerDetailView shopDataPromise={shopDataPromise} />
    </Suspense>
  );
}
