import pins from './pins';

const sensorSchemas = [
    {
        'id': `BMP280`,
        'label': 'BMP280',
        'port': {
            'multiplePort': true,
            'sources': [
                {
                    'id': 'TEMPERATURE',
                    'label': 'Temperature',
                    'unit': '°C'
                },

                {
                    'id': 'PRESSURE',
                    'label': 'Air pressure',
                    'unit': 'Pa'
                },
                {
                    'id': 'ALTITUDE',
                    'label': 'Altitude',
                    'unit': 'm'
                },
            ],
            'meta': [
                {
                    'id': 'SDA',
                    'label': 'SDA',
                    'defaultValue': 22,
                },

                {
                    'id': 'SLC',
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
            // Some pins are blocked due to wifi network (check ADC pins in the doc)
            // https://docs.micropython.org/en/latest/esp32/quickref.html#adc-analog-to-digital-conversion
            'supportedPorts': [32, 33, 34, 35, 36, 39]
        }
    },

    {
        'id': `DIGITAL`,
        'label': 'Digital reading',
        'port': {
            'multiplePort': false,
            // https://docs.micropython.org/en/latest/esp32/quickref.html#pins-and-gpio
            'supportedPorts': [0, 2, 4, 5, 12, 13, 14, 15, 21, 22, 25, 26, 27, 32, 33, 34, 35, 36, 39]
        }
    }
]

export default sensorSchemas;
