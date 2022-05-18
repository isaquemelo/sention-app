import client from "../../axios/client";
import resources from '../../constants/resources'

export function deleteActuator(actuatorId: string): Promise<any> {
    return client.delete(resources.DELETE_ACTUATOR.replace('$actuatorId', actuatorId))
}
