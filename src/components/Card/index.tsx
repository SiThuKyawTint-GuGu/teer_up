import React from 'react';
import styled from 'styled-components';

import { cn } from '@/utils/cn';

interface Props {
  className?: string;
  children: React.ReactNode;
}

const CardBox: React.FC<Props> = ({ children, className }: Props) => {
  return (
    <CardStyled className={cn('rounded-[6px] overflow-hidden', className)}>{children}</CardStyled>
  );
};

export default CardBox;

const CardStyled = styled.div`
  box-shadow:
    rgb(234, 236, 240) 0px 0px 1px,
    rgba(29, 41, 57, 0.08) 0px 1px 3px;
`;
