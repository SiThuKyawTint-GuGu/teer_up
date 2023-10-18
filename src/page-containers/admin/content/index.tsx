"use client";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";

import { Box } from "@radix-ui/themes";

import { Button } from "@/components/ui/Button";
import Table from "@/components/ui/Table/Table";
import { ParamsType, useGetContent } from "@/services/content";
import { ContentType } from "@/types/Content";
import { Columns } from "./contentTableColumn";

const Content = () => {
  const params: ParamsType = {
    page: 1,
    pageSize: 10,
  };

  const { data, isLoading, error } = useGetContent<ParamsType, ContentType>(params);
  console.log("data from content", data?.data);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      {error && <p className="text-red-600">{error}</p>}
      <Box className="bg-white p-10 rounded-md">
        <div className="flex justify-between">
          <p className="text-lg">Contents</p>
          <Link href={"/admin/contents/content/0"}>
            <Button className="p-2 mb-5 rounded-md w-full text-white" type="submit">
              Create new content <AiOutlinePlus color="white" size={20} />
            </Button>
          </Link>
        </div>
        <Table tableColumns={Columns} tableData={data?.data || []} />
      </Box>
    </div>
  );
};

export default Content;
