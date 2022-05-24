import Actuator from "../types/Actuator";
import Device from "../types/Device";
import Sensor from "../types/Sensor";

export default function deviceToUsedPorts(device: Device, ignoredPorts: object | number | false | string): number[] {
    const usedPorts: number[] = []

    const sensors = device.sensors;
    const actuators = device.actuators;

    const addPortsToUsedPorts = (entity: Sensor | Actuator) => {
        const ports = entity.port
        const portsType = typeof ports

        // Multiple port sensor type
        if (portsType === 'object') {
            Object.keys(ports).forEach(key => {
                const port = <number>(ports as any)[key]

                if ((ignoredPorts as any)[key] === port) return
                usedPorts.push(port)
            })
        } else if (portsType === 'number') {
            if (ignoredPorts === ports) return

            usedPorts.push(parseInt(<string>ports))
        }

    }

    sensors.forEach(addPortsToUsedPorts)
    actuators.forEach(addPortsToUsedPorts)

    return usedPorts
}
