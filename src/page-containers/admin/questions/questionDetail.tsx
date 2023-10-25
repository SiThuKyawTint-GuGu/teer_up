"use client";
import { useGetDimension } from "@/services/dimension";
import { useGetQuestionById, usePostQuestion, useUpdateQuestion } from "@/services/question";
import { DimensionResponse } from "@/types/Dimension";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { Box } from "@radix-ui/themes";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { AiOutlinePlus } from "react-icons/ai";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup.string().required("Question is required!"),
  dimension_id: yup.number().required("Dimension is required!"),
  type: yup.string().required("Type is required!"),
  options: yup.array().of(
    yup.object({
      name: yup.string().required("Answer is required!"),
      score: yup.number().required("Score is required!").positive("Score must be positive"),
      feedback: yup.string().required("Feedback is required!"),
    })
  ),
});

interface Props {
  id: string;
}

const QuestionDetail = ({ id }: Props) => {
  const router = useRouter();
  const [selectedDimension, setSelectedDimension] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState([{ name: "", score: null, feedback: "" }]);

  const { data: dimensions } = useGetDimension<DimensionResponse>();
  const { data: question } = useGetQuestionById<any>(id);
  console.log("question", question);
  const { trigger: postTrigger } = usePostQuestion();
  const { trigger: updateTrigger } = useUpdateQuestion(id);
  const [editor, setEditor] = useState<any>(null);
  const [editorContent, setEditorContent] = useState("");

  const handleEditorInit = (evt: any, editor: any) => {
    setEditor(editor);
    editor.setContent(editorContent);
  };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (question?.data) {
      setValue("name", question?.data?.name);
      setValue("type", question?.data.type);
      setOptions(question?.data.options);
      setValue("dimension_id", question?.data.dimension_id);
      setSelectedDimension(question?.data.dimension_id);
      setSelectedType(question?.data.type);

      const updateOptions = question?.data.options.map((opt: any) => ({
        name: opt.name,
        score: opt.score,
        feedback: opt.feedback,
      }));
      setValue("options", updateOptions);

      // console.log("options", updateOptions);
      setOptions(updateOptions);
    }
  }, [question?.data, setValue]);

  const handleDimensionChange = (event: SelectChangeEvent) => {
    setSelectedDimension(event.target.value);
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const handleAddOptions = () => {
    const updatedOptions = [...options, { name: "", score: null, feedback: "" }];
    setOptions(updatedOptions);
  };

  const Submit = async (data: any) => {
    console.log(data);
    if (question?.data) {
      await updateTrigger(data);
    } else {
      await postTrigger(data);
    }
    router.push("/admin/setting/questions");
  };

  return (
    <>
      <form onSubmit={handleSubmit(Submit)}>
        <Box className="bg-white p-10 rounded-md">
          <div className="mb-10">
            <TextField
              {...register("name")}
              label="Question"
              size="small"
              className="w-full"
              variant="outlined"
            />
            <p className="mt-2 text-red-700">{errors.name?.message}</p>
          </div>
          <div className="mb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="dimension">Dimension</InputLabel>
              <Select
                {...register("dimension_id")}
                size="small"
                labelId="dimension"
                id="dimension"
                value={selectedDimension}
                label="Dimension"
                onChange={handleDimensionChange}
              >
                {dimensions?.data.map((dim: any, index: number) => (
                  <MenuItem key={index} value={dim.id}>
                    {dim.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.dimension_id?.message}</p>
          </div>
          <div className="mb-10">
            <FormControl size="small" fullWidth>
              <InputLabel id="Type">Type</InputLabel>
              <Select
                {...register("type")}
                size="small"
                labelId="Type"
                id="Type"
                value={selectedType}
                label="Type"
                onChange={handleChangeType}
              >
                <MenuItem value="certainly">Certainly</MenuItem>
                <MenuItem value="skill">Skill</MenuItem>
              </Select>
            </FormControl>
            <p className="mt-2 text-red-700">{errors.type?.message}</p>
          </div>
          <div>
            <Button
              sx={{ textTransform: "none" }}
              color="error"
              variant="contained"
              startIcon={<AiOutlinePlus />}
              onClick={handleAddOptions}
            >
              Add Option
            </Button>
          </div>
          {options?.map((option: any, index: number) => (
            <>
              <Box
                key={index}
                className="flex flex-col justify-center border border-gray-300 p-5 my-5 rounded-md"
              >
                <div className="mb-10">
                  <Controller
                    name={`options[${index}].name` as any}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Answer"
                        defaultValue={option.name}
                        size="small"
                        className="w-full"
                        variant="outlined"
                      />
                    )}
                  />
                  <p className="mt-2 text-red-700">{errors.options?.[index]?.name?.message}</p>
                </div>

                <div className="mb-10">
                  <Controller
                    name={`options[${index}].score` as any}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Score"
                        type={"number"}
                        defaultValue={option.score}
                        size="small"
                        className="w-full"
                        variant="outlined"
                      />
                    )}
                  />
                  <p className="mt-2 text-red-700">{errors.options?.[index]?.score?.message}</p>
                </div>
                <div>
                  {/* <Controller
                    name={`options[${index}].feedback` as any}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Feedback"
                        size="small"
                        className="w-full"
                        variant="outlined"
                      />
                    )}
                  />
                  <p className="mt-2 text-red-700">{errors.options?.[index]?.feedback?.message}</p> */}
                  <Controller
                    name={`options[${index}].feedback` as any}
                    control={control}
                    defaultValue={option.feedback}
                    render={({ field }) => (
                      <Editor
                        value={field.value}
                        init={handleEditorInit}
                        onEditorChange={content => {
                          setEditorContent(content);
                          field.onChange(content);
                        }}
                      />
                    )}
                  />
                  <p className="mt-2 text-red-700">{errors.options?.[index]?.feedback?.message}</p>
                </div>
              </Box>
            </>
          ))}
          <div className="flex justify-between">
            <div></div>
            <LoadingButton
              loading={false}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
              type="submit"
              color="error"
            >
              Save
            </LoadingButton>
          </div>
        </Box>
      </form>
    </>
  );
};

export default QuestionDetail;
