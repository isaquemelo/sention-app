import client from "../../axios/client";
import resources from '../../constants/resources'
import Actuator from "../../types/Actuator";

export function createActuator(deviceId: string, actuator: Actuator): Promise<Actuator> {
    return client.post(resources.CREATE_ACTUATOR.replace('$deviceId', deviceId), {
        ...actuator,
    })
}
