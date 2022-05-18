import urls from './urls';

const resources = {
    'AUTH_USER': `${urls.SENTION_API_BASE}/auth/user`,

    'GET_USER': `${urls.SENTION_API_BASE}/user/$userId`,
    'GET_DEVICE': `${urls.SENTION_API_BASE}/user/devices/$deviceId`,
    'GET_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId`,

    'DELETE_DEVICE': `${urls.SENTION_API_BASE}/user/devices/dissociate/$deviceId`,
    'DELETE_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId`,
    'DELETE_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/actuators/$actuatorId`,

    'CREATE_SENSOR': `${urls.SENTION_API_BASE}/user/devices/$deviceId/sensors`,
    'CREATE_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/$deviceId/actuators`,
}

export default resources;
