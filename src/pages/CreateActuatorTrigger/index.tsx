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
type Props = {

}

export default function CreateActuatorTrigger({ }: Props) {
    const { actuatorId = "" } = useParams();
    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { data: actuator } = useQuery(["actuator", actuatorId], () => getActuator(actuatorId))
    const { data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : {})

    const {mutate: newActuatorTrigger} = useMutation(
        (actuatorTrigger: ActuatorTrigger) => {
            return createTrigger(actuatorId, new ActuatorTrigger({
                ...actuatorTrigger
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("actuators")
                navigate(`/actuators/${actuatorId}`)
            }
        }
    )

    const pageTitle = "New actuator trigger"

    return (
        <div className="create-actuator-trigger">
            <ShortHeader title={pageTitle} icon={<ActuatorTriggerIcon />} />

            <div className="container page">
                {actuator && device && <ActuatorTriggerForm actuator={actuator} sensors={device.sensors} submitForm={newActuatorTrigger}/>}
            </div>

        </div>

    )
}