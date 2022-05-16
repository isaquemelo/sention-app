import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReactComponent as BoxIcon } from '@images/box.svg';
import { ReactComponent as DeviceIcon } from '@images/device.svg';


import "./style.scss";

import ListItem from "../../components/ListItem";
import Typography from "../../components/Typography";
import { useMutation, useQuery, useQueryClient } from "react-query";
import useSessionStorage from "../../hooks/useLocalStorage";

import numbers from "../../constants/numbers";
import { getDevice } from "../../services/devices/getDevice";
import ListSensors from "../../components/ListSensors";
import Sensor from "../../types/Sensor";
import Actuator from "../../types/Actuator";
import ListActuators from "../../components/ListActuators";
import FloatingButton from "../../components/FloatingButton";
import ShortHeader from "../../components/ShortHeader";
import { deleteDevice } from "../../services/devices/deleteDevice";

export default function Device() {
    const { deviceId = "" } = useParams();
    const { isLoading, data: device } = useQuery(["device", deviceId], () => getDevice(deviceId))

    const queryClient = useQueryClient()
    const navigate = useNavigate();

    const { mutate: removeDevice } = useMutation(
        () => {
            return deleteDevice(deviceId)
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("devices");
                navigate('../devices')
            }
        }
    );


    const sensors: Sensor[] = device?.sensors || []
    const actuators: Actuator[] = device?.actuators || []

    const skeletonArray = new Array(15).fill(0)

    return (
        <div className="device">
            <ShortHeader title={device ? device.name ?? device.accessCode : "Loading..."} icon={<DeviceIcon />} options={[{
                label: "Delete device", onClick: () => {
                    removeDevice()
                }
            }]} />

            <div className="container page">
                {/* <Typography type="title" size="l">{`Device ${device?.accessCode ?? ""}`}</Typography> */}

                {sensors.length > 0 &&
                    <div className="sensors-list">
                        <Typography type="title" size="m">Sensors</Typography>

                        {!isLoading && <ListSensors sensors={sensors} />}

                        {isLoading &&
                            skeletonArray.map(({ value, index }) => {
                                return <ListItem key={index} label={index} isSkeleton={true} />
                            })
                        }
                    </div>
                }

                {actuators.length > 0 &&
                    <div className="actuators-list">
                        <Typography type="title" size="m">Acutators</Typography>

                        {!isLoading &&
                            <ListActuators actuators={actuators} />
                        }

                        {isLoading &&
                            skeletonArray.map(({ value, index }) => {
                                return <ListItem key={index} label={index} isSkeleton={true} />
                            })
                        }
                    </div>
                }

                {!isLoading && !sensors.length && !actuators.length &&
                    <div className="no-results">
                        <BoxIcon />
                        <Typography type="body" alignment="center" size="l">Nothing here yet</Typography>
                        <Typography type="body" alignment="center" size="m">Click in the plus icon to add sensors and actuators to your device.</Typography>
                    </div>
                }

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