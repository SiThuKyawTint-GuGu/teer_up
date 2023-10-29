"use client";
import {
  useGetFormConfigById,
  usePostFormConfig,
  useUpdateFormConfig,
} from "@/services/formConfig";
import {
  useGetInputConfig,
  usePostInputConfig,
  useUpdateInputConfig,
} from "@/services/inputConfig";
import "@/styles/switch.css";
import "@/styles/tab.css";
import { InputConfigResponse } from "@/types/InputConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, InputLabel, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as Switch from "@radix-ui/react-switch";
import { Editor } from "@tinymce/tinymce-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import { AiFillDelete, AiTwotoneEdit } from "react-icons/ai";
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from "react-icons/md";
import * as yup from "yup";

interface InputConfigFieldsProps {
  name: string;
  placeholder: string;
  type: string;
}

interface OptionsProps {
  label: string;
  value: string;
}

interface Props {
  id: string;
}
interface AddInputFieldType {
  id: number;
  name: string;
  placeholder: string;
  type: string;
  created_at: string;
  updated_at: string;
  input_options?: [];
}

const validationSchema = yup.object({
  name: yup.string().required("Name is required!"),
});
const FormDetailConfigPage = ({ id }: Props) => {
  const router = useRouter();
  const editorRef = useRef<any>();
  const { mutate, data: fields } = useGetInputConfig<InputConfigResponse>();
  // console.log('input config fields', fields);
  const { data: formConfigs } = useGetFormConfigById<any>(id);
  // console.log('from fields by id', formConfigs.data.name);
  const { trigger: updateFormConfigTrigger, isMutating: updateMutating } = useUpdateFormConfig(id);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>("");
  const [selectInputConfig, setSelectInputConfig] = useState<string>("");
  // const [fields, setFields] = useState<InputConfig[]>([]);
  const [order, setOrder] = useState<number>(1);
  const [options, setOptions] = useState([{ label: "", value: "" }]);
  const [inputConfigName, setInputConfigName] = useState<string>("");
  const [inputConfigPlaceholder, setInputConfigPlaceholder] = useState<string>("");
  const [previewOptions, setPreviewOptions] = useState<OptionsProps[]>([]);
  const [formName, setFormName] = useState<string>(formConfigs?.data.name || "");
  const [editFormFields, setEditFormFields] = useState<any[]>([]);
  const [updateInputConfg, setUpdateInputConfig] = useState<any>();
  const { trigger: updateInputConfigTrigger } = useUpdateInputConfig(
    updateInputConfg ? updateInputConfg?.id : undefined
  );
  const [error, setError] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<string>("");

  const { trigger: inputConfigTrigger } = usePostInputConfig();
  const { trigger: formConfigTrigger, isMutating: postMutating } = usePostFormConfig();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (formConfigs?.data) {
      // console.log(formConfigs.data.formdetails_configs);
      setValue("name", formConfigs.data.name);
      setEditFormFields(formConfigs.data.formdetails_configs);
    } else {
      setEditFormFields([]);
    }
  }, [formConfigs?.data]);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setOptions([]);
    setSelectType(event.target.value as string);
  };
  const handleSelectInputConfig = (event: SelectChangeEvent) => {
    setSelectInputConfig(event.target.value as string);
  };

  const handleAddField = async (field: any) => {
    const addField = { ...field };
    const updatedFields = [...editFormFields];

    setEditFormFields([...updatedFields, { input_config: addField, required: true, order: order }]);
    setOrder(order + 1);
  };

  const handleAddInputConfig = async () => {
    if (!inputConfigName) {
      setError("Name is required!");
    } else if (!inputConfigPlaceholder) {
      setError("Placeholder is required!");
    } else {
      if (!updateInputConfg) {
        if (selectType === "radio" || selectType === "dropdown") {
          const submitData = {
            name: inputConfigName,
            placeholder: inputConfigPlaceholder,
            type: selectType,
            input_options: options,
          };
          await inputConfigTrigger(submitData, {
            onSuccess: () => {
              mutate();
            },
          });
          setPreviewOptions([...previewOptions, ...options]);
          setOptions([]);
          // setSelectType('text');
        } else {
          const submitData = {
            name: inputConfigName,
            placeholder: inputConfigPlaceholder,
            type: selectType || "text",
          };
          await inputConfigTrigger(submitData, {
            onSuccess: () => {
              mutate();
            },
          });
        }
        setShowModal(false);
      } else {
        let updateData;
        if (selectType === "radio" || selectType === "dropdown") {
          updateData = {
            name: inputConfigName,
            placeholder: inputConfigPlaceholder,
            type: selectType,
            input_options: options,
          };
        } else {
          updateData = {
            name: inputConfigName,
            placeholder: inputConfigPlaceholder,
            type: selectType,
          };
        }
        await updateInputConfigTrigger(updateData, {
          onSuccess: () => {
            mutate();
          },
        });
        setShowModal(false);
      }
    }
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { label: "", value: "" }];
    setOptions(updatedOptions);
  };

  const handleDeleteField = (order: number) => {
    const updatedFields = editFormFields.filter(field => field.order !== order);
    setEditFormFields(updatedFields);
  };

  const handleDeleteOption = (value: string) => {
    const updatedFields = options.filter(field => field.value !== value);
    setOptions(updatedFields);
  };

  const handleOptionChange = (e: any, optionValue: string) => {
    const { name, value } = e.target;
    setOptions(prevOptions =>
      prevOptions.map(option =>
        option.value === optionValue ? { ...option, [name]: value } : option
      )
    );
  };

  const handleFieldChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = editFormFields.map((field, i) =>
      i === index
        ? { ...field, input_config: { ...field.input_config, [fieldName]: value } }
        : field
    );
    setEditFormFields(updatedFields);
  };

  const handleMoveField = (fieldIndex: number, newIndex: number) => {
    const updatedFields = [...editFormFields];
    const movedField = updatedFields[fieldIndex];
    // Update the order property of the moved field
    movedField.order = newIndex + 1;
    // Shift other fields' order accordingly
    if (newIndex < fieldIndex) {
      for (let i = newIndex; i < fieldIndex; i++) {
        updatedFields[i].order += 1;
      }
    } else {
      for (let i = fieldIndex + 1; i <= newIndex; i++) {
        updatedFields[i].order -= 1;
      }
    }
    // Reorder the fields in the array
    updatedFields.splice(fieldIndex, 1);
    updatedFields.splice(newIndex, 0, movedField);
    setEditFormFields(updatedFields);
  };

  const handleSwitchChange = (index: number, isChecked: boolean) => {
    const updatedFields = editFormFields.map((field, i) =>
      i === index ? { ...field, required: isChecked } : field
    );
    setEditFormFields(updatedFields);
  };

  const handleAddFormConfig = async (data: any) => {
    if (formConfigs?.data) {
      let order = 0;
      const formConfigs = editFormFields.map(form => ({
        required: form.required,
        order: ++order,
        input_config: form.input_config.id,
      }));

      const formConfigData = {
        name: data.name,
        formdetails_configs: formConfigs,
      };
      await updateFormConfigTrigger(formConfigData);
    } else {
      let order = 0;
      const formConfigs = editFormFields.map(form => ({
        required: form.required,
        order: ++order,
        input_config: form.input_config.id,
      }));

      const formConfigData = {
        name: data.name,
        formdetails_configs: formConfigs,
      };
      await formConfigTrigger(formConfigData);
    }
    router.push("/admin/form");
  };
  const handleUpdateInputConfig = (field: any) => {
    if (field.input_options.length > 0) {
      const updatedOptions = field.input_options.map((option: any) => ({
        label: option.label,
        value: option.value,
      }));
      setOptions(updatedOptions);
    }
    setUpdateInputConfig(field);
    setShowModal(true);
    setInputConfigName(field.name);
    setInputConfigPlaceholder(field.placeholder);
    setSelectType(field.type);
  };

  return (
    <form onSubmit={handleSubmit(handleAddFormConfig)}>
      <div className="bg-white p-7 rounded-md">
        <div className="mb-10">
          <TextField {...register("name")} label="Name" className="w-full" variant="outlined" />
          <p className="mt-2 text-red-700">{errors.name?.message}</p>
        </div>

        <div className="mb-10">
          <TextField
            // {...register("name")}
            label="Button Label"
            className="w-full"
            variant="outlined"
          />
          {/* <p className="mt-2 text-red-700">{errors.title?.message}</p> */}
        </div>

        <div className="mb-10">
          <p className="font-weight-600 mb-3">Header</p>
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div>
        <div className="mb-10">
          <p className="font-weight-600 mb-3">Fooder</p>
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div>
        {/* Input Config */}
        {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}
        <div className="flex justify-between">
          <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
            <p>Input Config</p>

            {fields?.data &&
              fields?.data.length > 0 &&
              fields.data.map((field: any, index: number) => (
                <>
                  {(field.type === "Text" ||
                    field.type === "text" ||
                    field.type === "email" ||
                    field.type === "phone" ||
                    field.type === "number") && (
                    <div
                      key={index}
                      className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                    >
                      <p className="font-weight-500 text-sm ">{field.name}</p>
                      <div className="flex justify-center items-center my-5">
                        <TextField
                          label={field.name}
                          type={field.type === "number" ? "number" : "text"}
                          placeholder={field.placeholder}
                          className="w-full"
                          variant="outlined"
                        />
                        <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2 cursor-pointer text-red-700"
                          size={25}
                        />
                      </div>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ width: "50px" }}
                        onClick={() => handleAddField(field)}
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                  {field.type === "radio" && (
                    <div className="border border-gray-300 p-5 m-3 rounded-md">
                      <p className="text-sm">{field.name}</p>
                      <FormControl>
                        <RadioGroup defaultValue="" name="radio-buttons-group">
                          {field.input_options.length > 0 &&
                            field.input_options.map((option: any, index: number) => (
                              <>
                                <FormControlLabel
                                  key={index}
                                  value={option.value}
                                  control={<Radio />}
                                  label={option.label}
                                />
                              </>
                            ))}
                        </RadioGroup>
                      </FormControl>
                      <div className="flex justify-between">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                        <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2 cursor-pointer text-red-700"
                          size={25}
                        />
                      </div>
                    </div>
                  )}

                  {field.type === "dropdown" && (
                    <div className="border border-gray-300 p-5 m-3 rounded-md">
                      <p className="text-sm mb-2">{field.name}</p>
                      {field.input_options.length > 0 && (
                        // <Select onValueChange={handleSelectChange}>
                        //   <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                        //     {field.placeholder || selectType}
                        //   </SelectTrigger>

                        //   <SelectContent className="bg-white">
                        //     {field.input_options.map((dropdown: any, index: number) => (
                        //       <SelectItem key={index} value={dropdown.value}>
                        //         {dropdown.label}
                        //       </SelectItem>
                        //     ))}
                        //   </SelectContent>
                        // </Select>
                        <FormControl fullWidth>
                          <InputLabel id="input-config">
                            {field.placeholder || selectInputConfig}
                          </InputLabel>
                          <Select
                            labelId="input-config"
                            value={selectInputConfig}
                            label="Age"
                            onChange={handleSelectInputConfig}
                          >
                            {field.input_options.map((dropdown: any, index: number) => (
                              <MenuItem key={index} value={dropdown.value}>
                                {dropdown.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      )}
                      <div className="flex justify-between mt-5">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                        <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2 mt-2 cursor-pointer text-red-700"
                          size={25}
                        />
                      </div>
                    </div>
                  )}
                  {field.type === "checkbox" && (
                    <div
                      key={index}
                      className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                    >
                      <p className="font-weight-500 text-sm mb-2">{field.name}</p>
                      <div className="flex justify-between">
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={field.placeholder}
                          />
                        </FormGroup>

                        <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2 cursor-pointer text-red-700"
                          size={25}
                        />
                      </div>
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ width: "50px" }}
                        onClick={() => handleAddField(field)}
                      >
                        ADD
                      </Button>
                    </div>
                  )}
                  {field.type === "date" && (
                    <>
                      <div
                        key={index}
                        className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                      >
                        <p>{field.name}</p>
                        <div className="flex mt-3 justify-between">
                          {/* <DatePicker
                              selected={new Date()}
                              onChange={date => console.log(date)}
                            /> */}
                          <div className="mb-2">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker
                                  sx={{
                                    "& .MuiInputBase-root": {
                                      height: "50px",
                                    },
                                  }}
                                  label={field.name}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>

                          <AiTwotoneEdit
                            onClick={() => handleUpdateInputConfig(field)}
                            className="ml-2  mt-2 cursor-pointer text-red-700"
                            size={25}
                          />
                        </div>
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                      </div>
                    </>
                  )}
                </>
              ))}

            <div className="flex justify-between">
              <div></div>
              <Button
                onClick={() => setShowModal(true)}
                color="error"
                variant="contained"
                sx={{ width: "50px" }}
              >
                +
              </Button>
            </div>
            <div className="flex justify-between">
              <div></div>
              <Modal open={showModal}>
                {/* Dialog Box */}
                <Box sx={style}>
                  <div className="mb-3">
                    <h1>Input Config</h1>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  <div className="mb-5">
                    <p className="font-weight-600 mb-3">Name*</p>

                    <TextField
                      label="Name"
                      defaultValue={inputConfigName || ""}
                      onChange={e => setInputConfigName(e.target.value)}
                      className="w-full"
                      variant="outlined"
                    />
                  </div>

                  <div className="mb-5">
                    <p className="font-weight-600 mb-3">Placeholder*</p>

                    <TextField
                      label="Placeholder"
                      defaultValue={inputConfigPlaceholder || ""}
                      onChange={e => setInputConfigPlaceholder(e.target.value)}
                      className="w-full"
                      variant="outlined"
                    />
                  </div>
                  <div className="mb-10">
                    <p className="mb-5">Type*</p>

                    <FormControl fullWidth>
                      <InputLabel id="select-type">{"Type"}</InputLabel>
                      <Select
                        labelId="select-type"
                        value={selectType}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value="text">Text</MenuItem>
                        <MenuItem value="email">Email</MenuItem>
                        <MenuItem value="phone">Phone</MenuItem>
                        <MenuItem value="number">Number</MenuItem>
                        <MenuItem value="checkbox">Checkbox</MenuItem>
                        <MenuItem value="date">Date</MenuItem>
                        <MenuItem value="radio">Radio</MenuItem>
                        <MenuItem value="dropdown">Dropdown</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  {(selectType === "radio" || selectType === "dropdown") && (
                    <>
                      <p>Options</p>
                      {options.map((field, index) => (
                        <>
                          <div
                            key={index}
                            className="flex justify-evenly p-5 rounded-md border border-gray-300 my-2"
                          >
                            <div className="mb-2 mr-2">
                              <p className="font-weight-600 mb-3">Label*</p>
                              <fieldset className="Fieldset mb-10">
                                <input
                                  className="Input"
                                  name="label"
                                  defaultValue={field.label}
                                  onChange={e => handleOptionChange(e, field.value)}
                                />
                              </fieldset>
                            </div>
                            <div className="mb-2">
                              <p className="font-weight-600 mb-3">Value*</p>
                              <fieldset className="Fieldset mb-10">
                                <input
                                  className="Input"
                                  name="value"
                                  defaultValue={field.value}
                                  onChange={e => handleOptionChange(e, field.value)}
                                />
                              </fieldset>
                            </div>
                            <button onClick={() => handleDeleteOption(field.value)}>
                              <AiFillDelete
                                // onClick={() => setShowModal(true)}
                                size={20}
                                className="text-red-500 cursor-pointer"
                              />
                            </button>
                          </div>
                        </>
                      ))}
                      <Button
                        color="error"
                        variant="contained"
                        sx={{ textTransform: "none", marginTop: "10px" }}
                        onClick={handleAddOption}
                      >
                        + Add Option
                      </Button>
                    </>
                  )}
                  {/* footer */}
                  <div className="flex justify-between">
                    <div></div>
                    <div>
                      <Button
                        sx={{
                          textTransform: "none",
                          marginRight: "10px",
                          color: "white",
                          backgroundColor: "gray",
                          "&:hover": {
                            color: "white",
                            backgroundColor: "gray",
                          },
                        }}
                        variant="contained"
                        onClick={() => {
                          setShowModal(false);
                        }}
                      >
                        Cancel
                      </Button>

                      <Button
                        onClick={handleAddInputConfig}
                        color="error"
                        variant="contained"
                        sx={{ textTransform: "none" }}
                      >
                        Save changes
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </div>
          </div>

          {/* Edit form config */}
          <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
            <p>Edit Form Config</p>
            {editFormFields &&
              editFormFields.length > 0 &&
              editFormFields.map((field, index) => (
                <>
                  <div
                    key={index}
                    className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                  >
                    {(field.input_config.type === "text" ||
                      field.input_config.type === "Text" ||
                      field.input_config.type === "email" ||
                      field.input_config.type === "phone" ||
                      field.input_config.type === "number") && (
                      <>
                        <div className="mb-5">
                          <p className="font-weight-500 text-sm mb-2">
                            Name<sub>*</sub>
                          </p>
                          <div className="flex">
                            <TextField
                              label={"Name"}
                              placeholder={field.input_config.name}
                              className="w-full"
                              defaultValue={""}
                              onChange={e => handleFieldChange(index, "name", e.target.value)}
                              variant="outlined"
                            />
                          </div>
                        </div>
                        <div className="mb-5">
                          <p className="font-weight-500 text-sm mb-2">Placeholder*</p>
                          <div className="flex">
                            <TextField
                              label={"Placeholder"}
                              defaultValue={""}
                              type={field.type === "number" ? "number" : "text"}
                              placeholder={field.input_config.placeholder}
                              className="w-full"
                              onChange={e =>
                                handleFieldChange(index, "placeholder", e.target.value)
                              }
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {field.input_config.type === "radio" &&
                      field.input_config.input_options.length > 0 && (
                        <div>
                          <p className="text-sm">{field.input_config.name}</p>
                          <FormControl>
                            <RadioGroup defaultValue="" name="radio-buttons-group">
                              {field.input_config.input_options.map(
                                (option: any, index: number) => (
                                  <>
                                    <FormControlLabel
                                      key={index}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                    />
                                  </>
                                )
                              )}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                    {field.input_config.type === "dropdown" &&
                      field.input_config.input_options.length > 0 && (
                        <>
                          <p className="text-sm mb-5">{field.input_config.name}</p>

                          <FormControl fullWidth>
                            <InputLabel id="drop">
                              {field.input_config.placeholder || selectInputConfig}
                            </InputLabel>
                            <Select labelId="drop" value={selectType} onChange={handleSelectChange}>
                              {field.input_config.input_options.map(
                                (dropdown: any, index: number) => (
                                  <MenuItem key={index} value={dropdown.value}>
                                    {dropdown.label}
                                  </MenuItem>
                                )
                              )}
                            </Select>
                          </FormControl>
                        </>
                      )}

                    {field.input_config.type === "checkbox" && (
                      <>
                        <p className="my-3">{field.input_config.name}</p>

                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={field.input_config.placeholder}
                          />
                        </FormGroup>
                      </>
                    )}
                    {field.input_config.type === "date" && (
                      <>
                        <div className="mb-2">
                          <p className="my-3">{field.input_config.name}</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                sx={{
                                  "& .MuiInputBase-root": {
                                    height: "50px",
                                  },
                                }}
                                label={field.input_config.name}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                      </>
                    )}

                    <div className=" mt-3 flex items-center justify-between">
                      <form>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <label className="Label mr-1" htmlFor="airplane-mode">
                            Is Required
                          </label>
                          <Switch.Root
                            className="SwitchRoot mr-3"
                            id="airplane-mode"
                            checked={field.required}
                            // onChange={}
                            onCheckedChange={isChecked => handleSwitchChange(index, isChecked)}
                          >
                            <Switch.Thumb className="SwitchThumb" />
                          </Switch.Root>
                        </div>
                      </form>
                      <div className="flex justify-center">
                        <div
                          // disabled={index === 0}
                          onClick={
                            index === 0 ? undefined : () => handleMoveField(index, index - 1)
                          }
                        >
                          <MdKeyboardArrowUp
                            size={25}
                            className="text-gray-700 hover:text-red-700 cursor-pointer"
                          />
                        </div>
                        <div
                          // disabled={index === editFormFields.length - 1}
                          // onClick={() => handleMoveField(index, index + 1)}
                          onClick={
                            index === editFormFields.length - 1
                              ? undefined
                              : () => handleMoveField(index, index + 1)
                          }
                        >
                          <MdOutlineKeyboardArrowDown
                            size={25}
                            className="text-gray-700 hover:text-red-700 cursor-pointer"
                          />
                        </div>
                      </div>
                      <button onClick={() => handleDeleteField(field.order)}>
                        <AiFillDelete size={20} className="text-red-500 cursor-pointer" />
                      </button>
                    </div>
                  </div>
                </>
              ))}
          </div>

          {/* Preview */}
          <div className="flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
            <p>Preview</p>
            <div className=" flex flex-col pb-10 m-3 rounded-md">
              {editFormFields.length > 0 &&
                editFormFields.map((field, index) => (
                  <div key={index}>
                    {(field.input_config.type === "text" ||
                      field.input_config.type === "Text" ||
                      field.input_config.type === "email" ||
                      field.input_config.type === "phone" ||
                      field.input_config.type === "number") && (
                      <div className="my-2">
                        <p className="font-weight-500 text-sm mb-2">
                          {field.input_config.name}
                          {field.required === true ? "*" : ""}
                        </p>
                        <div className="flex mb-5">
                          <TextField
                            label="Name"
                            type={field.input_config.type === "number" ? "number" : "text"}
                            className="w-full"
                            placeholder={field.input_config.placeholder}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    )}

                    {field.input_config.type === "radio" &&
                      field.input_config.input_options.length > 0 && (
                        <div className="mb-4">
                          <p className="text-sm">{field.input_config.name}</p>
                          <FormControl>
                            <RadioGroup defaultValue="" name="radio-buttons-group">
                              {field.input_config.input_options.map(
                                (option: any, index: number) => (
                                  <>
                                    <FormControlLabel
                                      key={index}
                                      value={option.value}
                                      control={<Radio />}
                                      label={option.label}
                                    />
                                  </>
                                )
                              )}
                            </RadioGroup>
                          </FormControl>
                        </div>
                      )}
                    {field.input_config.type === "dropdown" &&
                      field.input_config.input_options.length > 0 && (
                        <>
                          <p className="text-sm my-2 mb-2">{field.input_config.name}</p>

                          <div className="mb-5">
                            <FormControl fullWidth>
                              <InputLabel id="drop">
                                {field.input_config.placeholder || selectInputConfig}
                              </InputLabel>
                              <Select
                                labelId="drop"
                                value={selectType}
                                onChange={handleSelectChange}
                              >
                                {field.input_config.input_options.map(
                                  (dropdown: any, index: number) => (
                                    <MenuItem key={index} value={dropdown.value}>
                                      {dropdown.label}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl>
                          </div>
                        </>
                      )}

                    {field.input_config.type === "checkbox" && (
                      <div className="my-3">
                        <p className="my-2">{field.input_config.name}</p>
                        {/* <form>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                            <Checkbox.Indicator className="CheckboxIndicator">
                              <AiOutlineCheck size={25} className="text-red-700" />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label className="Label" htmlFor="c1">
                            {field.input_config.placeholder}
                          </label>
                        </div>
                      </form> */}
                        <FormGroup>
                          <FormControlLabel
                            control={<Checkbox defaultChecked />}
                            label={field.input_config.placeholder}
                          />
                        </FormGroup>
                      </div>
                    )}
                    {field.input_config.type === "date" && (
                      <>
                        <div className="mb-2">
                          <p>{field.input_config.name}</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker
                                sx={{
                                  "& .MuiInputBase-root": {
                                    height: "50px",
                                  },
                                }}
                                label={field.input_config.name}
                              />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                      </>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <div></div>

          {formConfigs?.data ? (
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
  );
};

export default FormDetailConfigPage;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  overflowY: "auto",
  borderRadius: "10px",
  maxHeight: "80vh",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};
