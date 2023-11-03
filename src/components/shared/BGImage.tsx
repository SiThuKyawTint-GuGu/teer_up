import React from "react";
import styled from "styled-components";
import { HEIGHT_TYPES, WIDTH_TYPES } from "./enums";

interface Props {
  url: string;
  width: string | WIDTH_TYPES;
  height: string | HEIGHT_TYPES;
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
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  background: url(${({ url }) => url}) center / cover;
`;
