"use client";

import { useModplan } from "@/app/contexts/ModplanContext";
import { defaultColor } from "@/app/utils/colors";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card";
import { ChevronDownCircleIcon, ChevronUpCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";

const TagStats = ({ additionalClassName }) => {
    const { data, getAllTags, getTagColorMap } = useModplan();
    const [tags, setTags] = useState(getAllTags());
    const [colorMap, setColorMap] = useState(getTagColorMap());
    const [isExpanded, setIsExpanded] = useState(false);

    const getUnitCount = (tag) => {
        return Object.values(data.modules)
            .filter((m) => m.tags.includes(tag))
            .reduce((a, b) => a + b.units, 0);
    };

    useEffect(() => {
        setTags(getAllTags());
        setColorMap(getTagColorMap());
    }, [data.modules]);

    if (tags.length === 0) {
        return null;
    }

    return (
        <Card
            className={`${additionalClassName} shadow-xs from-primary/5 to-card ${defaultColor}`}
        >
            <CardHeader className={"w-full flex justify-between items-center "}>
                <CardDescription>Tag Breakdown</CardDescription>
                <Button
                    variant={"outline"}
                    className={"bg-white/60 backdrop-blur-sm gap-1"}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    {isExpanded ? (
                        <ChevronUpCircleIcon />
                    ) : (
                        <ChevronDownCircleIcon />
                    )}
                </Button>
            </CardHeader>
            <CardContent>
                {isExpanded && (
                    <CardDescription>
                        <div className={"flex flex-wrap gap-4"}>
                            {tags
                                .sort(
                                    (a, b) => getUnitCount(b) - getUnitCount(a)
                                )
                                .map((tag) => (
                                    <div
                                        key={tag}
                                        className={"flex items-center gap-1"}
                                    >
                                        <Badge
                                            variant="outline"
                                            className={`${colorMap[tag]}`}
                                        >
                                            {tag}
                                        </Badge>
                                        <Badge variant="outline">
                                            {getUnitCount(tag)} U
                                        </Badge>
                                    </div>
                                ))}
                        </div>
                    </CardDescription>
                )}
            </CardContent>
        </Card>
    );
};

export default TagStats;
