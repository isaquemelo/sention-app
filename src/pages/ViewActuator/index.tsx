import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as ActuatorIcon } from '@images/actuator.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';

import { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import ActuatorForm from "../../components/ActuatorForm";
import { getActuator } from "../../services/actuators/getActuator";

type Props = {

}

export default function ViewActuator({ }: Props) {
    const { actuatorId = "" } = useParams()
    const { isLoading, data: actuator} = useQuery(["sensor", actuatorId], () => getActuator(actuatorId))
    const { isLoading: isLoadingDevice, data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : undefined)

    const [actuatorIcon, setActuatorIcon] = useState<any>(UnknownTypeIcon)

    const pageTitle = isLoading || !actuator ? "Loading..." : actuator.name

    return (
        <div className="create-actuator">
            <ShortHeader title={pageTitle} icon={<ActuatorIcon />} />

            <div className="container page">
                {device && <ActuatorForm device={device} actuator={actuator} />}
            </div>

        </div>

    )
}