import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function getDevice(deviceId: string): Promise<Device> {
    return client.get(resources.GET_DEVICE.replace('$deviceId', deviceId)).then(({ data: device }: { data: Device }) => {
        return device;
    });
}
