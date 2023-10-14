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
import '@/styles/switch.css';
import '@/styles/tab.css';
import { Select } from '@radix-ui/react-select';
import * as Switch from '@radix-ui/react-switch';
import { DialogTitle, Flex } from '@radix-ui/themes';
import { useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';

interface InputConfigFieldsProps {
  name: string;
  placeholder: string;
}
const Form = () => {
  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectType, setSelectType] = useState<string>('');
  const [fields, setFields] = useState([{ name: 'Name', placeholder: 'Name', required: true }]);
  const [options, setOptions] = useState([{ id: 1, label: '', value: '' }]);
  const [optionId, setOptionId] = useState<number>(2);
  const [inputConfigFields, setInputConfigFields] = useState<InputConfigFieldsProps[]>([]);
  const [inputConfigName, setInputConfigName] = useState<string>('');
  const [inputConfigPlaceholder, setInputConfigPlaceholder] = useState<string>('');

  const handleSelectChange = (selectedValue: string) => {
    // Handle the selected value
    console.log('Selected value:', selectedValue);
    setSelectType(selectedValue);
  };

  const handleAddField = (name: string) => {
    const updatedFields = [...fields, { name, placeholder: name, required: true }];
    setFields(updatedFields);
  };

  const handleAddInputConfig = () => {
    const updatedFields = [
      ...inputConfigFields,
      { name: inputConfigName, placeholder: inputConfigPlaceholder },
    ];
    setInputConfigFields(updatedFields);
  };

  const handleAddOption = () => {
    const updatedOptions = [...options, { id: optionId, label: '', value: 'name' }];
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

  // const handleOptionChange = (id: number, lable: string, value: string) => {
  //   const updatedFields = options.map(field =>
  //     field.id === id ? { ...field, [lable]: value } : field
  //   );
  //   setOptions(updatedFields);
  // };

  const handleFieldChange = (index: number, fieldName: string, value: string) => {
    const updatedFields = fields.map((field, i) =>
      i === index ? { ...field, [fieldName]: value } : field
    );
    setFields(updatedFields);
  };

  const handleSwitchToggle = (index: number, name: string) => {
    // const updatedFields = fields.map((field, i) =>
    //   i === index ? { ...field, [name]: !field.required } : field
    // );
    // setFields(updatedFields);
    // console.log(fields);
  };
  return (
    <div className="bg-white p-7 rounded-md">
      {/* Input Config */}
      <Flex className="flex">
        <div className="border border-gray-300 p-1 py-3 m-1 rounded-md">
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
          {inputConfigFields &&
            inputConfigFields.length > 0 &&
            inputConfigFields.map((field, index) => (
              <>
                <div className=" flex flex-col border border-gray-300 p-5 m-3 rounded-md">
                  <p className="font-weight-500 text-sm mb-2">{field.name}</p>
                  <div className="flex">
                    <fieldset className="Fieldset mb-10">
                      <input
                        className="Input"
                        id="phoneNo"
                        placeholder={field.placeholder}
                        defaultValue=""
                      />
                    </fieldset>
                    <Button
                      className="ml-2 w-30 py-0 cursor-pointer rounded-md bg-red-700 text-white"
                      onClick={() => handleAddField(field.name)}
                    >
                      ADD
                    </Button>
                  </div>
                </div>
              </>
            ))}

          <div className="flex justify-between">
            <div></div>
            <Dialog>
              <DialogTrigger className="ml-2 py-1 w-[10%] text-center cursor-pointer rounded-lg bg-red-500 text-white">
                +
              </DialogTrigger>

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
                  <Select onValueChange={handleSelectChange}>
                    <SelectTrigger className="p-2 h-5 border-2  bg-white border-gray-700 ">
                      {selectType || 'Type'}
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
                              <input className="Input" id="label" defaultValue="" />
                            </fieldset>
                          </div>
                          <div className="mb-2">
                            <p className="font-weight-600 mb-3">Value*</p>
                            <fieldset className="Fieldset mb-10">
                              <input className="Input" id="value" defaultValue="" />
                            </fieldset>
                          </div>
                          <button onClick={() => handleDeleteOption(field.id)}>
                            <AiFillDelete
                              onClick={() => setShowModal(true)}
                              size={20}
                              className="text-red-500 cursor-pointer"
                            />
                          </button>
                        </div>
                      </>
                    ))}
                    <button
                      className="Button w-[30%] bg-red-500 cursor-pointer hover:bg-red-400"
                      onClick={handleAddOption}
                    >
                      + Add Option
                    </button>
                  </>
                )}

                <DialogFooter>
                  <DialogPrimitive.Close asChild>
                    <button className="Button bg-red-300 cursor-pointer">Cancel</button>
                  </DialogPrimitive.Close>
                  <DialogPrimitive.Close asChild>
                    <button
                      onClick={handleAddInputConfig}
                      className="Button bg-green-300 cursor-pointer"
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
        <div className="border border-gray-300 p-1 py-3 m-1 rounded-md">
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
                <div className=" mt-3 flex justify-between">
                  <form>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <label className="Label mr-1" htmlFor="airplane-mode">
                        Is Required
                      </label>
                      <Switch.Root
                        className="SwitchRoot mr-3"
                        id="airplane-mode"
                        checked={field.required}
                        onCheckedChange={() => handleSwitchToggle(index, field.name)}
                      >
                        <Switch.Thumb className="SwitchThumb" />
                      </Switch.Root>
                    </div>
                  </form>
                  <button onClick={() => handleDeleteField(field.name)}>
                    <AiFillDelete size={20} className="text-red-500 cursor-pointer" />
                  </button>
                </div>
              </div>
            </>
          ))}
        </div>

        {/* Preview */}
        <div className="border border-gray-300 p-1 py-3 m-1 rounded-md">
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
          </div>
        </div>
      </Flex>
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
