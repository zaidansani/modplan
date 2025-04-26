'use client';

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const TagInput = ({ value = [], onChange, placeholder }) => {
    const [inputValue, setInputValue] = React.useState("");

    const handleKeyDown = (e) => {
        // If we press space or enter
        if (e.key === " " || e.key === "Enter") {
            e.preventDefault();

            // Get the trimmed input value
            const newTag = inputValue.trim();

            // If the tag is empty or already exists, don't add it
            if (!newTag || value.includes(newTag)) {
                setInputValue("");
                return;
            }

            // Add the new tag and clear the input
            onChange([...value, newTag]);
            setInputValue("");
        }

        // If we press backspace and the input is empty, remove the last tag
        if (e.key === "Backspace" && !inputValue && value.length > 0) {
            onChange(value.slice(0, -1));
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div className="flex flex-wrap gap-2 border rounded-md p-2 col-span-2">
            {value.map((tag) => (
                <Badge
                    key={tag}
                    variant="secondary"
                    className={`flex items-center gap-1`}
                    onClick={() => removeTag(tag)}
                >
                    {tag}
                    <X
                        className="h-3 w-3 cursor-pointer"
                    />
                </Badge>
            ))}
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-offset-0 p-0 text-sm"
            />
        </div>
    );
};

export default TagInput;
