import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";
import Sensor from "../../types/Sensor";

export function createSensor(deviceId: string, sensor: Sensor): Promise<Sensor> {
    return client.post(resources.CREATE_SENSOR.replace('$deviceId', deviceId), {
        ...sensor,
    })
}
