import React from 'react';

import Table from '@/components/ui/Table/Table';
import { Columns } from '@/components/ui/Table/TableColumns';
import { Box } from '@radix-ui/themes';

const fadeData = [
  {
    name: 'khin',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'pyae',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
  {
    name: 'user',
    created_data: '12/34/233',
    url: 'dfdsf',
    owner: 'user',
    point: '1323',
    allocated: '',
    status: 'true',
  },
];
const ProjectPage = () => {
  return (
    <>
      <Box className="bg-white p-10 rounded-md">
        <Table tableColumns={Columns} tableData={fadeData} />
      </Box>
    </>
  );
};

export default ProjectPage;
