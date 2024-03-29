import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as ActuatorTriggerIcon } from '@images/actuator-trigger.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { getDevice } from "../../services/devices/getDevice";
import { getActuator } from "../../services/actuators/getActuator";
import ActuatorTriggerForm from "../../components/ActuatorTriggerForm";
import ActuatorTrigger from "../../types/ActuatorTrigger";
import { createTrigger } from "../../services/actuatorTrigger/createTrigger";
import messages from "../../constants/messages";


type Props = {

}

export default function CreateActuatorTrigger({ }: Props) {
    const { actuatorId = "" } = useParams();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { data: actuator } = useQuery(["actuator", actuatorId], () => getActuator(actuatorId))
    const { data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : undefined)

    const { mutate: newActuatorTrigger } = useMutation(
        (actuatorTrigger: ActuatorTrigger) => {
            return createTrigger(actuatorId, new ActuatorTrigger({
                ...actuatorTrigger
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("actuators")
                alert(messages.REBOOT_TO_APPLY_CHANGES)
                navigate(`/actuators/${actuatorId}`)
            }
        }
    )

    const pageTitle = "New actuator trigger"

    return (
        <div className="create-actuator-trigger">
            <ShortHeader title={pageTitle} icon={<ActuatorTriggerIcon />} />

            <div className="container page">
                {actuator && device && <ActuatorTriggerForm sensors={device.sensors} submitForm={newActuatorTrigger} />}
            </div>

        </div>

    )
}