import pins from './pins';

const actuatorSchemas = [
    {
        'id': `DIGITAL`,
        'label': 'Digital writing',
        'port': {
            'supportedPorts': pins.GPIO_PINS
        }
    }
]

export default actuatorSchemas;
