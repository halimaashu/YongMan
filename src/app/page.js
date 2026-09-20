import ActivityMatrix from "@/components/ActivityMatrix";
import Banner from "@/components/Banner";
import HeroBanner from "@/components/HeroBanner";
import ProgramSelector from "@/components/ProgramSelector";
import Image from "next/image";

import BmiCalculator from "../components/BmiCalculatorCard";
import FeaturedClass from "@/components/FeaturedClass";
import CarouselBanner from "@/components/CarouselBanner";


export default function Home() {
  return (
    <div className="">
     <CarouselBanner/>
      <HeroBanner />
      <ActivityMatrix />
      <ProgramSelector />
      <BmiCalculator />
      <FeaturedClass />
      
      
    </div>
  );
}
