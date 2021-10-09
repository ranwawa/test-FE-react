export const REG_MOBILE = /1[3-8]\d{9,9}/;
export const REG_PWD = /.{6}/;

export const isMobile = function (mobile) {
	return REG_MOBILE.test(mobile);
}

export const isPwd = function (pwd) {
	return REG_PWD.test(pwd);
}