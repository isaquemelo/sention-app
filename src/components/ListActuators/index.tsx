import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { deleteActuator } from "../../services/actuators/deleteActuator";
import Actuator from "../../types/Actuator";

import ListItem from "../ListItem";

type Props = {
    actuators: Actuator[]
}

export default function ListActuators({ actuators }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()

    const { mutate: removeActuator } = useMutation(
        (actuatorId: string) => {
            return deleteActuator(actuatorId)
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries("device");
            }
        }
    );

    return (
        <>
            {
                actuators.map(({ id = "", name }) => {
                    return <ListItem
                        key={id}
                        label={name}
                        options={[
                            {
                                label: "Edit actuator",
                                onClick: () => {
                                    navigate(`/actuators/${id}`)
                                },
                            },
                            {
                                label: "Delete actuator",
                                onClick: () => {
                                    // Trigger device mutation
                                    removeActuator(id)
                                }
                            }]}
                        onItemClick={
                            () => {
                                navigate(`/actuators/${id}`)
                            }
                        }
                    />
                })
            }
        </>
    )
}