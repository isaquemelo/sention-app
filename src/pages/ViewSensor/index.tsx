import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import Sensor, { default as SensorType } from "../../types/Sensor";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";
import { getSensor } from "../../services/sensors/getSensor";
import { getDevice } from "../../services/devices/getDevice";
import sensorSchemas from "../../constants/sensorSchemas";
import { updateSensor } from "../../services/sensors/updateSensor";

type Props = {

}

type StructedFormData = { name: string, type: string, port: string | number | object }


export default function ViewSensor({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { sensorId = "" } = useParams();
    const { isLoading, data: sensor } = useQuery(["sensor", sensorId], () => getSensor(sensorId))
    const { isLoading: isLoadingDevice, data: device } = useQuery(["device", sensor?.deviceId], () => sensor && sensor.deviceId ? getDevice(sensor.deviceId) : undefined)

    const { mutate: saveSensor } = useMutation(
        (event: StructedFormData) => {
            return updateSensor(new Sensor({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["device", device!.id]);
                await queryClient.invalidateQueries(["sensor", sensorId]);
            }
        }
    );


    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const pageTitle = isLoading || !sensor ? "Loading..." : sensor.name

    const updateSensorIcon = (sensorType: SensorType['type']) => {
        if (sensorType) {
            const FunctionComponent = buildSensorIcon(sensorType)
            setSensorIcon(<FunctionComponent />)
        }
    }

    const Icon: any = sensorIcon

    return (
        <div className="view-sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                {sensor && device && <SensorForm updateIcon={updateSensorIcon} device={device} sensor={sensor} submitForm={saveSensor} />}
            </div>

        </div>

    )
}