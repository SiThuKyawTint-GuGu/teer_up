import { Animate, Dialog, DialogClose, DialogContent } from "@/components/ui/Dialog";
import { Icons } from "@/components/ui/Images";
import { CONTENT_HISTORY_TYPES } from "@/services/content";
import { cn } from "@/utils/cn";
import { Box, Flex, Text } from "@radix-ui/themes";
import { Button } from "@/components/ui/Button";
import { BookmarkSlashIcon, DeleteIcon } from "@/components/ui/Images/Icons";

export const filterNames = [
  {
    key: CONTENT_HISTORY_TYPES.ALL,
    value: "All content types",
  },
  {
    key: CONTENT_HISTORY_TYPES.ARTICLE,
    value: "Article",
  },
  {
    key: CONTENT_HISTORY_TYPES.EVENT,
    value: "Event",
  },
  {
    key: CONTENT_HISTORY_TYPES.OPPORTUNITY,
    value: "Opportunity",
  },
  {
    key: CONTENT_HISTORY_TYPES.PATHWAY,
    value: "Pathway",
  },
  {
    key: CONTENT_HISTORY_TYPES.VIDEO,
    value: "Video",
  },
];
interface ContentFilterDialogProps {
  open: boolean;
  setOpen: (val: boolean) => void;
  filteredType: {
    key: CONTENT_HISTORY_TYPES;
    value: string;
  }[];
  setFilterTypes: React.Dispatch<
    React.SetStateAction<
      {
        key: CONTENT_HISTORY_TYPES;
        value: string;
      }[]
    >
  >;
  filteredParams: {
    key: string;
  };
  setFilterParams: React.Dispatch<React.SetStateAction<{ key: string }>>;
  handleCheckFilter: (each: { key: CONTENT_HISTORY_TYPES; value: string }) => void;
  children?: React.ReactNode;
  trigger_type?: string;
  unSaveContent?: (e: any) => Promise<void>;
}

function ContentFilterDialog({
  open,
  setOpen,
  trigger_type = "FILTER",
  filteredType,
  setFilterTypes,
  filteredParams,
  setFilterParams,
  handleCheckFilter,
  children,
  unSaveContent,
}: ContentFilterDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={val => {
        if (val) {
          setFilterTypes(pre => {
            const filterData = pre.filter(data => filteredParams?.key?.split(",").includes(data.key));
            if (filterData.length === 0) {
              return [
                {
                  key: CONTENT_HISTORY_TYPES.ALL,
                  value: "All content types",
                },
              ];
            }
            return filterData;
          });
        }
        setOpen(val);
      }}
    >
      {children}
      {trigger_type === "FILTER" && (
        <DialogContent
          animate={Animate.SLIDE}
          className={cn("bg-white top-[initial] bottom-0 p-0 px-4 pb-4 translate-y-0 rounded-10px-tl-tr")}
        >
          {/* red line */}
          <div
            className="
            w-[40px] h-[4px] bg-primary rounded-10px-tl-tr
            mx-auto mt-3 mb-3
          "
          ></div>
          <h3 className="text-xl font-bold mb-3 text-neutral-900">Show only</h3>
          <Box>
            {filterNames.map((each, key) => (
              <div
                key={key}
                className={cn(
                  "pb-[10px] mb-[10px] border-b border-b-[#BDC7D5] text-gray-400",
                  filteredType.find(data => data.key === each.key) && "text-primary",
                  key === filterNames.length - 1 && "border-none"
                )}
                onClick={() => {
                  handleCheckFilter(each);
                }}
              >
                <Flex justify="between" align="center" gap="2">
                  <Text as="label" weight="bold" size="3">
                    {each.value}
                  </Text>
                  {
                    <Icons.check
                      className={cn(
                        "w-[20px] h-[20px]  text-[#BDC7D5]",
                        filteredType.find(data => data.key === each.key) && "text-primary border-primary"
                      )}
                    />
                  }
                </Flex>
              </div>
            ))}
            <DialogClose
              className="w-full"
              onClick={async () => {
                setFilterParams({
                  key: filteredType.map(data => data.key).join(","),
                });
              }}
            >
              <Button className="w-full">Apply filters</Button>
            </DialogClose>
          </Box>
        </DialogContent>
      )}

      {trigger_type === "UNSAVED" && (
        <DialogContent
          animate={Animate.SLIDE}
          className={cn("bg-white top-[initial] bottom-0 p-0 px-4 pb-8 translate-y-0 rounded-10px-tl-tr")}
        >
          <div
            className="
            w-[40px] h-[4px] bg-primary rounded-10px-tl-tr
            mx-auto mt-3 mb-3
          "
          ></div>
          <button className="flex items-center gap-x-2 cursor-pointer" onClick={unSaveContent}>
            <BookmarkSlashIcon className="text-gray-400 w-6 h-6" />
            <h3 className="text-lg font-medium  text-neutral-950">Unsave</h3>
          </button>
        </DialogContent>
      )}

      {trigger_type === "UNFINISHEDPATH" && (
        <DialogContent
          animate={Animate.SLIDE}
          className={cn("bg-white top-[initial] bottom-0 p-0 px-4 pb-8 translate-y-0 rounded-10px-tl-tr")}
        >
          <div
            className="
            w-[40px] h-[4px] bg-primary rounded-10px-tl-tr
            mx-auto mt-3 mb-3
          "
          ></div>
          <button className="flex items-center gap-x-2 cursor-pointer">
            <DeleteIcon className="text-gray-500 w-6 h-6" />
            <h3 className="text-lg font-medium  text-neutral-950">Remove from the list</h3>
          </button>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default ContentFilterDialog;
