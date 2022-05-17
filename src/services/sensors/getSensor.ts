import client from "../../axios/client";
import resources from '../../constants/resources'
import Sensor from "../../types/Sensor";


export function getSensor(sensorId: string): Promise<Sensor> {
    return client.get(resources.GET_SENSOR + `/${sensorId}`).then(({ data: sensor }: { data: Sensor }) => {
        return sensor;
    });
}
