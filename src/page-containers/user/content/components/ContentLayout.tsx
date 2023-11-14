import ReactionBar from "@/components/contentLayout/ReactionBar";
import CardBox from "@/components/ui/Card";
import { ContentData } from "@/types/Content";
import { Flex, Grid, Text } from "@radix-ui/themes";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type ContentlayoutProps = {
  data: ContentData;
  contentMutate: any;
  index?: number;
};

const ContentLayout: React.FC<ContentlayoutProps> = ({ data, contentMutate }) => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const [isOverflowing, setIsOverflowing] = useState<boolean>(false);
  useEffect(() => {
    if (contentRef.current) {
      const element = contentRef.current;
      const boxHeight = element.parentElement?.clientHeight || 0;
      const padding = 16;
      const hasOverflow = element.scrollHeight > element.clientHeight;

      // Update state based on overflow
      setIsOverflowing(hasOverflow);
      const newMaxHeight = boxHeight - padding;

      // Check if the new max height is different
      if (newMaxHeight !== maxHeight) {
        setMaxHeight(newMaxHeight);
      }
    }
  }, [maxHeight, contentRef, data.description]);

  return (
    <CardBox className="w-full shadow-xl rounded-lg h-[100%] justify-start flex-col mt-[15px] mb-[15px]">
      <Grid rows="3" className="h-full w-full flex flex-col bg-white shadow-lg">
        <Link href={`/content/${data.slug}`} className="w-full h-[250px] mx-auto relative block">
          <div
            className="relative w-full max-w-[400px] h-[250px] rounded-t-[8px]"
            style={{
              background: `url(${data.image_url}) center / cover`,
            }}
          >
            {data.type !== "video" && (
              <div className="absolute top-0 right-0 bg-white text-[14px] font-[600] px-[16px] py-[4px] tracking-[0.42px] rounded-bl-[8px] shadow-lg uppercase">
                {data.type}
              </div>
            )}
          </div>
        </Link>
        <div className="w-full h-full pt-[16px] px-[16px]">
          <Link href={`/content/${data.slug}`}>
            <Flex direction="column" className="w-full h-full">
              {/* Ref to get the content height and dynamically set max height */}
              <div
                ref={contentRef}
                className="flex flex-col"
                style={{ maxHeight: maxHeight !== undefined ? `${maxHeight - 30}px` : "none", overflow: "hidden" }}
              >
                <Text className="text-[24px] font-[700] leading-[32px]">{data.title}</Text>
                <Text>
                  Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean
                  massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec
                  quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec
                  pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a,
                  venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
                  Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu,
                  consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.
                  Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies
                  nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus,
                  tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam
                  quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt
                  tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget
                  eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
                  Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida magna mi a libero.
                  Fusce vulputate eleifend sapien. Vestibulum purus quam, scelerisque ut, mollis sed, nonummy id, metus.
                  Nullam accumsan lorem in dui. Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum
                  primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis mi consectetuer
                  lacinia. Nam pretium turpis et arcu. Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet
                  iaculis, ipsum. Sed aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer eget, posuere
                  ut, mauris. Praesent adipiscing. Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus.
                  Vestibulum volutpat pretium libero. Cras id dui. Aenean ut
                </Text>
              </div>
              {isOverflowing && (
                <div>
                  ...<Text className="text-primary">see more</Text>
                </div>
              )}
            </Flex>
          </Link>
        </div>
        <div className="mt-2 w-full px-[16px]">
          <div className="w-full pt-3">
            <hr className="w-full h-[1px] bg-slateGray" />
          </div>
          <ReactionBar data={data} contentMutate={contentMutate} />
        </div>
      </Grid>
    </CardBox>
  );
};

export default ContentLayout;
