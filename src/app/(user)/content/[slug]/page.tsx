import UserContentDetail from "@/page-containers/user/content/components/UserContentDetail";
import { Grid } from "@radix-ui/themes";
import { NextPage } from "next";

type Props = {
  params: { slug: string };
};
// export async function generateMetadata({ params }: Props): Promise<Metadata> {
//   // read route params
//   const slug = params.slug;
//   console.log(slug);

//   // fetch data
//   const product = await fetch(`
//   ${process.env.NEXT_PUBLIC_API_URL}/api/v1/content/slug/${slug}`).then(res => res.json());
//   // optionally access and extend (rather than replace) parent metadata
//   const contentData: ContentData = product.data;
//   return {
//     title: contentData.title,
//     description: contentData.description,
//     openGraph: {
//       images: [contentData.image_url],
//     },
//   };
// }
const ContentDetail: NextPage = () => {
  return (
    <Grid columns="1">
      <UserContentDetail />
    </Grid>
  );
};

export default ContentDetail;
