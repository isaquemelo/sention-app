import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as TemperatureIcon } from '@images/sensor-icons/temperature.svg';
import { ReactComponent as LightSensor } from '@images/sensor-icons/light.svg';
// import sentionLogo from "@images/sention-logo.svg";
// import Button from "../../components/Button";
// import TextField from "../../components/TextField";

import "./style.scss";

import { ReactComponent as EditIcon } from '@images/edit.svg';
import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";
import { useQuery } from "react-query";
import { getDevices } from "../../services/devices/getDevices";
import useSessionStorage from "../../hooks/useLocalStorage";
import FloatingButton from "../../components/FloatingButton";
import ShortHeader from "../../components/ShortHeader";
import ListActuators from "../../components/ListActuators";

export default function Actuators() {
    const navigate = useNavigate();

    const [userId] = useSessionStorage('userId', false)
    const { isLoading, data: devices } = useQuery("devices", () => getDevices(userId))

    const skeletonArray = new Array(15).fill(0)

    return (
        <>
            <ShortHeader title="Actuators" />

            <div className="actuators">
                <div className="container page">
                    <div className="actuators-list">
                        {!isLoading &&
                            devices?.map(device => {
                                const shouldBeRendered = (device.actuators.length >= 1)
                                return shouldBeRendered && (
                                    <div key={device.id}>
                                        <div className="heading">
                                            <Typography className="device-name" type="title" size="m">{device.name && device.name.length ? device.name : device.accessCode}</Typography>
                                            <button onClick={() => navigate(`/devices/${device.id}`)}>
                                                <EditIcon />
                                            </button>
                                        </div>

                                        <div className="list-actuators">
                                            {/* <Typography className="sensor-name" type="body" size="m">Actuators</Typography> */}
                                            <ListActuators actuators={device.actuators} />
                                        </div>
                                    </div>
                                )
                            })
                        }

                        {isLoading &&
                            skeletonArray.map(({ value }, index) => {
                                return <ListItem key={"key" + index} label={""} isSkeleton={true} />
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}