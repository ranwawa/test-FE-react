export const REG_MOBILE = /^1\d{10}$/;
export const REG_PASSWORD = /^\w{6,16}$/;

export const isValidMobile = (mobile) => REG_MOBILE.test(mobile);

export const isValidPassword = (password) => REG_PASSWORD.test(password);
