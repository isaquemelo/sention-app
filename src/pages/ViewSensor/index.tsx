import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";
import { getSensor } from "../../services/sensors/getSensor";
import { getDevice } from "../../services/devices/getDevice";

type Props = {

}

export default function ViewSensor({ }: Props) {
    const { sensorId = "" } = useParams();
    const { isLoading, data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))
    const { isLoading: isLoadingDevice, data: device } = useQuery(["device", sensor?.deviceId], () => sensor && sensor.deviceId ? getDevice(sensor.deviceId) : undefined)

    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const pageTitle = isLoading || !sensor ? "Loading..." : sensor.name

    const updateSensorIcon = (sensorType: SensorType['type']) => {
        if (sensorType) {
            const FunctionComponent = buildSensorIcon(sensorType)
            setSensorIcon(<FunctionComponent />)
        }
    }

    useEffect(() => {
        console.log("device", device)
    }, [device])

    const Icon: any = sensorIcon

    return (
        <div className="view-sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                {sensor && device && <SensorForm updateIcon={updateSensorIcon} device={device} sensor={sensor} submitForm={(data, schema) => { console.log("Fui chamdo ein", data, schema) }} />}
            </div>

        </div>

    )
}