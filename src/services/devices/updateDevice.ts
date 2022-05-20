import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function updateDevice(device: Device): Promise<Device> {
    return client.put(resources.GET_DEVICE.replace('$deviceId', device.id!), { name: device.name })
}
