import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import buildSensorIcon from "../../builders/buildSensorIcon";
import { deleteSensor } from "../../services/sensors/deleteSensor";
import Sensor from "../../types/Sensor";
import ListItem from "../ListItem";

type Props = {
    sensors: Sensor[]
}

export default function ListSensors({ sensors }: Props) {
    const navigate = useNavigate();
    const queryClient = useQueryClient()


    const { mutate: removeSensor } = useMutation(
        (sensorId: string) => {
            return deleteSensor(sensorId)
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
                sensors.map((sensor: Sensor) => {
                    const SensorIcon = buildSensorIcon(sensor.type)

                    return <ListItem
                        key={sensor.id}
                        icon={SensorIcon && <SensorIcon />}
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
                                    removeSensor(sensor.id ?? "")
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