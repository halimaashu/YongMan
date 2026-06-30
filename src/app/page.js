import ActivityMatrix from "@/components/ActivityMatrix";
import HeroBanner from "@/components/HeroBanner";
import ProgramSelector from "@/components/ProgramSelector";
import Image from "next/image";

export default function Home() {
  
  return (
    <div className="">
    <HeroBanner/>
    <ActivityMatrix/>
    <ProgramSelector/>
    </div>
  );
}
