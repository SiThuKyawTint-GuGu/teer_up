'use client';
import { Button } from '@/components/ui/Button';
import Table from '@/components/ui/Table/Table';
import { useGetFormConfig } from '@/services/formConfig';
import { Box } from '@radix-ui/themes';
import Link from 'next/link';
import { AiOutlinePlus } from 'react-icons/ai';
import { Columns } from './formConfigTableColumn';

const FormConfig = () => {
  const { data: formConfigs, isLoading, error } = useGetFormConfig<any>();
  // console.log('data from form config', formConfigs);

  if (isLoading) return <p>Loading...</p>;
  return (
    <>
      <div>
        {error && <p className="text-red-600">{error}</p>}
        <Box className="bg-white p-10 rounded-md">
          <div className="flex justify-between">
            <p className="text-lg">Form Config</p>

            <Link href={'/admin/form/0'}>
              <Button className="p-2 mb-5 rounded-md w-full text-white" type="submit">
                Create new form <AiOutlinePlus color="white" size={20} />
              </Button>
            </Link>
          </div>
          {formConfigs?.data && (
            <Table tableColumns={Columns} tableData={formConfigs?.data || []} />
          )}
        </Box>
      </div>
    </>
  );
};

export default FormConfig;
