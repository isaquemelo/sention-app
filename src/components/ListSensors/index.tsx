import { useNavigate } from "react-router-dom";
import buildSensorIcon from "../../builders/buildSensorIcon";
import Sensor from "../../types/Sensor";
import ListItem from "../ListItem";

type Props = {
    sensors: Sensor[]
}

export default function ListSensors({ sensors }: Props) {
    const navigate = useNavigate();

    return (
        <>
            {
                sensors.map(sensor => {
                    const SensorIcon = buildSensorIcon(sensor.type)

                    return <ListItem
                        key={sensor.id}
                        icon={<SensorIcon />}
                        label={sensor.name}
                        options={[
                            {
                                label: "Edit sensor",
                                onClick: () => {
                                    navigate(`/sensors/${sensor.id}`)
                                },
                            },
                            {
                                label: "Delete sensor",
                                onClick: () => {
                                    // Trigger device mutation
                                    console.log("Delete sensor")
                                }
                            }]}
                        onItemClick={
                            () => {
                                navigate(`/sensors/${sensor.id}`)
                            }
                        }
                    />
                })
            }
        </>
    )
}