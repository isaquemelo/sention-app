import client from "../../axios/client";
import resources from '../../constants/resources'
import NotificationTrigger from "../../types/NotificationTrigger";

export function createNotificationTrigger(sensorId: string, notificationTrigger: NotificationTrigger): Promise<NotificationTrigger> {
    return client.post(resources.CREATE_NOTIFICATION_TRIGGER.replace('$sensorId', sensorId), {
        ...notificationTrigger,
    })
}
