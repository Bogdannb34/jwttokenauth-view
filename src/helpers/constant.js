export const BASE_URL = 'http://localhost:8080/api';
export const REGISTER_URL = '/auth/register';

export const CHECK_FIRST = /^[A-z][A-z0-9-_]{3,23}$/;
export const CHECK_LAST = /^[A-z][A-z0-9-_]{3,23}$/;
export const CHECK_EMAIL = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const CHECK_PWD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,120}$/;