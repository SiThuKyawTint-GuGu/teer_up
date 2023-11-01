"use client";
import { useGetDimension } from "@/services/dimension";
import { useGetQuestionById, usePostQuestion, useUpdateQuestion } from "@/services/question";
import { DimensionResponse } from "@/types/Dimension";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
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
interface OptionType {
  name: string;
  score: any;
  feedback: string;
}

const QuestionDetail = ({ id }: Props) => {
  const router = useRouter();
  const [selectedDimension, setSelectedDimension] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [options, setOptions] = useState<OptionType[]>([{ name: "", score: null, feedback: "" }]);

  const { data: dimensions } = useGetDimension<DimensionResponse>();
  const { data: question } = useGetQuestionById<any>(id);
  // console.log("question", question);
  const { trigger: postTrigger, isMutating: postMutating } = usePostQuestion();
  const { trigger: updateTrigger, isMutating: updateMutating } = useUpdateQuestion(id);
  const [editor, setEditor] = useState<any>(null);
  const [editorContent, setEditorContent] = useState<any>({});
  const [editorInitial, setEditorInitial] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("name");

  const handleEditorInit = (editor: any, name: string) => {
    setEditor(editor);
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
    if (editorInitial === false) {
      if (editor) {
        editor?.setContent(editorContent);
      }
      if (question?.data) {
        question.data.options.forEach((option: any, index: number) => {
          const optionName = `options[${index}].feedback`;
          if (optionName in editorContent) {
            return;
          }
          const initialContent = option.feedback || "";

          if (editor) {
            editor.setContent(initialContent);
          }
          setEditorContent({ ...editorContent, [optionName]: initialContent });
        });
      }

      if (question?.data) {
        setName(question?.data?.name);
        setValue("name", question?.data?.name);
        setValue("type", question?.data?.type);
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
        setOptions(updateOptions);
      }
    }
  }, [question?.data, editor, editorContent]);

  const handleDimensionChange = (event: SelectChangeEvent) => {
    setSelectedDimension(event.target.value);
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  const handleDeleteOption = (index: number) => {
    const updatedFields = options.filter((_, i) => i !== index);
    setOptions(updatedFields);
    setValue("options", updatedFields);
  };

  const handleAddOptions = () => {
    setEditorInitial(true);
    const updatedOptions = [...options, { name: "", score: null, feedback: "" }];
    setOptions(updatedOptions);
    // setValue("options", updatedOptions);
  };

  const Submit = async (data: any) => {
    const newData = data.options.map((item: any, index: number) => {
      const newItem = { ...item };

      // Check if there is a replacement feedback value for this item
      const replacementKey = `options[${index}].feedback`;
      if (editorContent[replacementKey] !== undefined) {
        // If a replacement exists, update the feedback property
        newItem.feedback = editorContent[replacementKey];
      }

      return newItem;
    });
    data.options = newData;
    if (data.options.length <= 0) {
      setError("Please add options!");
      return;
    }
    // console.log(data);
    if (question?.data) {
      await updateTrigger(data);
    } else {
      await postTrigger(data);
    }
    router.push("/admin/setting/questions");
  };

  return (
    <>
      <form onSubmit={handleSubmit(Submit)} className="bg-white h-full p-5">
        <div className="mb-10">
          <TextField
            InputLabelProps={{ shrink: !!name }}
            {...register("name")}
            label="Question"
            className="w-full"
            variant="outlined"
          />
          <p className="mt-2 text-red-700">{errors.name?.message}</p>
        </div>
        <div className="mb-10">
          <FormControl fullWidth>
            <InputLabel id="dimension">Dimension</InputLabel>
            <Select
              {...register("dimension_id")}
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
          <FormControl fullWidth>
            <InputLabel id="Type">Type</InputLabel>
            <Select
              {...register("type")}
              labelId="Type"
              id="Type"
              value={selectedType}
              label="Type"
              onChange={handleChangeType}
            >
              <MenuItem value="certainty">Onboarding</MenuItem>
              <MenuItem value="skill">Feedback</MenuItem>
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
            <Box key={index} className="flex flex-col justify-center border border-gray-300 p-5 my-5 rounded-md">
              <div className="mb-10">
                <Controller
                  name={`options[${index}].name` as any}
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Answer"
                      InputLabelProps={{ shrink: !!option.name }}
                      defaultValue={option.name}
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
                      InputLabelProps={{ shrink: !!option.score }}
                      defaultValue={option.score}
                      className="w-full"
                      variant="outlined"
                    />
                  )}
                />
                <p className="mt-2 text-red-700">{errors.options?.[index]?.score?.message}</p>
              </div>

              <div>
                <Controller
                  name={`options[${index}].feedback` as any}
                  control={control}
                  render={({ field }) => (
                    <Editor
                      value={editorContent[field.name] || ""}
                      init={(editorInit: any) => handleEditorInit(editorInit, field.name)}
                      onEditorChange={content => {
                        setEditorContent({ ...editorContent, [field.name]: content });
                        field.onChange(content);
                      }}
                    />
                  )}
                />

                <p className="mt-2 text-red-700">{errors.options?.[index]?.feedback?.message}</p>
              </div>
              <div>
                <Button
                  onClick={() => handleDeleteOption(index)}
                  color="error"
                  variant="contained"
                  sx={{ textTransform: "none" }}
                >
                  Delete
                </Button>
              </div>
            </Box>
          </>
        ))}
        {error && <p className="text-red-700 mt-5">{error}</p>}
        <div className="flex justify-between">
          <div></div>
          <div>
            {question?.data ? (
              <LoadingButton
                loading={updateMutating}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                color="error"
              >
                Update
              </LoadingButton>
            ) : (
              <LoadingButton
                loading={postMutating}
                loadingPosition="start"
                startIcon={<SaveIcon />}
                variant="contained"
                type="submit"
                color="error"
              >
                Save
              </LoadingButton>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default QuestionDetail;
