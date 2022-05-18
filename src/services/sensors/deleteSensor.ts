import client from "../../axios/client";
import resources from '../../constants/resources'

export function deleteSensor(sensorId: string): Promise<any> {
    return client.delete(resources.DELETE_SENSOR.replace('$sensorId', sensorId))
}
