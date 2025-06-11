import Loading from "@/components/Loading";
import { getPartnerDetail } from "@/lib/utils";
import PartnerDetailView from "@/views/partner.detail";
import { Suspense } from "react";

export default async function Page({
  params,
}: {
  params: Promise<{
    partnerId: string;
  }>;
}) {
  const partnerId = (await params).partnerId;

  const partnerPromise = getPartnerDetail(partnerId);

  return (
    <Suspense fallback={<Loading />}>
      <PartnerDetailView partnerPromise={partnerPromise} />
    </Suspense>
  );
}
