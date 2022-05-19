import ActuatorTrigger from './ActuatorTrigger'

export default class Actuator {
    id?: string
    name: string
    type: string
    port: number
    deviceId?: string
    triggers?: ActuatorTrigger[]
    createdAt?: Date

    constructor(props: Actuator) {
        Object.assign(this, props)
    }
}
