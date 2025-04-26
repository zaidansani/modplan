import {tagColors} from "@/app/utils/colors";

export const getAllTags = (modules) => {
    const allTags = new Set();
    Object.values(modules).forEach(module => {
        module.tags?.forEach(tag => allTags.add(tag));
    });

    return Array.from(allTags);
};

export const getTagColorMap = (modules) => {
    const uniqueTags = getAllTags(modules)
    const colorMap = {};

    uniqueTags.forEach((tag, index) => {
        colorMap[tag] = tagColors[index % tagColors.length];
    });

    return colorMap;
};

