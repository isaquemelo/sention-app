import urls from './urls';

const resources = {
    'AUTH_USER': `${urls.SENTION_API_BASE}/auth/user`,

    'GET_USER': `${urls.SENTION_API_BASE}/user`,
    'GET_DEVICE': `${urls.SENTION_API_BASE}/user/devices`,
    'GET_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors`,

    'DELETE_DEVICE': `${urls.SENTION_API_BASE}/user/devices/dissociate`,
    'DELETE_SENSOR': `${urls.SENTION_API_BASE}/user/devices/sensors`,
}

export default resources;
