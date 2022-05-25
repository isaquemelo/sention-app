import client from "../../axios/client";
import resources from '../../constants/resources'
import Sensor from "../../types/Sensor";

export function updateSensor(sensor: Sensor): Promise<Sensor> {
    return client.put(resources.GET_SENSOR.replace('$sensorId', sensor.id!), { ...sensor })
}
