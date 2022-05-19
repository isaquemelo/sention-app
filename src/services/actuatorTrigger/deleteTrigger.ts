import client from "../../axios/client";
import resources from '../../constants/resources'

export function deleteTrigger(actuatorTriggerId: string): Promise<any> {
    return client.delete(resources.DELETE_ACTUATOR_TRIGGER.replace('$triggerId', actuatorTriggerId))
}
