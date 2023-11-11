import React from "react";
import styled from "styled-components";
import { Icons } from "../ui/Images";
import { HEIGHT_TYPES, WIDTH_TYPES } from "./enums";

interface Props {
  url: string;
  width: string | WIDTH_TYPES | number;
  height: string | HEIGHT_TYPES | number;
  className?: string;
}

const BGImage: React.FC<Props> = ({ url, width, height, className }: Props) => {
  return (
    <BackgroundStyled className={className} url={url} width={width} height={height}>
      <Icons.deleteCross className="text-white absolute top-3 right-3" />
    </BackgroundStyled>
  );
};

export default BGImage;

const BackgroundStyled = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: url(${({ url }) => url}) center / cover;
`;
