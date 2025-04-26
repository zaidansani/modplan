import {
    Card,
    CardContent, CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {badgeColors, gradeColors} from "@/app/utils/colors";
import { Trash } from "lucide-react"
import {Button} from "@/components/ui/button";
import { useModplan } from "@/app/contexts/ModplanContext";
import EditModule from "@/app/components/EditModule";

const moduleCard = ({moduleData, tagColorMap}) => {

    const {removeModule} = useModplan();

    const deleteButtonHandler = () => {
        removeModule(moduleData.name)
    }

    return (<Card className={"bg-white/60 backdrop-blur-sm gap-1"}>
        <CardHeader>
            <div className={"w-full flex justify-between items-center"}>
                <CardTitle>{moduleData.name}</CardTitle>
                <div className={"flex space-between"}>
                    <EditModule moduleData={moduleData}/>
                    <Button variant={"outline"}
                            className={"bg-white/60 backdrop-blur-sm gap-1"}
                            onClick={deleteButtonHandler}
                    >
                        <Trash />
                    </Button>
                </div>
            </div>
        </CardHeader>
        <CardContent>
            <CardDescription>
                {moduleData.tags
                    ? Object.values(moduleData.tags).map(tag =>
                        <Badge key={tag}
                               variant="outline"
                               className={`${tagColorMap[tag]}`}
                        >{tag}
                        </Badge>
                    )
                    : ""}
            </CardDescription>
        </CardContent>
        <CardFooter>
            <div className="w-full flex justify-between items-center">
                <Badge variant="outline"
                    className={badgeColors}>
                    {moduleData.units} U
                </Badge>
                <Badge
                    variant="outline"
                    className={`${gradeColors[moduleData.grade]}`}>
                    {moduleData.grade}
                </Badge>
            </div>
        </CardFooter>
    </Card>)
}

export default moduleCard;