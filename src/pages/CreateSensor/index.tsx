import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";

type Props = {

}

export default function CreateSensor({ }: Props) {
    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const pageTitle = "New sensor" // || the sensor name create

    const updateSensorIcon = (sensorType: SensorType['type']) => {
        if (sensorType) {
            const FunctionComponent = buildSensorIcon(sensorType)
            setSensorIcon(<FunctionComponent />)
        }
    }

    const Icon: any = sensorIcon

    return (
        <div className="sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                {device && <SensorForm updateIcon={updateSensorIcon} device={device} />}
            </div>

        </div>

    )
}