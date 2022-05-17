import sensorSchemas from "../constants/sensorSchemas"
import NotificationTrigger from "./NotificationTrigger"

const allTypes = sensorSchemas.map(schema => schema.id)[0]
type types = typeof allTypes

export default class Sensor {
    id: string
    name: string
    type: types
    port: object
    notificationTriggers?: NotificationTrigger[]
    createdAt?: Date
    updatedAt?: Date

    constructor(props: Sensor) {
        Object.assign(this, props)
    }
}
