import Sensor from "../types/Sensor";

export default function sensorsToUsedPorts(sensors: Sensor[]): number[] {
    const usedPorts: number[] = []

    sensors.forEach(sensor => {
        const ports = sensor.port
        const portsType = typeof ports

        // Multiple port sensor type
        if (portsType === 'object') {
            Object.keys(ports).forEach(key => {
                const port = <number>(ports as any)[key]
                usedPorts.push(port)
            })
        } else if (portsType === 'number') {
            usedPorts.push(parseInt(<string>ports))
        }

    })

    return usedPorts
}
