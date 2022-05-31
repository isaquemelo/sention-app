import { useMutation, useQuery, useQueryClient } from "react-query"
import { useNavigate, useParams } from "react-router-dom"
import ShortHeader from "../../components/ShortHeader"
import { getActuator } from "../../services/actuators/getActuator"
import { getTrigger } from "../../services/actuatorTrigger/getTrigger"
import { updateTrigger } from "../../services/actuatorTrigger/updateTrigger"
import ActuatorTrigger from "../../types/ActuatorTrigger"
import { ReactComponent as ActuatorTriggerIcon } from '@images/actuator-trigger.svg';
import ActuatorTriggerForm from "../../components/ActuatorTriggerForm"
import { getDevice } from "../../services/devices/getDevice"

type Props = {

}

type StructuredFormData = {
    id?: string
    name: string
    action: string
    logicOperator: string
    value: number
    description: string
    sensorId: string
    dataSource?: string
}

export default function ViewActuatorTrigger({}: Props){
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const {triggerId = ""} = useParams();
    const {isLoading, data: actuatorTrigger} = useQuery(["actuatorTrigger", triggerId], () => getTrigger(triggerId))
    const {isLoading: isLoadingActuator, data: actuator} = useQuery(["actuator", actuatorTrigger?.actuatorId], () => actuatorTrigger && actuatorTrigger.actuatorId ? getActuator(actuatorTrigger.actuatorId) : undefined)
    const { data: device } = useQuery(["device", actuator?.deviceId], () => actuator && actuator.deviceId ? getDevice(actuator.deviceId) : undefined)


    const {mutate: saveActuatorTrigger} = useMutation(
        (event: StructuredFormData) => {
            return updateTrigger(new ActuatorTrigger({
                ...event
            }))
        },
        {
            onSuccess: async () => {
                queryClient.invalidateQueries(["actuatorTrigger", actuatorTrigger!.id])
                await queryClient.invalidateQueries(["actuator", actuatorTrigger!.actuatorId])
                navigate(`/actuators/${actuatorTrigger?.actuatorId}`)
            }
        }
    )

    const pageTitle = isLoading || !actuatorTrigger ? "Loading..." : actuatorTrigger.name

    return(
        <div className="view-actuator">
            <ShortHeader title={pageTitle} icon={<ActuatorTriggerIcon />} />

            <div className="container page">
                {actuatorTrigger && actuator && device &&
                    <>
                        <ActuatorTriggerForm sensors={device.sensors} actuatorTrigger={actuatorTrigger} submitForm={saveActuatorTrigger}/>
                    </>
                }

            </div>

        </div>

    )
}