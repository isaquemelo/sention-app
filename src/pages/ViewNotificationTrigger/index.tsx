import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';
import { ReactComponent as AddIcon } from '@images/plus-circle.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import Sensor, { default as SensorType } from "../../types/Sensor";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";
import { getSensor } from "../../services/sensors/getSensor";
import { getDevice } from "../../services/devices/getDevice";
import { updateSensor } from "../../services/sensors/updateSensor";
import ListTriggers from "../../components/ListTriggers";
import Typography from "../../components/Typography";
import { getNotificationTrigger } from "../../services/notificationTrigger/getNotificationTrigger";
import NotificationTriggerForm from "../../components/NotificationTriggerForm";

type Props = {

}

type StructedFormData = { name: string, type: string, port: string | number | object }


export default function ViewNotificationTrigger({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { notificationTriggerId = "" } = useParams();
    const { isLoading, data: notificationTrigger } = useQuery(["notificationTrigger", notificationTriggerId], () => getNotificationTrigger(notificationTriggerId))

    const { mutate: saveTrigger } = useMutation(
        (event: StructedFormData) => {
            return updateSensor(new Sensor({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["notificationTrigger", notificationTrigger!.id]);
                await queryClient.invalidateQueries(["sensor", notificationTrigger!.sensorId]);
            }
        }
    );


    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const pageTitle = isLoading || !notificationTrigger ? "Loading..." : notificationTrigger.name

    const Icon: any = sensorIcon

    return (
        <div className="view-sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                {notificationTrigger &&
                    <>
                        <NotificationTriggerForm sensor={sensor} submitForm={saveSensor} />
                    </>
                }
            </div>

        </div>

    )
}