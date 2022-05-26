import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';
import { ReactComponent as NotificationTriggerIcon } from '@images/notification-trigger.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { getSensor } from "../../services/sensors/getSensor";
import { getNotificationTrigger } from "../../services/notificationTrigger/getNotificationTrigger";
import NotificationTriggerForm from "../../components/NotificationTriggerForm";
import { updateNotificationTrigger } from "../../services/notificationTrigger/updateNotificationTrigger";
import NotificationTrigger from "../../types/NotificationTrigger";

type Props = {

}

type StructuredFormData = {
    id?: string
    name: string
    type: string
    logicOperator: string
    value: number
    content: string
    dataSource?: string
}


export default function ViewNotificationTrigger({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { notificationTriggerId = "" } = useParams();
    const { isLoading, data: notificationTrigger } = useQuery(["notificationTrigger", notificationTriggerId], () => getNotificationTrigger(notificationTriggerId))
    const { isLoading: isLoadingSensor, data: sensor } = useQuery(["sensor", notificationTrigger?.sensorId], () => notificationTrigger && notificationTrigger.sensorId ? getSensor(notificationTrigger.sensorId) : undefined)

    const { mutate: saveTrigger } = useMutation(
        (event: StructuredFormData) => {
            return updateNotificationTrigger(new NotificationTrigger({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["notificationTrigger", notificationTrigger!.id]);
                await queryClient.invalidateQueries(["sensor", notificationTrigger!.sensorId]);
                navigate(`/sensors/${notificationTrigger?.sensorId}`)
            }
        }
    );

    const pageTitle = isLoading || !notificationTrigger ? "Loading..." : notificationTrigger.name

    return (
        <div className="view-sensor">
            <ShortHeader title={pageTitle} icon={<NotificationTriggerIcon />} />

            <div className="container page">
                {notificationTrigger && sensor &&
                    <>
                        <NotificationTriggerForm sensor={sensor} submitForm={saveTrigger} notificationTrigger={notificationTrigger} />
                    </>
                }
            </div>

        </div>

    )
}