import client from "../../axios/client";
import resources from '../../constants/resources'
import Actuator from "../../types/Actuator";

export function updateActuator(actuatorId: string): Promise<Actuator> {
    return client.get(resources.UPDATE_ACTUATOR.replace('$actuatorId', actuatorId)).then(({ data: actuator }: { data: Actuator }) => {
        return actuator;
    });
}
