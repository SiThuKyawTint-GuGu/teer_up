"use client";
import { useGetFormConfigById, usePostFormConfig, useUpdateFormConfig } from "@/services/formConfig";
import {
  useDeleteInputConfig,
  useGetInputConfig,
  usePostInputConfig,
  useUpdateInputConfig,
} from "@/services/inputConfig";
// import "@/styles/switch.css";
import "@/styles/tab.css";
import { InputConfigResponse } from "@/types/InputConfig";
import { yupResolver } from "@hookform/resolvers/yup";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { Box, IconButton, InputLabel, Switch, TextField } from "@mui/material";
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
// import * as Switch from "@radix-ui/react-switch";
import AddIcon from "@mui/icons-material/Add";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import DeleteIcon from "@mui/icons-material/Delete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
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
  const [editFormFields, setEditFormFields] = useState<any[]>([]);
  const [updateInputConfg, setUpdateInputConfig] = useState<any>();
  const { trigger: updateInputConfigTrigger } = useUpdateInputConfig(
    updateInputConfg ? updateInputConfg?.id : undefined
  );
  const [error, setError] = useState<string>("");
  const [buttonLabel, setButtonLabel] = useState<string>("");

  const { trigger: inputConfigTrigger } = usePostInputConfig();
  const { trigger: formConfigTrigger, isMutating: postMutating } = usePostFormConfig();
  const { trigger: deleteInputConfigTrigger } = useDeleteInputConfig();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
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
      return;
    } else if (!inputConfigPlaceholder) {
      setError("Placeholder is required!");
      return;
    } else {
      if (!updateInputConfg) {
        if (selectType === "radio" || selectType === "dropdown" || selectType === "checkbox") {
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
        if (selectType === "radio" || selectType === "dropdown" || selectType === "checkbox") {
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
    setInputConfigPlaceholder("");
    setInputConfigName(""), setOptions([]);
    setSelectType("");
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

  const handleOptionChange = (e: any, optionValue: string, index: number) => {
    const { name, value } = e.target;
    // setOptions(prevOptions =>
    //   prevOptions.map(option => (option.value === optionValue ? { ...option, [name]: value } : option))
    // );
    setOptions(prevOptions =>
      prevOptions.map((option, i) => {
        if (i === index) {
          return option.value === optionValue ? { ...option, [name]: value } : option;
        }
        return option;
      })
    );
  };

  const handleFieldChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = editFormFields.map((field, i) =>
      i === index ? { ...field, input_config: { ...field.input_config, [fieldName]: value } } : field
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

  const handleSwitchChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const updatedFields = editFormFields.map((field, i) => (i === index ? { ...field, required: isChecked } : field));
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

  const handleDeleteInputConfig = async (id: string) => {
    await deleteInputConfigTrigger({ id });
  };

  return (
    <form onSubmit={handleSubmit(handleAddFormConfig)}>
      <div className="bg-white p-7 rounded-md">
        <div className="mb-10">
          <TextField
            {...register("name")}
            InputLabelProps={{ shrink: !!watch("name") }}
            label="Name"
            className="w-full"
            variant="outlined"
          />
          <p className="mt-2 text-red-700">{errors.name?.message}</p>
        </div>

        {/* <div className="mb-10">
          <TextField
            // {...register("name")}
            label="Button Label"
            className="w-full"
            variant="outlined"
          />
          <p className="mt-2 text-red-700">{errors.title?.message}</p>
        </div> */}

        {/* <div className="mb-10">
          <p className="font-weight-600 mb-3">Header</p>
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div>
        <div className="mb-10">
          <p className="font-weight-600 mb-3">Fooder</p>
          <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
        </div> */}
        {/* Input Config */}
        {/* {error && <p className="text-red-600 mb-2">{error}</p>} */}
        <div className="flex justify-between">
          <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
            <h1 className="m-3 text-lg font-semibold">Input Config</h1>

            {fields?.data &&
              fields?.data.length > 0 &&
              fields.data.map((field: any, index: number) => (
                <>
                  {(field.type === "Text" ||
                    field.type === "text" ||
                    field.type === "email" ||
                    field.type === "phone" ||
                    field.type === "number") && (
                    <div key={index} className="flex flex-col border border-gray-300 p-5 m-3 rounded-md">
                      <p className="font-weight-500 text-sm ">{field.name}</p>
                      <div className="flex justify-center items-center my-5">
                        <TextField
                          label={field.name}
                          type={field.type === "number" ? "number" : "text"}
                          placeholder={field.placeholder}
                          className="w-full"
                          variant="outlined"
                        />
                        {/* <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2 cursor-pointer text-red-700"
                          size={25}
                        /> */}
                        <div className="ml-2">
                          <IconButton onClick={() => handleUpdateInputConfig(field)} color="error">
                            <BorderColorIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                        <IconButton color="error" onClick={() => handleDeleteInputConfig(field.id)}>
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </div>
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
                        <div>
                          <IconButton onClick={() => handleUpdateInputConfig(field)} color="error">
                            <BorderColorIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteInputConfig(field.id)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  )}

                  {field.type === "dropdown" && (
                    <div className="border border-gray-300 p-5 m-3 rounded-md">
                      <p className="text-sm mb-2">{field.name}</p>
                      {field.input_options.length > 0 && (
                        <FormControl fullWidth>
                          <InputLabel id="input-config">{field.placeholder || selectInputConfig}</InputLabel>
                          <Select
                            labelId="input-config"
                            value={selectInputConfig}
                            label={field.placeholder || selectInputConfig}
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
                      <div className="flex justify-between items-center mt-5">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                        <div className="ml-2">
                          <IconButton onClick={() => handleUpdateInputConfig(field)} color="error">
                            <BorderColorIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteInputConfig(field.id)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  )}
                  {field.type === "checkbox" && (
                    <div key={index} className="flex flex-col border border-gray-300 p-5 m-3 rounded-md">
                      <p className="font-weight-500 text-sm mb-2">{field.name}</p>
                      <div className="flex justify-between">
                        <FormGroup>
                          {field.input_options.map((box: any, index: number) => (
                            <FormControlLabel key={index} control={<Checkbox defaultChecked />} label={box.label} />
                          ))}
                        </FormGroup>
                      </div>
                      <div className="flex justify-between">
                        <Button
                          color="error"
                          variant="contained"
                          sx={{ width: "50px" }}
                          onClick={() => handleAddField(field)}
                        >
                          ADD
                        </Button>
                        <div className="ml-2">
                          <IconButton onClick={() => handleUpdateInputConfig(field)} color="error">
                            <BorderColorIcon fontSize="inherit" />
                          </IconButton>
                          <IconButton color="error" onClick={() => handleDeleteInputConfig(field.id)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    </div>
                  )}
                  {field.type === "date" && (
                    <>
                      <div key={index} className="flex flex-col border border-gray-300 p-5 m-3 rounded-md">
                        <p>{field.name}</p>
                        <div className="flex justify-center items-center my-3">
                          <div>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DatePicker"]}>
                                <DatePicker label={field.name} />
                              </DemoContainer>
                            </LocalizationProvider>
                          </div>

                          {/* <AiTwotoneEdit
                            onClick={() => handleUpdateInputConfig(field)}
                            className="ml-2 cursor-pointer text-red-700"
                            size={25}
                          /> */}
                          <div className="ml-2">
                            <IconButton onClick={() => handleUpdateInputConfig(field)} color="error">
                              <BorderColorIcon fontSize="inherit" />
                            </IconButton>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <Button
                            color="error"
                            variant="contained"
                            sx={{ width: "50px" }}
                            onClick={() => handleAddField(field)}
                          >
                            ADD
                          </Button>
                          <IconButton color="error" onClick={() => handleDeleteInputConfig(field.id)}>
                            <DeleteIcon fontSize="inherit" />
                          </IconButton>
                        </div>
                      </div>
                    </>
                  )}
                </>
              ))}

            <div className="flex justify-between">
              <div></div>
              <Button onClick={() => setShowModal(true)} color="error" variant="contained" sx={{ width: "50px" }}>
                <AddIcon />
              </Button>
            </div>
            <div className="flex justify-between">
              <div></div>
              <Modal open={showModal}>
                {/* Dialog Box */}
                <Box sx={style}>
                  <div className="mb-3">
                    <h1 className="text-xl font-semibold mb-7">Input Config</h1>
                  </div>
                  {error && <p className="text-red-600">{error}</p>}
                  <div className="mb-10">
                    <TextField
                      label="Name"
                      defaultValue={inputConfigName || ""}
                      onChange={e => setInputConfigName(e.target.value)}
                      className="w-full"
                      variant="outlined"
                    />
                  </div>

                  <div className="mb-10">
                    <TextField
                      label="Placeholder"
                      defaultValue={inputConfigPlaceholder || ""}
                      onChange={e => setInputConfigPlaceholder(e.target.value)}
                      className="w-full"
                      variant="outlined"
                    />
                  </div>
                  <div className="mb-10">
                    <FormControl fullWidth>
                      <InputLabel id="selectType-label">Type</InputLabel>
                      <Select
                        labelId="selectType-label"
                        id="selectType"
                        value={selectType}
                        onChange={handleSelectChange}
                        label="Type"
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
                  {(selectType === "radio" || selectType === "dropdown" || selectType === "checkbox") && (
                    <>
                      <p>Options</p>
                      {options.map((field, index) => (
                        <>
                          <div
                            key={index}
                            className="flex justify-between items-center p-5 rounded-md border border-gray-300 my-2"
                          >
                            <div className="mb-2 mr-2">
                              <TextField
                                name="label"
                                onChange={e => handleOptionChange(e, field.value, index)}
                                defaultValue={field.label}
                                label="Label"
                                variant="outlined"
                              />
                            </div>
                            <div className="mb-2">
                              <TextField
                                name="value"
                                onChange={e => handleOptionChange(e, field.value, index)}
                                defaultValue={field.value}
                                label="Value"
                                variant="outlined"
                              />
                            </div>
                            <div>
                              <IconButton onClick={() => handleDeleteOption(field.value)} color="error" size="large">
                                <DeleteIcon fontSize="inherit" />
                              </IconButton>
                            </div>
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
                          setInputConfigName(""), setSelectType(""), setInputConfigPlaceholder(""), setOptions([]);
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
            <h1 className="m-3 text-lg font-semibold">Edit Form Config</h1>
            {editFormFields &&
              editFormFields.length > 0 &&
              editFormFields.map((field, index) => (
                <>
                  <div key={index} className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
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
                              onChange={e => handleFieldChange(index, "placeholder", e.target.value)}
                              variant="outlined"
                            />
                          </div>
                        </div>
                      </>
                    )}
                    {field.input_config.type === "radio" && field.input_config.input_options.length > 0 && (
                      <div>
                        <p className="text-sm">{field.input_config.name}</p>
                        <FormControl>
                          <RadioGroup defaultValue="" name="radio-buttons-group">
                            {field.input_config.input_options.map((option: any, index: number) => (
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
                      </div>
                    )}
                    {field.input_config.type === "dropdown" && field.input_config.input_options.length > 0 && (
                      <>
                        <p className="text-sm mb-5">{field.input_config.name}</p>

                        <FormControl fullWidth>
                          <InputLabel id="drop-label">{field.input_config.placeholder || selectInputConfig}</InputLabel>
                          <Select
                            labelId="drop-label"
                            id="drop"
                            value={selectType}
                            onChange={handleSelectChange}
                            label={field.input_config.placeholder || selectInputConfig}
                          >
                            {field.input_config.input_options.map((dropdown: any, index: number) => (
                              <MenuItem key={index} value={dropdown.value}>
                                {dropdown.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </>
                    )}

                    {field.input_config.type === "checkbox" && field.input_config.input_options.length > 0 && (
                      <>
                        <p className="my-3">{field.input_config.name}</p>
                        <FormGroup>
                          {field.input_config.input_options.map((box: any, index: number) => (
                            <FormControlLabel key={index} control={<Checkbox defaultChecked />} label={box.label} />
                          ))}
                        </FormGroup>
                      </>
                    )}
                    {field.input_config.type === "date" && (
                      <>
                        <div className="mb-2">
                          <p className="my-3">{field.input_config.name}</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker label={field.input_config.name} />
                            </DemoContainer>
                          </LocalizationProvider>
                        </div>
                      </>
                    )}

                    <div className=" mt-3 flex items-center justify-between">
                      <form>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <FormControlLabel
                            control={
                              <Switch
                                checked={field.required}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                                  handleSwitchChange(index, event)
                                }
                                color="error"
                              />
                            }
                            sx={{ color: "gray" }}
                            label="Required"
                          />
                        </div>
                      </form>
                      <div className="flex justify-center">
                        <IconButton
                          disabled={index === 0}
                          onClick={() => handleMoveField(index, index - 1)}
                          color="error"
                        >
                          <KeyboardArrowUpIcon fontSize="inherit" />
                        </IconButton>
                        <IconButton
                          disabled={index === editFormFields.length - 1}
                          onClick={() => handleMoveField(index, index + 1)}
                          color="error"
                        >
                          <KeyboardArrowDownIcon fontSize="inherit" />
                        </IconButton>
                      </div>
                      <IconButton onClick={() => handleDeleteField(field.order)} color="error">
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </div>
                  </div>
                </>
              ))}
          </div>

          {/* Preview */}
          <div className="flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
            <h1 className="m-3 text-lg font-semibold">Preview</h1>
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
                            label={field.input_config.name}
                            type={field.input_config.type === "number" ? "number" : "text"}
                            className="w-full"
                            placeholder={field.input_config.placeholder}
                            variant="outlined"
                          />
                        </div>
                      </div>
                    )}

                    {field.input_config.type === "radio" && field.input_config.input_options.length > 0 && (
                      <div className="mb-4">
                        <p className="text-sm">{field.input_config.name}</p>
                        <FormControl>
                          <RadioGroup defaultValue="" name="radio-buttons-group">
                            {field.input_config.input_options.map((option: any, index: number) => (
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
                      </div>
                    )}
                    {field.input_config.type === "dropdown" && field.input_config.input_options.length > 0 && (
                      <>
                        <p className="text-sm my-2 mb-2">{field.input_config.name}</p>

                        <div className="mb-5">
                          <FormControl fullWidth>
                            <InputLabel id="drop">{field.input_config.placeholder || selectInputConfig}</InputLabel>
                            <Select
                              labelId="drop"
                              value={selectType}
                              onChange={handleSelectChange}
                              label={field.input_config.placeholder || selectInputConfig}
                            >
                              {field.input_config.input_options.map((dropdown: any, index: number) => (
                                <MenuItem key={index} value={dropdown.value}>
                                  {dropdown.label}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </div>
                      </>
                    )}

                    {field.input_config.type === "checkbox" && field.input_config.input_options.length > 0 && (
                      <div className="my-3">
                        <p className="my-2">{field.input_config.name}</p>
                        <FormGroup>
                          {field.input_config.input_options.map((box: any, index: number) => (
                            <FormControlLabel key={index} control={<Checkbox defaultChecked />} label={box.label} />
                          ))}
                        </FormGroup>
                      </div>
                    )}
                    {field.input_config.type === "date" && (
                      <>
                        <div className="mb-2">
                          <p>{field.input_config.name}</p>
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker"]}>
                              <DatePicker label={field.input_config.name} />
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
