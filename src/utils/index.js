export const REG_MOBILE = /1[3-8]\d{9,9}/;
export const REG_PWD = /.{6}/;

/**
 * 验证是否手机号
 * @param {string} mobile - 手机号码 
 * @returns {boolean}
 */
export const isMobile = function (mobile) {
	return REG_MOBILE.test(mobile);
}

/**
 * 验证是否密码
 * @param {string} pwd - 密码 
 * @returns {boolean}
 */
export const isPwd = function (pwd) {
	return REG_PWD.test(pwd);
}