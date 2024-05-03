import BannerDetail from "@/page-containers/admin/banners/bannerDetails";

interface Props {
  params: { id: string };
}
const BannerDetailPage = ({ params: { id } }: Props) => {
  return (
    <>
      <BannerDetail id={id} />
    </>
  );
};

export default BannerDetailPage;
