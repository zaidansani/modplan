'use client';

import {createContext, useContext, useEffect, useState} from 'react';
import {tagColors} from "@/app/utils/colors";

const ModplanContext = createContext();
const LOCAL_STORAGE_KEY = "modplan";

const defaultData = {
    modules: {},
    semesters: {
        "1.1": {
            year: 1,
            semester: 1,
            planned: true
        },
        "1.2": {
            year: 1,
            semester: 2,
            planned: true
        },
        "2.1": {
            year: 2,
            semester: 1,
            planned: true
        },
    }
}

export const ModplanProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        try {
            const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
            if (savedData) {
                setData(JSON.parse(savedData));
            }
        } catch (error) {
            console.error('Error loading data from localStorage:', error);
        }
        setIsLoaded(true);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            try {
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
            } catch (error) {
                console.error('Error saving data to localStorage:', error);
            }
        }
    }, [data, isLoaded]);

    const updateData = (newData) => {
        try {
            let dataToStore = typeof newData === 'function'
                ? newData(data)
                : newData;

            dataToStore = {
                ...dataToStore,
                modules: Object.fromEntries(
                    Object.entries(dataToStore.modules)
                        // Sort modules by key name
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                        // Sort tags within each module
                        .map(([key, module]) => [
                            key,
                            {
                                ...module,
                                tags: [...module.tags].sort((a, b) => a.localeCompare(b))
                            }
                        ])
                ),
                semesters: Object.fromEntries(
                    Object.entries(dataToStore.semesters)
                        // Sort semesters by key name
                        .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
                )
            };

            setData(dataToStore);
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dataToStore));
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const addSemester = (year, semester) => {
        const key = year + "." + semester;

        updateData(prev => ({
            ...prev,
            semesters: {
                ...prev.semesters,
                [key]: {
                    year: parseInt(year),
                    semester: parseInt(semester),
                    planned: true
                }
            }
        }));
    };

    const updateSemester = (key, updates) => {
        updateData(prev => ({
            ...prev,
            semesters: {
                ...prev.semesters,
                [key]: {
                    ...prev.semesters[key],
                    ...updates
                }
            }
        }));
    };

    const removeSemester = (semesterId) => {
        updateData(prevData => {
            const newModules = { ...prevData.modules };
            const newSemesters = { ...prevData.semesters };

            delete newSemesters[semesterId];
            return {
                modules: newModules,
                semesters: newSemesters
            };
        });
    };

    const addModule = (name, grade, units, tags, semester) => {
        updateData(prev => ({
            ...prev,
            modules: {
                ...prev.modules,
                [name]: {
                    name: name,
                    grade: grade,
                    units: parseInt(units),
                    semester: semester,
                    tags: tags
                }
            }
        }));
    };

    const removeModule = (name) => {
        updateData(prevData => {
            const newModules = { ...prevData.modules };
            const newSemesters = { ...prevData.semesters };

            delete newModules[name];
            return {
                modules: newModules,
                semesters: newSemesters
            };
        });
    };

    const getAllTags = () => {
        const allTags = new Set();
        Object.values(data.modules).forEach(module => {
            module.tags?.forEach(tag => allTags.add(tag));
        });

        return Array.from(allTags);
    };

    const getTagColorMap = () => {
        const uniqueTags = getAllTags();
        const colorMap = {};

        uniqueTags.forEach((tag, index) => {
            colorMap[tag] = tagColors[index % tagColors.length];
        });

        return colorMap;
    };

    return (
        <ModplanContext.Provider value={{
            data,
            setData,
            addSemester,
            updateSemester,
            removeSemester,
            addModule,
            removeModule,
            getAllTags,
            getTagColorMap
        }}>
            {children}
        </ModplanContext.Provider>
    );
};

export const useModplan = () => {
    const context = useContext(ModplanContext);
    if (context === undefined) {
        throw new Error('useModplan must be used within a ModplanProvider');
    }
    return context;
};
