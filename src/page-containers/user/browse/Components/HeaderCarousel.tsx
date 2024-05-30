import React from "react";
import EmblaCarousel from "./EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import "../Components/css/base.css";
import "../Components/css/embla.css";


const OPTIONS: EmblaOptionsType = { loop: true };
const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());


const HeaderCarousel: React.FC = () => (
  <div className="relative top-[80px] mb-[50px]">
    <EmblaCarousel slides={SLIDES} options={OPTIONS} />
  </div>
);

export default HeaderCarousel;
