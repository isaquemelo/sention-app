import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { ReactComponent as ActuatorIcon } from '@images/actuator.svg';


import "./style.scss";

import ShortHeader from "../../components/ShortHeader";
import { ReactComponent as AddIcon } from '@images/plus-circle.svg';
import Actuator, { default as ActuatorType } from "../../types/Actuator";
import { getDevice } from "../../services/devices/getDevice";
import ActuatorForm from "../../components/ActuatorForm";
import { getActuator } from "../../services/actuators/getActuator";
import { updateActuator } from "../../services/actuators/updateActuator";
import Typography from "../../components/Typography";
import ListTriggers from "../../components/ListTriggers";
import ActuatorTrigger from "../../types/ActuatorTrigger";
import messages from "../../constants/messages";

type Props = {

}

type StructedFormData = { name: string, type: string, port: number }

export default function ViewActuator({ }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { actuatorId = "" } = useParams()
    const { isLoading, data: actuator } = useQuery(["actuator", actuatorId], () => getActuator(actuatorId))
    const { isLoading: isLoadingDevice, data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : undefined)

    const pageTitle = isLoading || !actuator ? "Loading..." : actuator.name

    const { mutate: saveActuator } = useMutation(
        (event: StructedFormData) => {
            console.log(event)
            return updateActuator(new Actuator({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["device", device!.id]);
                await queryClient.invalidateQueries(["actuator", actuatorId])
                alert(messages.REBOOT_TO_APPLY_CHANGES)
            }
        }
    )

    return (
        <div className="view-actuator">
            <ShortHeader title={pageTitle} icon={<ActuatorIcon />} />

            <div className="container page">
                {actuator && device &&
                    <>
                        <ActuatorForm device={device} actuator={actuator} submitForm={saveActuator} />

                        {actuator.triggers &&
                            <div className="actuator-triggers">
                                <div className="actuator-triggers-heading">
                                    <Typography className="actuator-triggers__title" type="title" size="m">Actuator triggers</Typography>
                                    <button onClick={() => { navigate(`/actuators/${actuator.id}/trigger/create`) }}>
                                        <AddIcon />
                                    </button>
                                </div>

                                <ListTriggers triggers={actuator.triggers as ActuatorTrigger[]} />
                            </div>
                        }
                    </>
                }
            </div>

        </div>

    )
}