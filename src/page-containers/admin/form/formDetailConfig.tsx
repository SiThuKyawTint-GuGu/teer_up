'use client';
import { Button } from '@/components/ui/Button';
import { Dialog, DialogContent, DialogFooter, DialogHeader } from '@/components/ui/Dialog';
import { SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import {
  useGetFormConfigById,
  usePostFormConfig,
  useUpdateFormConfig,
} from '@/services/formConfig';
import {
  useGetInputConfig,
  usePostInputConfig,
  useUpdateInputConfig,
} from '@/services/inputConfig';
import '@/styles/checkbox.css';
import '@/styles/radio.css';
import '@/styles/switch.css';
import '@/styles/tab.css';
import { InputConfigResponse } from '@/types/InputConfig';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Select } from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import { DialogTitle } from '@radix-ui/themes';
import { Editor } from '@tinymce/tinymce-react';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AiFillDelete, AiOutlineCheck, AiTwotoneEdit } from 'react-icons/ai';
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

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
const FormDetailConfigPage = ({ id }: Props) => {
  const router = useRouter();
  const editorRef = useRef<any>();
  const { mutate, data: fields } = useGetInputConfig<InputConfigResponse>();
  // console.log('input config fields', fields);
  const { data: formConfigs } = useGetFormConfigById<any>(id);
  // console.log('from fields by id', formConfigs.data.name);
  const { trigger: updateFormConfigTrigger } = useUpdateFormConfig(id);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>('');
  // const [fields, setFields] = useState<InputConfig[]>([]);
  const [order, setOrder] = useState<number>(1);
  const [options, setOptions] = useState([{ label: '', value: '' }]);
  const [inputConfigName, setInputConfigName] = useState<string>('');
  const [inputConfigPlaceholder, setInputConfigPlaceholder] = useState<string>('');
  const [previewOptions, setPreviewOptions] = useState<OptionsProps[]>([]);
  const [formName, setFormName] = useState<string>(formConfigs?.data.name || '');
  const [editFormFields, setEditFormFields] = useState<any[]>([]);
  const [updateInputConfg, setUpdateInputConfig] = useState<any>();
  const { trigger: updateInputConfigTrigger } = useUpdateInputConfig(
    updateInputConfg ? updateInputConfg?.id : undefined
  );
  const [error, setError] = useState<string>('');
  const [buttonLabel, setButtonLabel] = useState<string>('');

  const { trigger: inputConfigTrigger } = usePostInputConfig();
  const { trigger: formConfigTrigger } = usePostFormConfig();

  useEffect(() => {
    if (formConfigs?.data) {
      console.log(formConfigs.data.formdetails_configs);
      setEditFormFields(formConfigs.data.formdetails_configs);
    } else {
      setEditFormFields([]);
    }
  }, [formConfigs?.data]);

  const handleSelectChange = (selectedValue: string) => {
    setOptions([]);
    setSelectType(selectedValue);
  };

  const handleAddField = async (field: any) => {
    const addField = { ...field };
    const updatedFields = [...editFormFields];

    setEditFormFields([...updatedFields, { input_config: addField, required: true, order: order }]);
    setOrder(order + 1);
  };

  const handleAddInputConfig = async () => {
    if (!inputConfigName) {
      setError('Name is required!');
    } else if (!inputConfigPlaceholder) {
      setError('Placeholder is required!');
    } else {
      if (!updateInputConfg) {
        if (selectType === 'radio' || selectType === 'dropdown') {
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
            type: selectType || 'text',
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
        if (selectType === 'radio' || selectType === 'dropdown') {
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
    const updatedOptions = [...options, { label: '', value: '' }];
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

  const handleAddFormConfig = async () => {
    if (!formName) {
      setError('Name is required!');
    } else if (!buttonLabel) {
      setError('Button lable is required!');
    } else {
      if (formConfigs?.data) {
        let order = 0;
        const formConfigs = editFormFields.map(form => ({
          required: form.required,
          order: ++order,
          input_config: form.input_config.id,
        }));

        const formConfigData = {
          name: formName,
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
          name: formName,
          formdetails_configs: formConfigs,
        };
        await formConfigTrigger(formConfigData);
      }
      router.push('/admin/form');
    }
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
    <div className="bg-white p-7 rounded-md">
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <p className="mb-2">Name*</p>
      <fieldset className="Fieldset mb-10">
        <input
          onChange={e => setFormName(e.target.value)}
          className="Input"
          id="name"
          placeholder="Enter Name"
          defaultValue={formConfigs?.data.name || formName}
        />
      </fieldset>

      <p className="mb-2">Button Lable*</p>
      <fieldset className="Fieldset mb-10">
        <input
          onChange={e => setButtonLabel(e.target.value)}
          className="Input"
          id="name"
          placeholder="Enter Button Label"
          defaultValue=""
        />
      </fieldset>
      <div className="mb-10">
        <p className="font-weight-600 mb-3">Header</p>
        <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
      </div>
      <div className="mb-10">
        <p className="font-weight-600 mb-3">Fooder</p>
        <Editor onInit={(evt, editor) => (editorRef.current = editor)} />
      </div>
      {/* Input Config */}
      <div className="flex justify-between">
        <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
          <p>Input Config</p>

          {fields?.data &&
            fields?.data.length > 0 &&
            fields.data.map((field: any, index: number) => (
              <>
                {(field.type === 'Text' || field.type === 'text') && (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                  >
                    <p className="font-weight-500 text-sm mb-2">{field.name}</p>
                    <div className="flex">
                      <fieldset className="Fieldset mb-10">
                        <input
                          className="Input"
                          id="name"
                          placeholder={field.placeholder}
                          defaultValue=""
                        />
                      </fieldset>

                      <AiTwotoneEdit
                        onClick={() => handleUpdateInputConfig(field)}
                        className="ml-2 cursor-pointer text-red-700"
                        size={25}
                      />
                    </div>
                    <Button
                      className="ml-2 w-[15%] py-0 cursor-pointer rounded-md bg-red-700 text-white"
                      onClick={() => handleAddField(field)}
                    >
                      ADD
                    </Button>
                  </div>
                )}
                {field.type === 'radio' && (
                  <div className="border border-gray-300 p-5 m-3 rounded-md">
                    <p className="text-sm">{field.name}</p>
                    {field.input_options.length > 0 &&
                      field.input_options.map((option: any, index: number) => (
                        <>
                          <form>
                            <RadioGroup.Root
                              className="RadioGroupRoot"
                              defaultValue="default"
                              aria-label="View density"
                            >
                              <div
                                className="my-2"
                                style={{ display: 'flex', alignItems: 'center' }}
                              >
                                <RadioGroup.Item
                                  className="RadioGroupItem"
                                  value={option.value}
                                  id={option.label}
                                >
                                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor={option.label}>
                                  {option.label}
                                </label>
                              </div>
                            </RadioGroup.Root>
                          </form>
                        </>
                      ))}
                    <div className="flex justify-between">
                      <Button
                        className="ml-2 mt-4 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
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

                {field.type === 'dropdown' && (
                  <div className="border border-gray-300 p-5 m-3 rounded-md">
                    <p className="text-sm mb-2">{field.name}</p>
                    {field.input_options.length > 0 && (
                      <Select onValueChange={handleSelectChange}>
                        <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                          {field.placeholder || selectType}
                        </SelectTrigger>

                        <SelectContent className="bg-white">
                          {field.input_options.map((dropdown: any, index: number) => (
                            <SelectItem key={index} value={dropdown.value}>
                              {dropdown.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                    <div className="flex justify-between">
                      <Button
                        className="ml-2 mt-4 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                        onClick={() => handleAddField(field)}
                      >
                        ADD
                      </Button>
                      <AiTwotoneEdit
                        onClick={() => handleUpdateInputConfig(field)}
                        className="ml-2 mt-4 cursor-pointer text-red-700"
                        size={25}
                      />
                    </div>
                  </div>
                )}
                {field.type === 'checkbox' && (
                  <div
                    key={index}
                    className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                  >
                    <p className="font-weight-500 text-sm mb-2">{field.name}</p>
                    <div className="flex justify-between">
                      <form>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                            <Checkbox.Indicator className="CheckboxIndicator">
                              <AiOutlineCheck size={25} className="text-red-700" />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label className="Label" htmlFor="c1">
                            {field.placeholder}
                          </label>
                        </div>
                      </form>

                      <AiTwotoneEdit
                        onClick={() => handleUpdateInputConfig(field)}
                        className="ml-2 cursor-pointer text-red-700"
                        size={25}
                      />
                    </div>
                    <Button
                      className="ml-2 mt-5 w-[15%] py-0 cursor-pointer rounded-md bg-red-700 text-white"
                      onClick={() => handleAddField(field)}
                    >
                      ADD
                    </Button>
                  </div>
                )}
                {field.type === 'date' && (
                  <>
                    <div
                      key={index}
                      className="flex flex-col border border-gray-300 p-5 m-3 rounded-md"
                    >
                      <p>{field.name}</p>
                      <div className="flex mt-3 justify-between">
                        <div className="border p-2 border-red-700">
                          <DatePicker selected={new Date()} onChange={date => console.log(date)} />
                        </div>
                        <AiTwotoneEdit
                          onClick={() => handleUpdateInputConfig(field)}
                          className="ml-2  mt-2 cursor-pointer text-red-700"
                          size={25}
                        />
                      </div>
                      <Button
                        className="ml-2 mt-5 w-[15%] py-0 cursor-pointer rounded-md bg-red-700 text-white"
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
            <button
              onClick={() => setShowModal(true)}
              className="ml-2 py-1 w-[10%] text-center cursor-pointer rounded-lg bg-red-500 text-white"
            >
              +
            </button>
          </div>
          <div className="flex justify-between">
            <div></div>
            <Dialog open={showModal}>
              {/* Dialog Box */}
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-lg">Input Config</DialogTitle>
                </DialogHeader>
                {error && <p className="text-red-600">{error}</p>}
                <div className="mb-2">
                  <p className="font-weight-600 mb-3">Name*</p>
                  <fieldset className="Fieldset mb-10">
                    <input
                      className="Input"
                      id="name"
                      defaultValue={inputConfigName || ''}
                      onChange={e => setInputConfigName(e.target.value)}
                    />
                  </fieldset>
                </div>

                <div className="mb-2">
                  <p className="font-weight-600 mb-3">Placeholder*</p>
                  <fieldset className="Fieldset mb-10">
                    <input
                      className="Input"
                      id="link"
                      defaultValue={inputConfigPlaceholder || ''}
                      onChange={e => setInputConfigPlaceholder(e.target.value)}
                    />
                  </fieldset>
                </div>
                <div className="mb-10">
                  <p className="mb-2">Type*</p>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                      {selectType || 'Type'}
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone</SelectItem>
                      <SelectItem value="number">Number</SelectItem>
                      <SelectItem value="checkbox">Checkbox</SelectItem>
                      <SelectItem value="date">Date</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="radio">Radio</SelectItem>
                      <SelectItem value="dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(selectType === 'radio' || selectType === 'dropdown') && (
                  <>
                    <p>Options</p>
                    {options.map((field, index) => (
                      <>
                        <div
                          key={index}
                          className="flex justify-evenly p-5 rounded-md border border-gray-300"
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
                    <button
                      className="Button w-[30%] bg-red-500 text-white cursor-pointer hover:bg-red-400"
                      onClick={handleAddOption}
                    >
                      + Add Option
                    </button>
                  </>
                )}

                <DialogFooter>
                  <button
                    onClick={() => setShowModal(false)}
                    className="Button text-white bg-gray-600 cursor-pointer"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleAddInputConfig}
                    className="Button bg-red-600 text-white cursor-pointer"
                  >
                    Save changes
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
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
                  {field.inputType === 'text' ||
                    (field.input_config.type === 'Text' && (
                      <>
                        <div>
                          <p className="font-weight-500 text-sm mb-2">
                            Name<sub>*</sub>
                          </p>
                          <div className="flex">
                            <fieldset className="Fieldset mb-10">
                              <input
                                className="Input"
                                id="phoneNo"
                                placeholder={field.input_config.name}
                                defaultValue=""
                                onChange={e => handleFieldChange(index, 'name', e.target.value)}
                              />
                            </fieldset>
                          </div>
                        </div>
                        <div>
                          <p className="font-weight-500 text-sm mb-2">
                            Placeholder<sub>*</sub>
                          </p>
                          <div className="flex">
                            <fieldset className="Fieldset mb-10">
                              <input
                                className="Input"
                                id="phoneNo"
                                placeholder={field.input_config.placeholder}
                                defaultValue=""
                                onChange={e =>
                                  handleFieldChange(index, 'placeholder', e.target.value)
                                }
                              />
                            </fieldset>
                          </div>
                        </div>
                      </>
                    ))}
                  {field.input_config.type === 'radio' &&
                    field.input_config.input_options.length > 0 && (
                      <div>
                        <p className="text-sm">{field.input_config.name}</p>
                        {field.input_config.input_options.map((option: any, index: number) => (
                          <form key={index}>
                            <RadioGroup.Root
                              className="RadioGroupRoot"
                              defaultValue="default"
                              aria-label="View density"
                            >
                              <div
                                className="my-2"
                                style={{ display: 'flex', alignItems: 'center' }}
                              >
                                <RadioGroup.Item
                                  className="RadioGroupItem"
                                  value={option.value}
                                  id={option.label}
                                >
                                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor={option.label}>
                                  {option.label}
                                </label>
                              </div>
                            </RadioGroup.Root>
                          </form>
                        ))}
                      </div>
                    )}
                  {field.input_config.type === 'dropdown' &&
                    field.input_config.input_options.length > 0 && (
                      <>
                        <p className="text-sm mb-2">{field.input_config.name}</p>
                        <Select onValueChange={handleSelectChange}>
                          <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                            {field.input_config.placeholder || selectType}
                          </SelectTrigger>

                          <SelectContent className="bg-white">
                            {field.input_config.input_options.map(
                              (dropdown: any, index: number) => (
                                <SelectItem key={index} value={dropdown.value}>
                                  {dropdown.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </>
                    )}

                  {field.input_config.type === 'checkbox' && (
                    <>
                      <p className="my-3">{field.input_config.name}</p>
                      <form>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                            <Checkbox.Indicator className="CheckboxIndicator">
                              <AiOutlineCheck size={25} className="text-red-700" />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label className="Label" htmlFor="c1">
                            {field.input_config.placeholder}
                          </label>
                        </div>
                      </form>
                    </>
                  )}
                  {field.input_config.type === 'date' && (
                    <>
                      <p className="my-3">{field.input_config.name}</p>
                      <div className="border p-2 border-red-700">
                        <DatePicker selected={new Date()} onChange={date => console.log(date)} />
                      </div>
                    </>
                  )}

                  <div className=" mt-3 flex items-center justify-between">
                    <form>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
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
                      <button disabled={index === 0}>
                        <MdKeyboardArrowUp
                          size={25}
                          onClick={() => handleMoveField(index, index - 1)}
                          className="text-gray-700 hover:text-red-700 cursor-pointer"
                        />
                      </button>
                      <button disabled={index === editFormFields.length - 1}>
                        <MdOutlineKeyboardArrowDown
                          size={25}
                          onClick={() => handleMoveField(index, index + 1)}
                          className="text-gray-700 hover:text-red-700 cursor-pointer"
                        />
                      </button>
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
          <div className=" flex flex-col p-5 m-3 rounded-md">
            {editFormFields.length > 0 &&
              editFormFields.map((field, index) => (
                <div key={index}>
                  {field.input_config.type === 'text' || field.input_config.type === 'Text' ? (
                    <div className="my-2">
                      <p className="font-weight-500 text-sm mb-2">
                        {field.input_config.name}
                        <sub>*</sub>
                      </p>
                      <div className="flex">
                        <fieldset className="Fieldset mb-10">
                          <input
                            className="Input"
                            id="phoneNo"
                            placeholder={field.input_config.placeholder}
                          />
                        </fieldset>
                      </div>
                    </div>
                  ) : null}

                  {field.input_config.type === 'radio' &&
                    field.input_config.input_options.length > 0 && (
                      <div className="my-4">
                        <p className="text-sm">{field.input_config.name}</p>
                        {field.input_config.input_options.map((option: any, index: number) => (
                          <form key={index}>
                            <RadioGroup.Root
                              className="RadioGroupRoot"
                              defaultValue="default"
                              aria-label="View density"
                            >
                              <div
                                className="my-2"
                                style={{ display: 'flex', alignItems: 'center' }}
                              >
                                <RadioGroup.Item
                                  className="RadioGroupItem"
                                  value={option.value}
                                  id={option.label}
                                >
                                  <RadioGroup.Indicator className="RadioGroupIndicator" />
                                </RadioGroup.Item>
                                <label className="Label" htmlFor={option.label}>
                                  {option.label}
                                </label>
                              </div>
                            </RadioGroup.Root>
                          </form>
                        ))}
                      </div>
                    )}
                  {field.input_config.type === 'dropdown' &&
                    field.input_config.input_options.length > 0 && (
                      <>
                        <p className="text-sm my-4 mb-2">{field.input_config.name}</p>
                        <Select onValueChange={handleSelectChange}>
                          <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                            {field.input_config.placeholder || selectType}
                          </SelectTrigger>

                          <SelectContent className="bg-white">
                            {field.input_config.input_options.map(
                              (dropdown: any, index: number) => (
                                <SelectItem key={index} value={dropdown.value}>
                                  {dropdown.label}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                      </>
                    )}

                  {field.input_config.type === 'checkbox' && (
                    <div className="my-3">
                      <p className="my-2">{field.input_config.name}</p>
                      <form>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                          <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
                            <Checkbox.Indicator className="CheckboxIndicator">
                              <AiOutlineCheck size={25} className="text-red-700" />
                            </Checkbox.Indicator>
                          </Checkbox.Root>
                          <label className="Label" htmlFor="c1">
                            {field.input_config.placeholder}
                          </label>
                        </div>
                      </form>
                    </div>
                  )}
                  {field.input_config.type === 'date' && (
                    <>
                      <p className="my-3">{field.input_config.name}</p>
                      <div className="border p-2 border-red-700">
                        <DatePicker selected={new Date()} onChange={date => console.log(date)} />
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
        <button
          onClick={handleAddFormConfig}
          className="Button bg-red-600 text-white cursor-pointer hover:bg-red-500"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default FormDetailConfigPage;
