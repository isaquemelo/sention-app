import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as NotificationTriggerIcon } from '@images/notification-trigger.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { getSensor } from "../../services/sensors/getSensor";
import NotificationTriggerForm from "../../components/NotificationTriggerForm";
import NotificationTrigger from "../../types/NotificationTrigger";
import { createNotificationTrigger } from "../../services/notificationTrigger/createNotificationTrigger";

type Props = {

}

export default function CreateNotificationTrigger({ }: Props) {
    const { sensorId = "" } = useParams();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))

    const { mutate: newNotificationTrigger } = useMutation(
        (notificationTrigger: NotificationTrigger) => {
            return createNotificationTrigger(sensorId, new NotificationTrigger({
                ...notificationTrigger
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("sensor");
                navigate(`/sensors/${sensorId}`)
            }
        }
    );

    const pageTitle = "New notification trigger"

    return (
        <div className="create-notification-trigger">
            <ShortHeader title={pageTitle} icon={<NotificationTriggerIcon />} />

            <div className="container page">
                {sensor && <NotificationTriggerForm sensor={sensor} submitForm={newNotificationTrigger} />}
            </div>

        </div>

    )
}