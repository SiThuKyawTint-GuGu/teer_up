"use client";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Images";
import { InputSearch } from "@/components/ui/Inputs";
import { Checkbox } from "@/components/ui/Inputs/Checkbox";
import { Label } from "@/components/ui/Label";
import { Text } from "@/components/ui/Typo/Text";
import { useGetDepartment, useUpdateUserDepartmentById } from "@/services/department";
import { useGetUserById } from "@/services/user";
import { DepartmentResponse } from "@/types/Department";
import { UserProfileResponse } from "@/types/Profile";
import { Box, Flex, Grid, Section } from "@radix-ui/themes";
import { debounce } from "lodash";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const Department: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { id } = useParams();
  const router = useRouter();
  const { data: profileData } = useGetUserById<UserProfileResponse>(id as string);
  const { data: departmentData } = useGetDepartment<DepartmentResponse>();
  const { trigger: updateTrigger } = useUpdateUserDepartmentById();
  const departmentsData = profileData?.data?.departments;
  const inputRef = useRef<any>(null);
  const [selectId, setSelectId] = useState<number[]>([]);

  const handleCheckedChange = (department_id: number) => {
     if (selectId.includes(department_id)) {
       setSelectId(selectId.filter(id => id !== department_id));
     } else {
       setSelectId([...selectId, department_id]);
     }
  };

  const debouncedOnChange = debounce(() => {
    setSearchValue(inputRef?.current?.value);
  }, 500);

  useEffect(()=>{
    console.log(profileData);
  },[])

  const filteredDepartments = departmentData?.data?.filter(each =>
    each.name.toLowerCase().includes(searchValue.toLowerCase())
  );

   const handleSave = (_:undefined) =>{
    console.log(selectId);
    selectId.map(item =>
      updateTrigger({
        department_id: item,
      })
    );
    router.back();
  }

  return (
    <>
      <Grid columns="1" className="">
        <div className="mb-[45px]">
          <div className="max-w-[400px] fixed top-0 z-10 w-full shadow-[0px_1px_9px_0px_rgba(0,_0,_0,_0.06)]">
            <Flex justify="between" align="center" className="bg-white" p="3">
              <div className="cursor-pointer" onClick={() => router.back()}>
                <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
              </div>
              <Text size="3" weight="medium">
                Career interests
              </Text>
              <Link href="/" className="opacity-0">
                <Icons.plus className="text-primary w-[23px] h-[23px]" />
              </Link>
            </Flex>
          </div>
        </div>

        <Box className="pb-[65px] h-[100vh-56px] bg-white">
          <Section className="bg-white" py="4" px="3">
            <Flex justify="center" align="center" className="mb-[40px] mt-[10px]">
              <InputSearch
                onChange={debouncedOnChange}
                ref={inputRef}
                placeholder="Search Interests"
                inputClassName="p-[10px]"
              />
            </Flex>
            {filteredDepartments?.map((each, key) => {
              const isChecked = departmentsData?.find(department => department.department_id === each?.id);

              return (
                <Label key={key} className="block mb-[20px]">
                  <Flex justify="between" align="start">
                    <Flex direction="column" gap="2">
                      <Text as="label" weight="regular" size="3">
                        {each.name}
                      </Text>
                    </Flex>
                    <Checkbox defaultChecked={!!isChecked} onCheckedChange={() => handleCheckedChange(each?.id)} />
                  </Flex>
                </Label>
              );
            })}
          </Section>
          <div className="pt-[40px]">
            <Button onClick={() => handleSave(undefined)} className="w-full h-[40px]">
              Save
            </Button>
          </div>
        </Box>
      </Grid>
    </>
  );
};

export default Department;
