import client from "../../axios/client";
import resources from '../../constants/resources'
import ActuatorTrigger from "../../types/ActuatorTrigger";

export function getTrigger(actuatorTriggerId: string): Promise<any> {
    return client.get(resources.GET_ACTUATOR_TRIGGER.replace('$triggerId', actuatorTriggerId)).then(({ data: actuatorTrigger }: { data: ActuatorTrigger }) => {
        return actuatorTrigger;
    });
}
