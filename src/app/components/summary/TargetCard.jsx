import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {defaultColor} from "@/app/utils/colors";
import {useEffect, useState} from "react";

const TargetCard = ({currentUnits, targetUnits, currentGPA, targetGPA, title}) => {

    const [gpa, setGPA] = useState(0)

    useEffect(() => {
        let target;

        if (targetUnits > currentUnits && targetUnits !== 0 && currentUnits !== 0) {
            target = (targetGPA * targetUnits - currentUnits * currentGPA)/(targetUnits - currentUnits)

            if (target < 0) {
                target = "Attained"
            }
        } else {
            target = "-"
        }

        setGPA(target.toLocaleString(0, {
            maximumFractionDigits: 2,
            minimumFractionDigits: 2
        }));
    }, [targetUnits, currentUnits, currentGPA, targetGPA]);

    return (
        <Card className={`shadow-xs from-primary/5 to-card flex flex-col min-h-full ${defaultColor}`}>
            <CardHeader>
                <CardDescription>
                    {title} ({targetGPA.toLocaleString(0, {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2})})
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
                <CardTitle>
                    {gpa}
                </CardTitle>
            </CardContent>
            <CardFooter>
                <CardDescription>
                    required in remaining semesters.
                </CardDescription>
            </CardFooter>
        </Card>

    )
}

export default TargetCard;