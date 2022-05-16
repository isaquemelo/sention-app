import client from "../../axios/client";
import resources from '../../constants/resources'
import Device from "../../types/Device";

export function getDevices(userId: string): Promise<Device[]> {
    type Data = {
        devices: Device[],
    }

    console.log("getDevices", client.defaults)

    return client.get(resources.GET_USER + `/${userId}`).then(({ data }: { data: Data }) => {
        return data.devices;
    });
}
