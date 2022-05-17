import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ReactComponent as BoxIcon } from '@images/box.svg';
import { ReactComponent as DeviceIcon } from '@images/device.svg';


import "./style.scss";

import { getDevice } from "../../services/devices/getDevice";
import FloatingButton from "../../components/FloatingButton";
import ShortHeader from "../../components/ShortHeader";

import {default as ActuatorType} from "../../types/Actuator";

export default function Actuator() {
    const { actuatorId = "" } = useParams();
    const { isLoading, data: actuator } = useQuery(["actuator", actuatorId], () => getActuator(actuatorId))

    const queryClient = useQueryClient()
    const navigate = useNavigate();

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

    return (
        <div className="device">
            <ShortHeader title={device ? device.name ?? device.accessCode : "Loading..."} icon={<DeviceIcon />} options={[{
                label: "Delete device", onClick: () => {
                    removeDevice()
                }
            }]} />

            <div className="container page">
                <FloatingButton options={[
                    {
                        label: 'Add new sensor',
                        onClick: () => navigate('sensors')
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