import client from "../../axios/client";
import resources from '../../constants/resources'
import ActuatorTrigger from "../../types/ActuatorTrigger";

export function createTrigger(actuatorId: string, actuatorTrigger: ActuatorTrigger): Promise<ActuatorTrigger> {
    return client.post(resources.CREATE_ACTUATOR_TRIGGER.replace('$actuatorId', actuatorId), {
        ...actuatorTrigger,
    })
}
