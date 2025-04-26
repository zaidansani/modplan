'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useModplan} from "@/app/contexts/ModplanContext";
import {Badge} from "@/components/ui/badge";
import {useEffect, useState} from "react";
import {defaultColor, invertTailwindGradient} from "@/app/utils/colors";

const TagStats = ({additionalClassName}) => {
    const {data, getAllTags, getTagColorMap} = useModplan()
    const [tags, setTags] = useState(getAllTags());
    const [colorMap, setColorMap] = useState(getTagColorMap());

    const getUnitCount = (tag) => {
        return Object.values(data.modules)
            .filter(m => m.tags.includes(tag))
            .reduce((a,b) => a+b.units, 0)
    }

    useEffect(() => {
        setTags(getAllTags());
        setColorMap(getTagColorMap());
    }, [data.modules]);

    if (tags.length === 0) {
        return null;
    }

    return (<Card className={`${additionalClassName} shadow-xs from-primary/5 to-card ${defaultColor}`}>
        <CardHeader>
            <CardDescription>
                Tag Breakdown
            </CardDescription>
        </CardHeader>
        <CardContent>
            <CardDescription>
                <div className={"flex flex-wrap gap-4"}>
                {
                    tags.sort((a,b) => getUnitCount(b) - getUnitCount(a))
                        .map(tag =>
                        <div key={tag}
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
                    )
                }
                </div>
            </CardDescription>
        </CardContent>

    </Card>)
}

export default TagStats;