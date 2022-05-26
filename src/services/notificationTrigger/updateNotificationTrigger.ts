import client from "../../axios/client";
import resources from '../../constants/resources'
import NotificationTrigger from "../../types/NotificationTrigger";
import Sensor from "../../types/Sensor";

export function updateNotificationTrigger(notificationTrigger: NotificationTrigger): Promise<NotificationTrigger> {
    return client.put(resources.GET_NOTIFICATION_TRIGGER.replace('$triggerId', notificationTrigger.id!), { ...notificationTrigger })
}
