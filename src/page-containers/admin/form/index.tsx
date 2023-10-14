'use client';
import { Button } from '@/components/ui/Button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPrimitive,
  DialogTrigger,
} from '@/components/ui/Dialog';
import { SelectContent, SelectItem, SelectTrigger } from '@/components/ui/Inputs/Select';
import '@/styles/radio.css';
import '@/styles/switch.css';
import '@/styles/tab.css';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { Select } from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import { DialogTitle } from '@radix-ui/themes';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { MdKeyboardArrowUp, MdOutlineKeyboardArrowDown } from 'react-icons/md';

interface InputConfigFieldsProps {
  name: string;
  placeholder: string;
  type: string;
}

interface OptionsProps {
  id: number;
  label: string;
  value: string;
}
const Form = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>('Text');
  const [fields, setFields] = useState([
    { name: 'Name', placeholder: 'Name', required: true, order: 1 },
  ]);
  const [order, setOrder] = useState<number>(1);
  const [options, setOptions] = useState([{ id: 1, label: '', value: '' }]);
  const [dropdowns, setDropdowns] = useState([{ id: 1, label: '', value: '' }]);
  const [optionId, setOptionId] = useState<number>(2);
  const [inputConfigFields, setInputConfigFields] = useState<InputConfigFieldsProps[]>([]);
  const [inputConfigName, setInputConfigName] = useState<string>('');
  const [inputConfigPlaceholder, setInputConfigPlaceholder] = useState<string>('');
  const [previewOptions, setPreviewOptions] = useState<OptionsProps[]>([]);
  const [previewDropdowns, setPreviewDropdowns] = useState<OptionsProps[]>([]);
  const handleSelectChange = (selectedValue: string) => {
    setSelectType(selectedValue);
  };

  const handleAddField = (name: string) => {
    const updatedFields = [
      ...fields,
      { name, placeholder: name, required: true, order: order + 1 },
    ];
    setOrder(order + 1);
    setFields(updatedFields);
  };

  const handleAddInputConfig = () => {
    if (selectType === 'Radio') {
      setPreviewOptions([...previewOptions, ...options]);
      setOptions([]);
      setSelectType('Text');
    } else if (selectType === 'Dropdown') {
      setPreviewDropdowns([...previewDropdowns, ...dropdowns]);
      setDropdowns([]);
      setSelectType('Text');
    } else {
      const updatedFields = [
        ...inputConfigFields,
        { name: inputConfigName, placeholder: inputConfigPlaceholder, type: selectType },
      ];
      setInputConfigFields(updatedFields);
    }
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { id: optionId, label: '', value: '' }];
    setOptionId(optionId + 1);
    setOptions(updatedOptions);
  };

  const handleDeleteField = (name: string) => {
    const updatedFields = fields.filter(field => field.name !== name);
    setFields(updatedFields);
  };
  const handleDeleteOption = (id: number) => {
    const updatedFields = options.filter(field => field.id !== id);
    setOptions(updatedFields);
  };
  const addInputConfig = () => {
    //config
  };

  const handleOptionChange = (e: any, optionId: number) => {
    const { name, value } = e.target;
    if (selectType === 'Radio') {
      setOptions(prevOptions =>
        prevOptions.map(option => (option.id === optionId ? { ...option, [name]: value } : option))
      );
    }
    if (selectType === 'Dropdown') {
      setDropdowns(prevOptions =>
        prevOptions.map(option => (option.id === optionId ? { ...option, [name]: value } : option))
      );
    }
  };

  const handleFieldChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [fieldName]: value } : field
    );
    setFields(updatedFields);
  };

  const handleMoveField = (fieldIndex: number, newIndex: number) => {
    const updatedFields = [...fields];
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

    setFields(updatedFields);
  };

  const handleSwitchChange = (index: number, isChecked: boolean) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, required: isChecked } : field
    );
    setFields(updatedFields);
    console.log(fields);
  };
  return (
    <div className="bg-white p-7 rounded-md">
      {/* Input Config */}
      <div className="flex justify-between">
        <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
          <p>Input Config</p>

          <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
            <p className="font-weight-500 text-sm mb-2">Name</p>
            <div className="flex">
              <fieldset className="Fieldset mb-10">
                <input className="Input" id="name" placeholder="Name" defaultValue="" />
              </fieldset>
              <Button
                className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                onClick={() => handleAddField('Name')}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
            <p className="font-weight-500 text-sm mb-2">Phone Number</p>
            <div className="flex">
              <fieldset className="Fieldset mb-10">
                <input className="Input" id="phoneNo" placeholder="Phone Number" defaultValue="" />
              </fieldset>
              <Button
                className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                onClick={() => handleAddField('Phone Number')}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
            <p className="font-weight-500 text-sm mb-2">Email</p>
            <div className="flex">
              <fieldset className="Fieldset mb-10">
                <input className="Input" id="phoneNo" placeholder="Email" defaultValue="" />
              </fieldset>
              <Button
                className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                onClick={() => handleAddField('Email')}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
            <p className="font-weight-500 text-sm mb-2">Bank Account Number</p>
            <div className="flex">
              <fieldset className="Fieldset mb-10">
                <input
                  className="Input"
                  id="phoneNo"
                  placeholder="Bank Account Number"
                  defaultValue=""
                />
              </fieldset>
              <Button
                className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                onClick={() => handleAddField('Bank Account Number')}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
            <p className="font-weight-500 text-sm mb-2">Annual Income</p>
            <div className="flex">
              <fieldset className="Fieldset mb-10">
                <input className="Input" id="phoneNo" placeholder="Annual Income" defaultValue="" />
              </fieldset>
              <Button
                className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                onClick={() => handleAddField('Annual Income')}
              >
                ADD
              </Button>
            </div>
          </div>

          <div className="flex justify-between">
            <div></div>
            <Dialog>
              <DialogTrigger className="ml-2 py-1 w-[10%] text-center cursor-pointer rounded-lg bg-red-500 text-white">
                +
              </DialogTrigger>

              {/* Dialog Box */}
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-lg">Input Config</DialogTitle>
                </DialogHeader>

                <div className="mb-2">
                  <p className="font-weight-600 mb-3">Name*</p>
                  <fieldset className="Fieldset mb-10">
                    <input
                      className="Input"
                      id="name"
                      defaultValue=""
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
                      defaultValue=""
                      onChange={e => setInputConfigPlaceholder(e.target.value)}
                    />
                  </fieldset>
                </div>
                <div className="mb-10">
                  <p className="mb-2">Type*</p>
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                      {selectType}
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="Text">Text</SelectItem>
                      <SelectItem value="Radio">Radio</SelectItem>
                      <SelectItem value="Dropdown">Dropdown</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {(selectType === 'Radio' || selectType === 'Dropdown') && (
                  <>
                    {options.map((field, index) => (
                      <>
                        <p>Options</p>
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
                                onChange={e => handleOptionChange(e, field.id)}
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
                                onChange={e => handleOptionChange(e, field.id)}
                              />
                            </fieldset>
                          </div>
                          <button onClick={() => handleDeleteOption(field.id)}>
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
                  <DialogPrimitive.Close asChild>
                    <button className="Button text-white bg-gray-600 cursor-pointer">Cancel</button>
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Close asChild>
                    <button
                      onClick={handleAddInputConfig}
                      className="Button bg-red-600 text-white cursor-pointer"
                    >
                      Save changes
                    </button>
                  </DialogPrimitive.Close>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Edit form config */}
        <div className=" flex-1 border border-gray-300 p-1 py-3 m-1 rounded-md">
          <p>Edit Form Config</p>
          {fields.map((field, index) => (
            <>
              <div key={index} className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
                <div>
                  <p className="font-weight-500 text-sm mb-2">
                    Name<sub>*</sub>
                  </p>
                  <div className="flex">
                    <fieldset className="Fieldset mb-10">
                      <input
                        className="Input"
                        id="phoneNo"
                        placeholder={field.name}
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
                        placeholder={field.name}
                        defaultValue=""
                        onChange={e => handleFieldChange(index, 'placeholder', e.target.value)}
                      />
                    </fieldset>
                  </div>
                </div>
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
                    <button disabled={index === fields.length - 1}>
                      <MdOutlineKeyboardArrowDown
                        size={25}
                        onClick={() => handleMoveField(index, index + 1)}
                        className="text-gray-700 hover:text-red-700 cursor-pointer"
                      />
                    </button>
                  </div>
                  <button onClick={() => handleDeleteField(field.name)}>
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
            {fields.map((field, index) => (
              <>
                <div key={index}>
                  <p className="font-weight-500 text-sm mb-2">
                    {field.name}
                    <sub>*</sub>
                  </p>
                  <div className="flex">
                    <fieldset className="Fieldset mb-10">
                      <input className="Input" id="phoneNo" placeholder={field.placeholder} />
                    </fieldset>
                  </div>
                </div>
              </>
            ))}

            {inputConfigFields &&
              inputConfigFields.length > 0 &&
              inputConfigFields.map((field, index) => (
                <>
                  <div key={index}>
                    <p className="font-weight-500 text-sm mb-2">
                      {field.name}
                      <sub>*</sub>
                    </p>
                    <div className="flex">
                      <fieldset className="Fieldset mb-10">
                        <input className="Input" id="phoneNo" placeholder={field.placeholder} />
                      </fieldset>
                    </div>
                  </div>
                </>
              ))}

            {previewOptions &&
              previewOptions.length !== 0 &&
              previewOptions.map((option, index) => (
                <>
                  <form>
                    <RadioGroup.Root
                      className="RadioGroupRoot"
                      defaultValue="default"
                      aria-label="View density"
                    >
                      <div className="my-2" style={{ display: 'flex', alignItems: 'center' }}>
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
            {previewDropdowns && previewDropdowns.length !== 0 && (
              <>
                <p className="mb-2">{inputConfigName}</p>
                <Select>
                  <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                    Default
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {previewDropdowns.map((option, index) => (
                      <SelectItem key={index} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-2">
        <div></div>
        <button className="Button bg-red-600 text-white cursor-pointer hover:bg-red-500">
          Save
        </button>
      </div>
    </div>
  );
};

export default Form;
