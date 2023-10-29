import React from "react";
import styled from "styled-components";
import { HEIGHT_TYPES, WIDTH_TYPES } from "./enums";

interface Props {
  url: string;
  width: number | WIDTH_TYPES;
  height: number | HEIGHT_TYPES;
  className?: string;
}

const BGImage: React.FC<Props> = ({ url, width, height, className }: Props) => {
  return <BackgroundStyled className={className} url={url} width={width} height={height} />;
};

export default BGImage;

const BackgroundStyled = styled.div<Props>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
  background: url(${({ url }) => url}) center / cover;
`;
