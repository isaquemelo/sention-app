import client from "../../axios/client";
import resources from '../../constants/resources'
import ActuatorTrigger from "../../types/ActuatorTrigger";

export function updateTrigger(actuatorTrigger: ActuatorTrigger): Promise<ActuatorTrigger> {
    return client.put(resources.GET_ACTUATOR_TRIGGER.replace('$triggerId', actuatorTrigger.id!), {...actuatorTrigger})
}