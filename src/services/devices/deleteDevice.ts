import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function deleteDevice(deviceId: string): Promise<Device> {
    return client.delete(resources.DELETE_DEVICE.replace('$deviceId', deviceId))
}
