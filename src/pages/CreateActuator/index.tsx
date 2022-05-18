import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as ActuatorIcon } from '@images/actuator.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";

type Props = {

}

export default function CreateActuator({ }: Props) {
    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const pageTitle = "New actuator" // || the sensor name create

    return (
        <div className="create-actuator">
            <ShortHeader title={pageTitle} icon={<ActuatorIcon />} />

            <div className="container page">
                {device && <SensorForm updateIcon={() => { }} device={device} />}
            </div>

        </div>

    )
}