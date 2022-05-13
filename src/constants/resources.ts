import urls from './urls';

const resources = {
    'AUTH_USER': `${urls.SENTION_API_BASE}/auth/user`,
    'GET_USER': `${urls.SENTION_API_BASE}/user`,
    'GET_DEVICE': `${urls.SENTION_API_BASE}/user/devices`,
    'DELETE_DEVICE': `${urls.SENTION_API_BASE}/user/devices/dissociate`,
}

export default resources;
