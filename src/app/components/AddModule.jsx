'use client';

import {useModplan} from '@/app/contexts/ModplanContext';
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useState} from "react";

import * as React from "react"
import SelectGrade from "@/app/components/input/SelectGrade";
import TagInput from "@/app/components/input/TagInput";
import MultiSelect from "@/app/components/input/MultiSelect";

const AddModule = ({currentSemester}) => {
    const {data, addModule} = useModplan();
    const [name, setName] = useState("");
    const [grade, setGrade] = useState("");
    const [units, setUnits] = useState(4);
    const [tags, setTags] = useState([]);
    const [semester, setSemester] = useState([currentSemester]);
    const [isOpen, setIsOpen] = useState(false);
    const options = Object.keys(data.semesters);

    const handleSubmit = () => {
        addModule(name, grade, units, tags, semester);
        setIsOpen(false);
    };



    return (
        <Dialog open={isOpen}
                onOpenChange={setIsOpen}
                className={`flex flex-col h-full w-100`}>
            <DialogTrigger asChild>
                <Button variant="outline"
                        className={"w-full bg-white/60 backdrop-blur-sm gap-1"}>
                    Add a module
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add module</DialogTitle>
                    <DialogDescription>
                        Add a new module
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Module
                        </Label>
                        <Input id="name"
                               placeholder="MOD1000"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               className="col-span-2"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="grade" className="text-right">
                            Grade
                        </Label>
                        <SelectGrade className="col-span-2"
                                     onGradeChange={setGrade}
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="units" className="text-right">
                            Units
                        </Label>
                        <Input id="units"
                               placeholder="4"
                               type={"number"}
                               value={units}
                               onChange={(e) => setUnits(e.target.value)}
                               className="col-span-2"/>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tags" className="text-right">
                            Tags
                        </Label>
                        <TagInput
                            value={tags}
                            onChange={setTags}
                            placeholder="Type and press space to add tags..."
                            maxTags={5}
                            maxLength={6}
                            className="col-span-2"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="semester" className="text-right">
                            Semester
                        </Label>
                        <MultiSelect
                            options={options}
                            selected={semester}
                            onChange={setSemester}
                            placeholder="Select options..."
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        type="submit"
                        onClick={handleSubmit}>
                        Add module
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddModule;