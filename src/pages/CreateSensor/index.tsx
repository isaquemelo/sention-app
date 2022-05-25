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

export default function CreateSensor({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const [sensorIcon, setSensorIcon] = useState<any>(UnknownTypeIcon)

    const { mutate: newSensor } = useMutation(
        (event: { data: { name: string, type: string, port: string | number }, sensorSchema: typeof sensorSchemas[number] }) => {
            const { data: { name, port, type }, sensorSchema } = event;

            const isMultiplePort = sensorSchema?.port.multiplePort ?? false
            const multiplePorts: any = {}

            if (sensorSchema && sensorSchema.port.meta && isMultiplePort) {
                sensorSchema.port.meta.forEach(({ id }) => {
                    //@ts-ignore
                    multiplePorts[id] = event.data[`port-${id}`];
                })
            }

            return createSensor(device!.id, new Sensor({
                name,
                port: isMultiplePort ? multiplePorts : port,
                type,
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
                {device && <SensorForm updateIcon={updateSensorIcon} device={device} submitForm={(data, sensorSchema) => newSensor({ data, sensorSchema })} />}
            </div>

        </div>

    )
}