import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle} from "lucide-react";

const CustomAlert = ({message}) => {
    if (message === undefined) {
        return (<div/>);
    }

    return (<Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
            {message}
        </AlertDescription>
    </Alert>)
}

export default CustomAlert;