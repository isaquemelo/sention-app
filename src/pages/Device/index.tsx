import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as TemperatureIcon } from '@images/sensor-icons/temperature.svg';
import { ReactComponent as LightSensor } from '@images/sensor-icons/light.svg';
// import sentionLogo from "@images/sention-logo.svg";
// import Button from "../../components/Button";
// import TextField from "../../components/TextField";

import "./style.scss";

import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";
import { useQuery } from "react-query";
import useSessionStorage from "../../hooks/useLocalStorage";

import numbers from "../../constants/numbers";
import { getDevice } from "../../services/devices/getDevice";
import ListSensors from "../../components/ListSensors";
import Sensor from "../../types/Sensor";
import Actuator from "../../types/Actuator";

export default function Devices() {

    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const sensors: Sensor[] = device?.sensors || []
    const actuators: Actuator[] = device?.actuators || []

    const skeletonArray = new Array(15).fill(0)

    return (
        <div className="devices">
            <div className="container page">
                <Typography type="title" size="l">{`Device ${device?.accessCode}`}</Typography>

                <div className="sensors-list">
                    <Typography type="title" size="m">Sensors</Typography>

                    {!isLoading && <ListSensors sensors={sensors} />}

                    {isLoading &&
                        skeletonArray.map(({ value, index }) => {
                            return <ListItem key={index} label={index} isSkeleton={true} />
                        })
                    }
                </div>

                <div className="actuators-list">
                    {!isLoading &&
                        device?.actuators?.map(actuator => {
                            return <ListItem
                                key={actuator.id}
                                label={actuator.name}
                                options={[{
                                    label: "Option 1", onClick: () => {
                                        console.log("Click inside option")
                                    }
                                }]}
                                onItemClick={
                                    () => {
                                        navigate(`/actuators/${actuator.id}`)
                                    }
                                }
                            />
                        })
                    }
                </div>
            </div>

        </div>

    )
}