'use client';

import {useModplan} from '@/app/contexts/ModplanContext';

import Semester from "@/app/components/SemesterCard";
import AddSemester from "@/app/components/AddSemester";
import SummaryStatistics from "@/app/components/SummaryStatistics";

const Modplan = () => {

    const {data, getTagColorMap} = useModplan();
    const colorMap = getTagColorMap();

    return (
        <div className="space-y-4">
            <SummaryStatistics/>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(Object.entries(data.semesters)
                    .sort((a, b) =>
                        parseFloat(a) - parseFloat(b)))
                    .map(([index, [name, sem]]) =>
                        <Semester key={name}
                                  index={index}
                                  tagColorMap={colorMap}
                                  semester={name}
                        />
                    )}
                <AddSemester/>
            </div>
        </div>
    )
}

export default Modplan;