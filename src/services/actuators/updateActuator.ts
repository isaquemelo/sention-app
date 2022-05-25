import client from "../../axios/client";
import resources from '../../constants/resources'
import Actuator from "../../types/Actuator";

export function updateActuator(actuator: Actuator): Promise<Actuator> {
    return client.put(resources.GET_ACTUATOR.replace('$actuatorId', actuator.id!), {...actuator})
}
