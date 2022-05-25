import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";

import Sensor, { default as SensorType } from "../../types/Sensor";
import { getDevice } from "../../services/devices/getDevice";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";
import { createSensor } from "../../services/sensors/createSensor";
import sensorSchemas from "../../constants/sensorSchemas";

type Props = {

}

type StructedFormData = { name: string, type: string, port: string | number | object }

export default function CreateSensor({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const { mutate: newSensor } = useMutation(
        (event: StructedFormData) => {
            return createSensor(device!.id, new Sensor({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries(["device", device!.id]);
                navigate(`/devices/${device!.id}`)
            }
        }
    );

    const pageTitle = "New sensor" // || the sensor name create

    const updateSensorIcon = (sensorType: SensorType['type']) => {
        if (sensorType) {
            const FunctionComponent = buildSensorIcon(sensorType)
            setSensorIcon(<FunctionComponent />)
        }
    }

    const Icon: any = sensorIcon

    return (
        <div className="create-sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                {device && <SensorForm updateIcon={updateSensorIcon} device={device} submitForm={newSensor} />}
            </div>

        </div>

    )
}