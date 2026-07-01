import ActivityMatrix from "@/components/ActivityMatrix";
import Banner from "@/components/Banner";
import HeroBanner from "@/components/HeroBanner";
import ProgramSelector from "@/components/ProgramSelector";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="">
      <Banner></Banner>
    <HeroBanner/>
    <ActivityMatrix/>
    <ProgramSelector/>
    </div>
  );
}
