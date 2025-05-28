import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import ModuleCard from "@/app/components/ModuleCard";
import {Badge} from "@/components/ui/badge"
import {badgeColors, gradients} from "@/app/utils/colors";
import AddModule from "@/app/components/AddModule";
import {useModplan} from "@/app/contexts/ModplanContext";
import {useMemo} from "react";
import ToggleCompletion from "@/app/components/input/ToggleCompletion";
import {Trash} from "lucide-react";
import {Button} from "@/components/ui/button";
import {getGPA, getTotalGradedUnits} from "@/app/components/SummaryStatistics"

const getUnits = (moduleData) => {
    return Object.values(moduleData).map(m => m.units / m.semester.length)
        .reduce((a, b) => a + b, 0);
}

const getSemestralScore = (semesterData, moduleData) => {
    const semesterString = semesterData.year + "." + semesterData.semester

    return {
        "gpa": getGPA(moduleData.filter(mod => mod.semester[mod.semester.length - 1] === semesterString)),
        "units": getTotalGradedUnits(moduleData.filter(mod => mod.semester[mod.semester.length - 1] === semesterString))
    }
}

const SemesterCard = ({index, tagColorMap, semester}) => {

    const {data, removeSemester} = useModplan();

    const semesterData = data.semesters[semester];
    const moduleData = useMemo(() =>
            Object.values(data.modules).filter(m => m.semester.includes(semester)),
        [data.modules, semester]
    );

    const deleteButtonHandler = () => {
        removeSemester(semester)
    }

    const {gpa, units} = getSemestralScore(semesterData, moduleData)


    const gradientClass = gradients[index % gradients.length];
    return (
        <Card className={`flex flex-col h-full gap-4 ${gradientClass}`}>
            <CardHeader>
                <div className="w-full flex justify-between items-center">
                    <div className={"w-full"}>
                        <CardDescription className={"w-full flex justify-between items-center"}>
                            <div>
                                Year {semesterData.year}
                            </div>
                            <div>
                                {units} GU
                            </div>
                        </CardDescription>
                        <CardTitle className={"w-full flex justify-between items-center"}>
                            <div>
                                Sem {semesterData.semester}
                            </div>
                            <div>
                                {gpa !== 0 ? gpa.toLocaleString(0, {
                                    maximumFractionDigits: 2,
                                    minimumFractionDigits: 2
                                }) : ""}
                            </div>

                        </CardTitle>
                    </div>

                    {
                        moduleData.length === 0 &&
                        <Button
                            variant={"outline"}
                            className={"bg-white/60 backdrop-blur-sm gap-1"}
                            onClick={deleteButtonHandler}
                        >
                            <Trash />
                        </Button>
                    }

                </div>
            </CardHeader>

            <CardContent className="flex-1">
                <div className="space-y-2 w-full">
                        {moduleData.map(mod => (
                            <ModuleCard key={mod.name}
                                        moduleData={mod}
                                        tagColorMap={tagColorMap}/>
                        ))}
                    {semesterData.planned === true
                        ? <AddModule
                            currentSemester={semester}
                            className={"w-full"}
                        />
                        : ""}
                </div>
            </CardContent>

            <CardFooter className="mt-auto w-full">
                <div className="w-full flex justify-between items-center">
                    <ToggleCompletion semester={semester}/>
                    <Badge variant="outline"
                    className={badgeColors}>
                        {getUnits(moduleData)} U
                    </Badge>
                </div>
            </CardFooter>
        </Card>
    );
};


export default SemesterCard;