'use client';

import {badgeColors} from "@/app/utils/colors";
import {Badge} from "@/components/ui/badge";
import {useModplan} from '@/app/contexts/ModplanContext';

const ToggleCompletion = ({semester}) => {

    const {data, updateSemester} = useModplan();
    const toggleInData = () => {
        updateSemester(semester, {
            planned: !(data.semesters[semester].planned)
        })
    }

    const currentSemester = data.semesters[semester];

    return (<a>
        <Badge
            variant="outline"
            className={badgeColors}
            onClick={toggleInData}
        >
            {currentSemester.planned ? "Planned" : "Completed"}
        </Badge>
    </a>)
}

export default ToggleCompletion;