import React from "react";
import ReactDOM from "react-dom/client";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "../Components/css/base.css";
import "../Components/css/sandbox.css";
import "../Components/css/embla.css";

const OPTIONS: EmblaOptionsType = {};
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

const HeaderCarousel: React.FC = () => (
  <div className="relative top-[9%] mb-4">
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </div>
);

export default HeaderCarousel;
