import React from 'react';
import { NextPage } from 'next';

import ProjectDetail from '@/page-containers/admin/projectDetail';
import { Box } from '@radix-ui/themes';

const ChallengesPage: NextPage = () => {
  return (
    <>
      <Box className="bg-white rounded-md">
        <ProjectDetail />
      </Box>
    </>
  );
};

export default ChallengesPage;
