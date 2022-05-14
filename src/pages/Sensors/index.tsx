import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as TemperatureIcon } from '@images/sensor-icons/temperature.svg';
import { ReactComponent as LightSensor } from '@images/sensor-icons/light.svg';
// import sentionLogo from "@images/sention-logo.svg";
// import Button from "../../components/Button";
// import TextField from "../../components/TextField";

import "./style.scss";
import Button from "../../components/Button";
import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getDevices } from "../../services/devices/getDevices";
import useSessionStorage from "../../hooks/useLocalStorage";
import FloatingButton from "../../components/FloatingButton";
import { deleteDevice } from "../../services/devices/deleteDevice";
import ShortHeader from "../../components/ShortHeader";
import ListSensors from "../../components/ListSensors";
import ListActuators from "../../components/ListActuators";

export default function Sensors() {
    const navigate = useNavigate();

    const [userId] = useSessionStorage('userId', false)
    const { isLoading, data: devices } = useQuery("devices", () => getDevices(userId))

    const queryClient = useQueryClient()

    const { mutate: removeDevice } = useMutation(
        (deviceId: string) => {
            return deleteDevice(deviceId)
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("devices");
            }
        }
    );

    const skeletonArray = new Array(15).fill(0)

    return (
        <>
            <ShortHeader title="Sensors" />

            <div className="sensors">
                <div className="container page">
                    <Typography type="title" size="l"></Typography>

                    <div className="sensors-list">
                        {!isLoading &&
                            devices?.map(device => {
                                const shouldBeRendered = (device.sensors.length >= 1)
                                return shouldBeRendered && (
                                    <>
                                        <Typography className="device-name" type="title" size="l">{device.accessCode}</Typography>

                                        <div className="list-sensors">
                                            {/* <Typography className="sensor-name" type="body" size="m">Sensors</Typography> */}
                                            <ListSensors sensors={device.sensors} />
                                        </div>
                                    </>
                                )
                            })
                        }

                        {isLoading &&
                            skeletonArray.map(({ value, index }) => {
                                return <ListItem key={index} label={index} isSkeleton={true} />
                            })
                        }
                    </div>
                </div>

                <FloatingButton options={[
                    {
                        label: 'Associate new device',
                        onClick: () => navigate('setup-device')
                    },
                ]} />

            </div>
        </>
    )
}