import { ReactComponent as AnalogicIcon } from '@images/sensor-icons/analogic.svg'
import { ReactComponent as DigitalIcon } from '@images/sensor-icons/digital.svg'
import { ReactComponent as BMP280 } from '@images/sensor-icons/temperature.svg'
import { FunctionComponent, ReactComponentElement } from 'react'
import Sensor from '../types/Sensor'

const map = {
    'ANALOGIC': AnalogicIcon,
    'DIGITAL': DigitalIcon,
    'BMP280': BMP280,
}

export default function buildSensorIcon(sensorType: Sensor['type']): FunctionComponent {
    const component = map[sensorType]
    return component
}
