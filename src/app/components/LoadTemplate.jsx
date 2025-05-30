import templates from "public/templates.json";
import { useModplan } from "@/app/contexts/ModplanContext";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"; // Adjust path as needed
import { Button } from "@/components/ui/button"; // Adjust path as needed
import React, { useState } from "react";

const LoadTemplate = () => {
    const { updateData } = useModplan();
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleLoadTemplate = () => {
        if (selectedTemplate) {
            updateData(templates[selectedTemplate]);
        }
    };

    return (
        <div>
            <h1>Select your template!<br/></h1>
            <div className="flex items-center space-x-2">
                <Select onValueChange={setSelectedTemplate} value={selectedTemplate}>
                    <SelectTrigger className={"w-2xl"}>
                        <SelectValue placeholder="Select a template" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.keys(templates).map((template) => (
                            <SelectItem key={template} value={template}>
                                {template}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleLoadTemplate} disabled={!selectedTemplate}>
                    Load template
                </Button>
            </div>

        </div>
    );
};

export default LoadTemplate;