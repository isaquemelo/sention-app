import pins from './pins';

const actuatorSchemas = [
    {
        'id': `DIGITAL`,
        'label': 'Digital writing',
        'port': {
            'multiplePort': false,
            'supportedPorts': pins.ADC_PINS
        }
    }
]

export default actuatorSchemas;