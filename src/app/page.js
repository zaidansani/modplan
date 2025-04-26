import Modplan from "@/app/components/Modplan";
import SummaryStatistics from "@/app/components/SummaryStatistics";
import test_data from "public/test_data.json"

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
        <Modplan data={test_data}/>
    </div>
  );
}
