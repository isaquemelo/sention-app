import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function getDevices(userId: string): Promise<Device[]> {
    type Data = {
        devices: Device[],
    }

    return client.get(resources.GET_USER.replace('$userId', userId)).then(({ data }: { data: Data }) => {
        return data.devices;
    });
}
