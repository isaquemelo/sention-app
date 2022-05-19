import client from "../../axios/client";
import resources from '../../constants/resources'
import Actuator from "../../types/Actuator";

export function getActuator(actuatorId: string): Promise<Actuator> {
    return client.get(resources.GET_ACTUATOR.replace('$actuatorId', actuatorId)).then(({ data: actuator }: { data: Actuator }) => {
        return actuator;
    });
}
