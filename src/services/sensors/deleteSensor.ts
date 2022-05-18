import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function deleteSensor(sensorId: string): Promise<Device> {
    return client.delete(resources.DELETE_SENSOR.replace('$sensorId', sensorId))
}
