import urls from './urls';

const pins = {
    'GPIO_PINS': [
        0, 2, 4, 5, 12, 13, 14, 15, 21, 22, 25, 26, 27, 32, 33, 34, 35, 36, 39
    ],

    // https://docs.micropython.org/en/latest/esp32/quickref.html
    // Some pins are blocked due to the wifi conection
    'ADC_PINS': [32, 33, 34, 35, 36, 39]

}

export default pins;
