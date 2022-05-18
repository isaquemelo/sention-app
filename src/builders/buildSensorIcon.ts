import { ReactComponent as AnalogicIcon } from '@images/sensor-icons/analogic.svg'
import { ReactComponent as DigitalIcon } from '@images/sensor-icons/digital.svg'
import { ReactComponent as BMP280 } from '@images/sensor-icons/temperature.svg'
import { FunctionComponent } from 'react'
import Sensor from '../types/Sensor'

const map = {
    'ANALOGIC': AnalogicIcon,
    'DIGITAL': DigitalIcon,
    'BMP280': BMP280,
}

export default function buildSensorIcon(sensorType: Sensor['type']): React.FunctionComponent<React.SVGProps<SVGSVGElement>> {
    const component = map[sensorType]
    return component
}
