"use client";

import { Button } from "@/components/ui/Button";
import HtmlEditor from "@/components/ui/Editor";
import { Icons } from "@/components/ui/Images";
import { usePostContentOpportunity } from "@/services/companyOpportunity";
import { useGetContentCategory } from "@/services/contentCategory";
import { useGetDepartment } from "@/services/department";
import { useGetFormConfig } from "@/services/formConfig";
import { useGetIndustry } from "@/services/industry";
import { useGetKeywords } from "@/services/keyword";
import { useGetDegreeBySchoolId, useGetMajorsByDegreeId, useGetSchools } from "@/services/school";
import { ContentCategoryResponse } from "@/types/ContentCategory";
import { DepartmentResponse } from "@/types/Department";
import { FormConfigResponse } from "@/types/Formconfig";
import { KeywordResponse } from "@/types/Keyword";
import { DegreeListResponse, MajorListResponse, SchoolListResponse } from "@/types/School";
import {
  Autocomplete,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface OpportunityJobFormInput {
  title: string;
  description: string;
  type: string;
  formconfig_id: number;
  location: string;
  link: string;
  body: string;
  location_type: string;
  employment_type: string;
  job_nature: string;
  school_id: number;
  degree_id: number;
  major_id: number;
  status: string;
  image_url: string;
  categories: number[];
  industries: number[];
  departments: number[];
}

interface OptionType {
  label: string;
  id: number;
}

const OpportunityPosting = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<OpportunityJobFormInput>();

  //swr hooks
  const { trigger: postTrigger, isMutating: postMutating, error: createError } = usePostContentOpportunity();
  const { data: industries } = useGetIndustry<any>();
  const { data: category } = useGetContentCategory<ContentCategoryResponse>();
  const { data: departments } = useGetDepartment<DepartmentResponse>();
  const { data: keywords } = useGetKeywords<KeywordResponse>();
  const { data: formconfigs } = useGetFormConfig<FormConfigResponse>();

  //options
  const [industryOptions, setIndustryOptions] = useState<OptionType[]>([{ label: "Select All", id: 0 }]);
  const [categoryOptions, setCategoryOptions] = useState<OptionType[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<OptionType[]>([{ label: "Select All", id: 0 }]);
  const [keywordOptions, setKeywordOptions] = useState<OptionType[]>([]);
  const [schoolOptions, setSchoolOptions] = useState<OptionType[]>([]);
  const [degreeOptions, setDegreeOptions] = useState<OptionType[]>([]);
  const [majorOptions, setMajorOptions] = useState<OptionType[]>([]);

  //selected
  const [selectedIndustry, setSelectedIndustry] = useState<OptionType[]>([]);
  const [selectCategory, setSelectCategory] = useState<OptionType[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<OptionType[]>([]);
  const [selectedKeywords, setSelectedKeywords] = useState<OptionType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [locationType, setLocationType] = useState<string>("");
  const [employmentType, setEmploymentType] = useState<string>("");
  const [selectedSchool, setSelectedSchool] = useState<OptionType | null>(null);
  const [selectedDegree, setSelectedDegree] = useState<OptionType | null>(null);
  const [selectedMajor, setSelectedMajor] = useState<OptionType | null>(null);
  const [link, setLink] = useState<string>("");
  const [oppoLocation, setOppoLocation] = useState<string>("");
  const [selectForm, setSelectForm] = useState<string>("");
  const [oppoEditor, setOppoEditor] = useState<any>(null);

  const { data: schoolList } = useGetSchools<SchoolListResponse>();
  const { data: degreeList } = useGetDegreeBySchoolId<DegreeListResponse, any>({ id: selectedSchool?.id });
  const { data: majorList } = useGetMajorsByDegreeId<MajorListResponse, any>({ id: selectedDegree?.id });

  const [eventError, setEventError] = useState<string>("");

  const handleIndustryChange = (event: any, newValue: any) => {
    const hasZeroId = newValue.some((value: any) => value.id === 0);
    if (hasZeroId) {
      const optionsWithoutZeroId = industryOptions.filter(option => option.id !== 0);
      setSelectedIndustry(optionsWithoutZeroId);
    } else {
      setSelectedIndustry(newValue);
    }
  };

  const handleCategoryChange = (event: any, newValue: any) => {
    setSelectCategory(newValue);
  };

  const handleDepartmentChange = (event: any, newValue: any) => {
    const hasZeroId = newValue.some((value: any) => value.id === 0);
    if (hasZeroId) {
      const optionsWithoutZeroId = departmentOptions.filter(option => option.id !== 0);
      setSelectedDepartment(optionsWithoutZeroId);
    } else {
      setSelectedDepartment(newValue);
    }
  };

  const handleKeywordChange = (event: any, newValue: any) => {
    setSelectedKeywords(newValue);
  };

  const handleSelectStatus = (event: SelectChangeEvent) => {
    setSelectedStatus(event.target.value);
  };

  const handleSelectLocationType = (event: SelectChangeEvent) => {
    setLocationType(event.target.value);
  };

  const handleSelectEmploymentType = (event: SelectChangeEvent) => {
    setEmploymentType(event.target.value);
  };

  const handleFormSelectChange = (event: SelectChangeEvent) => {
    setSelectForm(event.target.value);
  };

  const handleSchoolChange = (event: any, newValue: OptionType | null) => {
    setSelectedSchool(newValue);
  };

  const handleDegreeChange = (event: any, newValue: OptionType | null) => {
    setSelectedDegree(newValue);
  };

  const handleMajorChange = (event: any, newValue: OptionType | null) => {
    setSelectedMajor(newValue);
  };

  const handleOppoEditorInit = (content: any, editor: any) => {
    setOppoEditor(content);
  };

  const onSubmit: SubmitHandler<OpportunityJobFormInput> = async data => {
    let postdata: any = {};
    if (!link) {
      setEventError("Link is required!");
      return;
    }
    if (!oppoLocation) {
      setEventError("Location is required!");
      return;
    }

    if (!formconfigs) {
      setEventError("Form config is required!");
      return;
    }

    if (!oppoEditor) {
      setEventError("Opportunity Content is required!");
      return;
    }

    if (employmentType === "internship") {
      if (!selectedSchool && !selectedDegree && !selectedMajor) {
        setEventError("School, Degree and Major is required!");
        return;
      }
    }

    const keywords = selectedKeywords.map(item => item.id);
    const departments = selectedDepartment.map(item => item.id);
    const industries = selectedIndustry.map(item => item.id);
    const categories = selectCategory.map(item => item.id);
    const school = selectedSchool?.id;
    const degree = selectedDegree?.id;
    const major = selectedMajor?.id;

    postdata = {
      title: data?.title,
      description: data?.description,
      type: "opportunity",
      status: selectedStatus,
      categories,
      keywords,
      departments,
      industries,
      content_opportunity: {
        link: link,
        formconfig_id: selectForm ? selectForm : undefined,
        location: oppoLocation,
        body: oppoEditor,
        location_type: locationType,
        employment_type: employmentType,
        school_id: school,
        major_id: major,
        degree_id: degree,
      },
    };

    console.log(postdata);
    await postTrigger(postdata);
  };

  useEffect(() => {
    if (industries?.data) {
      const updatedOptions = industries?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setIndustryOptions(updatedOptions);
    }

    if (category?.data) {
      const updatedOptions = category?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setCategoryOptions(updatedOptions);
    }

    if (departments?.data) {
      const updatedOptions = departments?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setDepartmentOptions(updatedOptions);
    }

    if (keywords?.data) {
      const updatedOptions = keywords?.data.map((option: any) => ({
        label: option.keyword,
        id: option.id,
      }));
      setKeywordOptions(updatedOptions);
    }

    if (schoolList?.data) {
      const updatedOptions = schoolList?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setSchoolOptions(updatedOptions);
    }

    if (degreeList?.data) {
      const updatedOptions = degreeList?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setDegreeOptions(updatedOptions);
    }

    if (majorList?.data) {
      const updatedOptions = majorList?.data.map((option: any) => ({
        label: option.name,
        id: option.id,
      }));
      setMajorOptions(updatedOptions);
    }
  }, [industries, category, departments, keywords, schoolList, degreeList, majorList]);

  return (
    <Container sx={{ p: 2 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Button onClick={() => router.back()} className="p-0" variant="ghost">
          <Icons.back className="text-[#373A36] w-[23px] h-[23px]" />
        </Button>
        <Typography variant="h6" fontWeight="bold" my={4}>
          Job Posting
        </Typography>
        <Icons.back className="text-[#373A36] w-[23px] h-[23px] opacity-0" />
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <Typography variant="body1" my={2}>
            Title
          </Typography>
          <TextField {...register("title")} label="Title" className="w-full" variant="outlined" />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Description
          </Typography>
          <TextField {...register("description")} label="Description" className="w-full" variant="outlined" />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Industry
          </Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={industryOptions || []}
            value={selectedIndustry}
            onChange={handleIndustryChange}
            renderInput={params => <TextField {...params} label="Select Industry" placeholder="Industry" />}
          />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Categories
          </Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={categoryOptions || []}
            value={selectCategory}
            onChange={handleCategoryChange}
            renderInput={params => <TextField {...params} label="Select Category" placeholder="Category" />}
          />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Career Interest
          </Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={departmentOptions || []}
            value={selectedDepartment}
            defaultValue={selectedDepartment}
            onChange={handleDepartmentChange}
            renderInput={params => <TextField {...params} label="Career Interest" placeholder="Career Interest" />}
          />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Keywords
          </Typography>
          <Autocomplete
            multiple
            id="tags-outlined"
            options={keywordOptions || []}
            value={selectedKeywords}
            onChange={handleKeywordChange}
            renderInput={params => <TextField {...params} label="Select keywords" placeholder="Keywords" />}
          />
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Status
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="selectStatus">Status</InputLabel>
            <Select
              {...register("status")}
              labelId="selectStatus"
              id="selectStatus"
              value={selectedStatus}
              label="Status"
              onChange={handleSelectStatus}
            >
              <MenuItem value="published">Published</MenuItem>
              <MenuItem value="unpublished">Unpublished</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Job Type
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="locationType">Job Type</InputLabel>
            <Select
              {...register("location_type")}
              labelId="locationType"
              id="locationType"
              value={locationType}
              label="Job Type"
              onChange={handleSelectLocationType}
            >
              <MenuItem value="onsite">On Site</MenuItem>
              <MenuItem value="remote">Remote</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Employment Type
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="employmentType">Employment Type</InputLabel>
            <Select
              {...register("employment_type")}
              labelId="employmentType"
              id="employmentType"
              value={employmentType}
              label="Employment Type"
              onChange={handleSelectEmploymentType}
            >
              <MenuItem value="fulltime">Full Time</MenuItem>
              <MenuItem value="parttime">Part Time</MenuItem>
              <MenuItem value="contract">Contract</MenuItem>
              <MenuItem value="internship">Internship</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {employmentType === "internship" && (
          <Stack direction="row" spacing={2} mt={4}>
            <Autocomplete
              id="tags-outlined"
              options={schoolOptions || []}
              value={selectedSchool}
              onChange={handleSchoolChange}
              fullWidth
              renderInput={params => <TextField {...params} label="Select School" placeholder="School" />}
            />
            <Autocomplete
              id="tags-outlined"
              options={degreeOptions || []}
              value={selectedDegree}
              onChange={handleDegreeChange}
              fullWidth
              renderInput={params => <TextField {...params} label="Select Degree" placeholder="Degree" />}
            />
            <Autocomplete
              id="tags-outlined"
              options={majorOptions || []}
              value={selectedMajor}
              fullWidth
              onChange={handleMajorChange}
              renderInput={params => <TextField {...params} label="Select Major" placeholder="Major" />}
            />
          </Stack>
        )}
        <Stack direction="row" spacing={2} my={4}>
          <TextField
            onChange={e => setLink(e.target.value)}
            value={link}
            label="Link"
            className="w-full"
            variant="outlined"
          />
          <TextField
            onChange={e => setOppoLocation(e.target.value)}
            value={oppoLocation}
            label="Location"
            className="w-full"
            variant="outlined"
          />
        </Stack>
        <Stack>
          <FormControl fullWidth>
            <InputLabel id="selectForm">Form</InputLabel>
            <Select
              labelId="selectForm"
              id="selectForm"
              value={selectForm}
              label="Form"
              onChange={handleFormSelectChange}
            >
              {formconfigs?.data.map((cat: any, index: number) => (
                <MenuItem key={index} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack>
          <Typography variant="body1" my={2}>
            Oppotunity Content
          </Typography>
          <HtmlEditor onEditorChange={handleOppoEditorInit} />
        </Stack>
        {!createError && eventError && <p className="text-red-700 mt-3 mb-3">{eventError}</p>}
        <Stack direction="row" justifyContent="space-between" my={4}>
          <Button type="submit" variant="secondary" disabled={postMutating}>
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={postMutating}>
            {postMutating ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
        {createError && <Typography color="error">{createError.message}</Typography>}
      </form>
    </Container>
  );
};

export default OpportunityPosting;
