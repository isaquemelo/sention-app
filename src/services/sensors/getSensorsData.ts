import client from "../../axios/client";
import resources from '../../constants/resources'
import SensorData from "../../types/SensorData";
import { getSensorData } from "./getSensorData";


export async function getSensorsData(sensorIds: string[], date: Date = new Date()): Promise<SensorData[]> {
    const promises = sensorIds.map(async (sensorId): Promise<SensorData> => {
        const data = await getSensorData(sensorId, 1, date)
        return data[0]
    })

    let allData: SensorData[] = await Promise.all(promises)
    allData = allData.filter(data => data !== undefined)

    return allData;
}
