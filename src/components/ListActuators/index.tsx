import { useNavigate } from "react-router-dom";
import Actuator from "../../types/Actuator";

import ListItem from "../ListItem";

type Props = {
    actuators: Actuator[]
}

export default function ListActuators({ actuators }: Props) {
    const navigate = useNavigate();

    return (
        <>
            {
                actuators.map(({ id, name }) => {
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
                                    console.log("Delete actuator")
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