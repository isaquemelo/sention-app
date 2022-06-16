import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as ActuatorIcon } from '@images/actuator.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import ActuatorForm from "../../components/ActuatorForm";
import { createActuator } from "../../services/actuators/createActuator";
import Actuator from "../../types/Actuator";
import messages from "../../constants/messages";

type Props = {

}

type StructedFormData = { name: string, type: string, port: number }

export default function CreateActuator({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const { mutate: newActuator } = useMutation(
        (event: StructedFormData) => {
            return createActuator(device!.id, new Actuator({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["device", device!.id]);
                alert(messages.REBOOT_TO_APPLY_CHANGES)
                navigate(`/devices/${device!.id}`)
            }
        }
    )

    const pageTitle = "New actuator" // || the sensor name create

    return (
        <div className="create-actuator">
            <ShortHeader title={pageTitle} icon={<ActuatorIcon />} />

            <div className="container page">
                {device && <ActuatorForm device={device} submitForm={newActuator} />}
            </div>

        </div>

    )
}