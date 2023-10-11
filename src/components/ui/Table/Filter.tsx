import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';

import { TextField } from '@radix-ui/themes';

interface Props {
  filter: string;
  setFilter: (value: String) => void; // Corrected the argument type to string
}

const Filter = ({ filter, setFilter }: Props) => {
  return (
    <>
      <TextField.Root className="flex items-center border border-gray-200 p-1 rounded-md">
        <TextField.Slot className="p-1 text-gray-400">
          <AiOutlineSearch size={20} />
        </TextField.Slot>
        <TextField.Input
          className="p-1 outline-none border-none mr-2 text-sm"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          placeholder="Search..."
        />
      </TextField.Root>
    </>
  );
};

export default Filter;
