import client from "../../axios/client";
import resources from '../../constants/resources'
import Actuator from "../../types/Actuator";

// THIS IS NOT DONE! TODO

export function getActuator(actuatorId: string): Promise<Actuator> {
    return client.get(resources.GET_DEVICE + `/${actuatorId}`).then(({ data: device }: { data: Device }) => {
        return device;
    });
}
