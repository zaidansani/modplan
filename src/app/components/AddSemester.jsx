'use client';

import { useModplan } from '@/app/contexts/ModplanContext';
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
import CustomAlert from "@/app/components/reusable/CustomAlert";

const AddSemester = () => {
    const {data, addSemester} = useModplan();
    const [year, setYear] = useState("");
    const [semester, setSemester] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const [MIN_YEAR, MAX_YEAR, MIN_SEM, MAX_SEM] = [0, 5, 0, 3]

    const checkDuplicate = () => {
        if (!year || !semester) return false;
        const key = `${year}.${semester}`;
        return Object.keys(data.semesters).length > 0 && Object.keys(data.semesters).includes(key);
    };

    const isFormValid = () => {
        const newErrors = {};
        if (!year) {
            newErrors.year = "Year is required";
        } else if (parseInt(year) < MIN_YEAR || parseInt(year) > MAX_YEAR) {
            newErrors.year = `Year must be between ${MIN_YEAR} and ${MAX_YEAR}`;
        }

        if (!semester) {
            newErrors.semester = "Semester is required";
        } else if (parseInt(semester) < MIN_SEM || parseInt(semester) > MAX_SEM) {
            newErrors.semester = `Semester must be between ${MIN_SEM} and ${MAX_SEM}`;
        }

        if (checkDuplicate()) {
            newErrors.duplicate = "Semester already exists.";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isFormValid()) {
            addSemester(year, semester);
            setIsOpen(false);
            setYear("");
            setSemester("");
            setErrors({});
        }
    };

    return (
        <Dialog open={isOpen}
                onOpenChange={setIsOpen}
                className={`flex flex-col h-full`}>
            <DialogTrigger asChild>
                <Button variant="outline">Add a semester</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add semester</DialogTitle>
                    <DialogDescription>
                        Add a new semester
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="year" className="text-right">
                            Year
                        </Label>
                        <Input id="year" type="number"
                               placeholder="1"
                               value={year}
                               onChange={(e) => setYear(e.target.value)}
                               min="0" max="5"
                               required
                               className={`col-span-1 ${errors.year ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <CustomAlert message={errors.year}/>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="semester" className="text-right">
                            Semester
                        </Label>
                        <Input id="semester" type="number"
                               value={semester}
                               onChange={(e) => setSemester(e.target.value)}
                               min="0" max="4"
                               required
                               placeholder="1"
                               className={`col-span-1 ${errors.semester ? 'border-red-500' : ''}`}
                        />
                    </div>
                    <CustomAlert message={errors.semester}/>
                </div>
                <DialogFooter>
                    <CustomAlert message={errors.duplicate}/>
                    <Button
                        type="submit"
                        onClick={handleSubmit}>
                        Add semester
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default AddSemester;