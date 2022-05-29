import urls from './urls';

const resources = {
    'AUTH_USER': `${urls.SENTION_API_BASE}/auth/user`,

    'GET_USER': `${urls.SENTION_API_BASE}/user/$userId`,
    'GET_DEVICE': `${urls.SENTION_API_BASE}/user/devices/$deviceId`,
    'GET_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId`,
    'GET_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/actuators/$actuatorId`,
    'GET_NOTIFICATION_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/sensors/notificationTrigger/$triggerId`,
    'GET_ACTUATOR_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/actuators/trigger/$triggerId`,
    'GET_SENSOR_DATA': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId/data`,

    'DELETE_DEVICE': `${urls.SENTION_API_BASE}/user/devices/dissociate/$deviceId`,
    'DELETE_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId`,
    'DELETE_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/actuators/$actuatorId`,
    'DELETE_ACTUATOR_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/actuators/trigger/$triggerId`,
    'DELETE_NOTIFICATION_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/sensors/notificationTrigger/$triggerId`,

    'CREATE_SENSOR': `${urls.SENTION_API_BASE}/user/devices/$deviceId/sensors`,
    'CREATE_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/$deviceId/actuators`,
    'UPDATE_ACTUATOR': `${urls.SENTION_API_BASE}/user/devices/actuators/$actuatorId`,
    'CREATE_ACTUATOR_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/actuators/$actuatorId/trigger`,
    'CREATE_NOTIFICATION_TRIGGER': `${urls.SENTION_API_BASE}/user/devices/sensors/$sensorId/notificationTrigger`,
}

export default resources;
