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
  // console.log("question", question);
  const { trigger: postTrigger, isMutating: postMutating } = usePostQuestion();
  const { trigger: updateTrigger, isMutating: updateMutating } = useUpdateQuestion(id);
  const [editor, setEditor] = useState<any>(null);
  // const [initialFeedbackValues, setInitialFeedbackValues] = useState<string[]>([]);

  const [editorContent, setEditorContent] = useState<any>({});

  // const handleEditorInit = (editor: any, name: string) => {
  //   setEditor(editor);
  //   editor.setContent(editorContent);
  //   // editor.setContent(editorContent[name] || "");
  // };
  const handleEditorInit = (editor: any, name: string) => {
    setEditor(editor);
    // If you have initial content available in your data
    // if (question?.data) {
    //   const initialContent = question.data.options.find((option: any) => option.name === name)
    //     ?.feedback;
    //   if (editor) {
    //     editor.setContent(initialContent || ""); // Set the initial content
    //     setEditorContent({ ...editorContent, [name]: initialContent || "" });
    //   }
    // }
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
    if (editor) {
      editor?.setContent(editorContent);
    }
    if (question?.data) {
      question.data.options.forEach((option: any) => {
        if (option.name in editorContent) {
          return;
        }
        const initialContent = option.feedback || "";
        console.log(`Setting content for option "${option.name}": ${initialContent}`);

        // if (editor) {
        console.log(".........editor", initialContent);
        editor?.setContent(initialContent);
        setEditorContent({ ...editorContent, [option.name]: initialContent });
        console.log("eidtor content", editorContent);
        // }
      });
    }

    if (question?.data) {
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
      // setInitialFeedbackValues(updateOptions.map((option: any) => option.feedback || ""));

      // console.log("options", updateOptions);
      setOptions(updateOptions);

      // question.data.options.forEach((option: any) => {
      //   // console.log("editor content", option.feedback);
      //   // if (editor) {

      //   editor?.setContent(option.feedback || ""); // Set the editor content
      //   setEditorContent({ ...editorContent, [option.name]: option.feedback || "" });
      //   // }
      // });
    }
    // console.log("editor content", editorContent);
  }, [question?.data, setValue, editor, editorContent]);

  const handleDimensionChange = (event: SelectChangeEvent) => {
    setSelectedDimension(event.target.value);
  };
  const handleChangeType = (event: SelectChangeEvent) => {
    setSelectedType(event.target.value);
  };

  // const handleDeleteOption = (name: string) => {
  //   const updatedFields = options.filter(field => field.name !== name);
  //   setOptions(updatedFields);
  // };

  const handleAddOptions = () => {
    const updatedOptions = [...options, { name: "", score: null, feedback: "" }];
    setOptions(updatedOptions);
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

    console.log("new data", newData);
    // const filteredOptions = data.options.filter((item: any) =>
    //   options.some((opt: any) => opt.name === item.name)
    // );
    // data.options = filteredOptions;

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
                  <Controller
                    name={`options[${index}].feedback` as any}
                    control={control}
                    render={({ field }) => (
                      <Editor
                        // initialValue={field.value}
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
                {/* <div className="flex justify-between">
                  <div></div>
                  <Button
                    onClick={() => handleDeleteOption(option.name)}
                    color="error"
                    variant="contained"
                    sx={{ textTransform: "none" }}
                  >
                    Delete
                  </Button>
                </div> */}
              </Box>
            </>
          ))}
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
        </Box>
      </form>
    </>
  );
};

export default QuestionDetail;
