import pins from './pins';

const sensorSchemas = [
    {
        'id': `BMP280`,
        'label': 'BMP280',
        'port': {
            'multiplePort': true,
            'meta': [
                {
                    'id': 'SDA',
                    'label': 'SDA',
                    'defaultValue': 22,
                },

                {
                    'id': 'SCL',
                    'label': 'SCL or SCK',
                    'defaultValue': 21,
                },
            ],

            // 'supportedPorts': pins.ADC_PINS
            'supportedPorts': [22, 21]
        }
    },

    {
        'id': `ANALOGIC`,
        'label': 'Generic analogic reading',
        'port': {
            'multiplePort': false,
            'supportedPorts': pins.ADC_PINS
        }
    },

    {
        'id': `DIGITAL`,
        'label': 'Digital reading',
        'port': {
            'multiplePort': false,
            'supportedPorts': pins.ADC_PINS
        }
    }
]

export default sensorSchemas;