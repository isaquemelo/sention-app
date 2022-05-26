import client from "../../axios/client";
import resources from '../../constants/resources'

export function deleteTrigger(notificationTriggerId: string): Promise<any> {
    return client.delete(resources.DELETE_NOTIFICATION_TRIGGER.replace('$triggerId', notificationTriggerId))
}
