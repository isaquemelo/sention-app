import client from "../../axios/client";
import resources from '../../constants/resources'
import SensorData from "../../types/SensorData";


export function getSensorData(sensorId: string, page: number, date: Date): Promise<SensorData[]> {
    const url = new URL(resources.GET_SENSOR_DATA.replace('$sensorId', sensorId))
    url.searchParams.set('page', page.toString())
    url.searchParams.set('day', date.toISOString().split('T')[0] + 'T00:00:00.000Z')
    console.log(url.href)

    return client.get(url.href).then(({ data: sensorData }: { data: SensorData[] }) => {
        return sensorData;
    });
}
