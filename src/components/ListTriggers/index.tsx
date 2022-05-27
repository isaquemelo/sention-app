import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteTrigger as deleteActuatorTrigger } from "../../services/actuatorTrigger/deleteTrigger";
import { deleteTrigger as deleteNotificationTrigger } from "../../services/notificationTrigger/deleteNotificationTrigger";
import ActuatorTrigger from "../../types/ActuatorTrigger";
import NotificationTrigger from "../../types/NotificationTrigger";
import ListItem from "../ListItem";

type Props = {
    triggers: NotificationTrigger[] | ActuatorTrigger[]
}

export default function ListTriggers({ triggers }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    // @ts-ignore
    const isNotificationTrigger = (trigger: ActuatorTrigger | NotificationTrigger) => trigger.content ? true : false;

    const { mutate: removeTrigger } = useMutation(
        (trigger: ActuatorTrigger | NotificationTrigger) => {
            if (isNotificationTrigger(trigger)) {
                return deleteNotificationTrigger(trigger.id!)
            }

            return deleteActuatorTrigger(trigger.id!)

        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("sensor");
            }
        }
    );

    return (
        <>
            {
                triggers.map((trigger: NotificationTrigger | ActuatorTrigger) => {
                    return <ListItem
                        key={trigger.id}
                        // icon={SensorIcon && <SensorIcon />}
                        label={trigger.name}
                        options={[
                            {
                                label: "Edit trigger",
                                onClick: () => {
                                    navigate(isNotificationTrigger(trigger) ? `/sensors/notification/${trigger.id}` : '#other')
                                },
                            },
                            {
                                label: "Delete trigger",
                                onClick: () => {
                                    // Trigger mutation
                                    removeTrigger(trigger)
                                }
                            }]}
                        onItemClick={
                            () => {
                                navigate(isNotificationTrigger(trigger) ? `/sensors/notification/${trigger.id}` : '#other')
                            }
                        }
                    />
                })
            }
        </>
    )
}