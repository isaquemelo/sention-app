import client from "../../axios/client";
import resources from '../../constants/resources'
import NotificationTrigger from "../../types/NotificationTrigger";


export function getNotificationTrigger(notificationTriggerId: string): Promise<NotificationTrigger> {
    return client.get(resources.GET_SENSOR.replace('$triggerId', notificationTriggerId)).then(({ data: notificationTrigger }: { data: NotificationTrigger }) => {
        return notificationTrigger;
    });
}
