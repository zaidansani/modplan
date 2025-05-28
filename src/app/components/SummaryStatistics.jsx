'use client'

import {useModplan} from '@/app/contexts/ModplanContext';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import keyValues from "public/key_values.json"
import {defaultColor} from "@/app/utils/colors";
import TagStats from "@/app/components/summary/TagStats";
import HonoursTarget from "@/app/components/summary/HonoursTarget";

function checkModCompleted(mod, semesterData) {
    const currentSemester = new Set(mod.semester);
    return currentSemester.intersection(new Set(getListOfPlannedSemesters(semesterData))).size === 0;
}

function getRelevantMods(data, includePlanned) {
    if (includePlanned)
        return Object.values(data.modules)
    return Object.values(data.modules)
        .filter(m => checkModCompleted(m, data.semesters))
}

export function getTotalGradedUnits(mods) {
    return mods.map(m => keyValues["grades"][m.grade]["units"] * m.units)
        .reduce((a,b) => a + b, 0);
}

function getTotalUnits(mods) {
    return mods.map(m => m.units)
        .reduce((a,b) => a + b, 0);
}


export function getGPA(mods) {
    if (getTotalGradedUnits(mods) === 0)
        return 0;
    return mods.map(m => keyValues["grades"][m.grade]["score"] *
        m.units * keyValues["grades"][m.grade]["units"])
        .reduce((a,b) => a + b, 0)/getTotalGradedUnits(mods);
}

function getListOfPlannedSemesters(semesterData) {
    return Object.entries(semesterData)
        .filter(([index, sem]) => (sem.planned))
        .map(([index, sem]) => index);
}

function calculateGPA(data, includePlanned) {
    const mods = getRelevantMods(data, includePlanned);
    return getGPA(mods);
}

const SummaryStatistics = () => {

    const {data} = useModplan();

    return (
        <div>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`shadow-xs from-primary/5 to-card ${defaultColor}`}>
                    <CardHeader>
                        <CardDescription>Current GPA</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl lg:text-3xl font-semibold tabular-nums">
                            {calculateGPA(data, false)
                                .toLocaleString(0, {maximumFractionDigits: 2, minimumFractionDigits: 2})}
                        </CardTitle>
                        <CardDescription>
                            {getTotalGradedUnits(getRelevantMods(data, false))} U
                            ({getTotalUnits(getRelevantMods(data, false))} U)
                        </CardDescription>
                    </CardContent>
                </Card>
                <Card className={`shadow-xs from-primary/5 to-card ${defaultColor}`}>
                    <CardHeader>
                        <CardDescription>Predicted GPA</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CardTitle className="text-2xl lg:text-3xl font-semibold tabular-nums">
                            {calculateGPA(data, true)
                                .toLocaleString(0, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2
                                })}
                        </CardTitle>
                        <CardDescription>
                            {getTotalGradedUnits(getRelevantMods(data, true))} U
                            ({getTotalUnits(getRelevantMods(data, true))} U)
                        </CardDescription>
                    </CardContent>
                </Card>
                <TagStats additionalClassName={'col-span-2'}/>
                <HonoursTarget
                    currentGPA={calculateGPA(data, false)}
                    targetUnits={getTotalGradedUnits(getRelevantMods(data, true))}
                    currentUnits={getTotalGradedUnits(getRelevantMods(data, false))}
                />
            </div>
        </div>
    );
};

export default SummaryStatistics;