"use client";
import { Box, Grid, Section } from "@radix-ui/themes";
import React, { useMemo } from "react";
import TitleHeader from "./components/TitleHeader";
import ComponentsSidebar from "../browse/Components/SideBar";
import { useRouter, useSearchParams } from "next/navigation";

const NotificationPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useMemo(() => {
    return searchParams.get("search");
  }, [searchParams]);

  const handleCategoryChange = (value: string) => {
    router.push(`?category=${value}${search ? `&search=${search}` : ""}`);
  };

  return (
    <Grid columns="1">
      <Box>
        <Section py="4" px="3">
          <TitleHeader headerText={"Notifications"} optionText={"See More"} />
          <ComponentsSidebar handleCategoryChange={handleCategoryChange} />
        </Section>
      </Box>
    </Grid>
  );
};

export default NotificationPage;
