'use client'

import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import keyValues from "public/key_values.json"
import {useState} from "react";

const SelectGrade = ({ onGradeChange }) => {
    const [selectedGrade, setSelectedGrade] = useState(null);

    const handleValueChange = (value) => {
        const gradeDetails = keyValues.grades[value];
        setSelectedGrade(gradeDetails);
        onGradeChange?.(value);
    };

    return (
        <Select
            onValueChange={handleValueChange}
            value={selectedGrade?.value}
        >
            <SelectTrigger
                className={`w-[180px] ${selectedGrade?.color || ''}`}
            >
                <SelectValue placeholder="Select grade"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {Object.entries(keyValues.grades).map(([key, details]) => (
                        <SelectItem
                            key={key}
                            value={key}
                            className={`${details.color}`}
                        >
                            {key}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}

// Usage:
{/* <SelectGrade onGradeChange={(grade, details) => console.log(grade, details)} /> */}

export default SelectGrade;
