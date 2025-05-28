import TargetCard from "@/app/components/summary/TargetCard";

const HonoursTarget = ({currentUnits, targetUnits, currentGPA}) => {

    const classifications = [
        {
            "title": "Honours",
            "gpa": 3.0
        },
        {
            "title": "Merit",
            "gpa": 3.5
        },
        {
            "title": "Distinction",
            "gpa": 4.0
        },
        {
            "title": "Highest Distinction",
            "gpa": 4.5
        }
    ]

    console.log(currentUnits, targetUnits, currentGPA)
    return(
        <div className="w-full h-full grid grid-cols-4 md:grid-cols-4 gap-4 col-span-2">
            {classifications.map(c =>
                <TargetCard
                    currentUnits={currentUnits}
                    targetUnits={targetUnits}
                    currentGPA={currentGPA}
                    targetGPA={c.gpa}
                    title={c.title}
                    key={c.title}
                />
            )}
        </div>
    )
}

export default HonoursTarget;