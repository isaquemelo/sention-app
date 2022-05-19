import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as ActuatorTriggerIcon } from '@images/actuator-trigger.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import ActuatorForm from "../../components/ActuatorForm";
import { getActuator } from "../../services/actuators/getActuator";
import ActuatorTriggerForm from "../../components/ActuatorTriggerForm";

type Props = {

}

export default function CreateActuatorTrigger({ }: Props) {
    const { actuatorId = "" } = useParams();

    const { data: actuator } = useQuery(["actuator", actuatorId], () => getActuator(actuatorId))
    const { data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : {})

    const pageTitle = "New actuator trigger"

    return (
        <div className="create-actuator-trigger">
            <ShortHeader title={pageTitle} icon={<ActuatorTriggerIcon />} />

            <div className="container page">
                {actuator && device && <ActuatorTriggerForm actuator={actuator} sensors={device.sensors} />}
            </div>

        </div>

    )
}