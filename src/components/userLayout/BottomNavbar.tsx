"use client";

import { navbarItems, NavbarType } from "@/shared/data/UserTabbar";
import { cn } from "@/utils/cn";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { mutate } from "swr";
import { unstable_serialize } from "swr/infinite";

const BottomNavbar = () => {
  const pathName = usePathname();
  const search = useSearchParams();
  return (
    <Flex
      className="bg-white w-full max-w-[400px] mx-auto z-[9] shadow-[0px_-3px_9px_0px_rgba(0,_0,_0,_0.06)]"
      align="center"
      justify="between"
      position="fixed"
      bottom="0"
    >
      {navbarItems.map((item: NavbarType, index: number) => {
        return (
          <div key={index} className="p-2 w-20">
            <Link
              href={
                item.path === "/home"
                  ? `${item.path}?${search.get("category") ? `category=${search.get("category")}` : ""}`
                  : item.path
              }
              scroll={false}
              className={cn(
                "flex justify-center items-center flex-col",
                (pathName === item.path ||
                  pathName.includes(item.path) ||
                  ((pathName.length === 0 || pathName === "/") && item.path === "/home")) &&
                  "text-primary"
              )}
              onClick={() => {
                if (item.path === "/explore") {
                  const exploreListContainer = document.getElementById("explore-list-container");
                  if (exploreListContainer) {
                    exploreListContainer.scroll(0, 0);
                  }
                }
                if (item.path === "/home") {
                  const content_list = document.getElementById("content-list-container");
                  if (content_list) {
                    content_list.scroll(0, 0);

                    let query = search.get("search");
                    mutate(`content/browse/all?search=${query || ""}`);
                    mutate(`/admin/contentcategories`);
                    let category = search.get("category");

                    if (category && category !== "all") {
                      mutate(
                        unstable_serialize(
                          (index, previousPageData) =>
                            `/content/browse?page=${index + 1}&category=${category}&pagesize=10${
                              query ? `&search=${query}` : ""
                            }`
                        )
                      );
                    }
                  }
                }
              }}
            >
              {pathName === item.path ||
              pathName.includes(item.path) ||
              ((pathName.length === 0 || pathName === "/") && item.path === "/home")
                ? item.activeIcon
                : item.icon}
              <p>{item.text}</p>
            </Link>
          </div>
        );
      })}
    </Flex>
  );
};

export default BottomNavbar;
