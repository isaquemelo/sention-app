export default class SensorData {
    id?: string
    sensorId: string
    data: object
    createdAt: Date

    constructor(props: SensorData) {
        Object.assign(this, props)
    }
}
