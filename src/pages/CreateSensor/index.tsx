import { ReactChild, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as UnknownTypeIcon } from '@images/unknown-type.svg';


import "./style.scss";

import FloatingButton from "../../components/FloatingButton";
import ShortHeader from "../../components/ShortHeader";

import { default as SensorType } from "../../types/Sensor";
import { getSensor } from "../../services/sensors/getSensor";
import { getDevice } from "../../services/devices/getDevice";
import SensorForm from "../../components/SensorForm";
import buildSensorIcon from "../../builders/buildSensorIcon";

type Props = {

}

export default function CreateSensor({ }: Props) {
    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const [sensorIcon, setSensorIcon] = useState<React.FunctionComponent>(UnknownTypeIcon)

    // const { mutate: removeDevice } = useMutation(
    //     () => {
    //         return deleteDevice(deviceId)
    //     },
    //     {
    //         onSuccess: async () => {
    //             await queryClient.invalidateQueries("devices");
    //             navigate('../devices')
    //         }
    //     }
    // );
    const pageTitle = "New sensor" // || the sensor name create

    const updateSensorIcon = (sensorType: SensorType['type']) => {
        if (sensorType) {
            const Icon = buildSensorIcon(sensorType)
            setSensorIcon(Icon)
        }
    }

    const Icon: React.FunctionComponent = sensorIcon

    return (
        <div className="sensor">
            <ShortHeader title={pageTitle} icon={Icon} />

            <div className="container page">
                <SensorForm updateIcon={updateSensorIcon} />

                <FloatingButton options={[
                    {
                        label: 'Add new sensor',
                        onClick: () => navigate('sensor')
                    },

                    {
                        label: 'Add new actuator',
                        onClick: () => navigate('actuator')
                    },
                ]} />
            </div>

        </div>

    )
}