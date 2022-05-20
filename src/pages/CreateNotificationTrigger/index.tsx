import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as NotificationTriggerIcon } from '@images/notification-trigger.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { getSensor } from "../../services/sensors/getSensor";
import NotificationTriggerForm from "../../components/NotificationTriggerForm";

type Props = {

}

export default function CreateNotificationTrigger({ }: Props) {
    const { sensorId = "" } = useParams();

    const { data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))

    const pageTitle = "New notification trigger"

    return (
        <div className="create-notification-trigger">
            <ShortHeader title={pageTitle} icon={<NotificationTriggerIcon />} />

            <div className="container page">
                {sensor && <NotificationTriggerForm sensor={sensor} />}
            </div>

        </div>

    )
}