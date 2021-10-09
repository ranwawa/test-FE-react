import {isMobile, isPwd, REG_MOBILE, REG_PWD } from '..';

describe('isMobile', () => {
	test('13333333333应该返回true', () => {
		expect(isMobile('13333333333')).toBe(true);
	});

	test('1333333应该返回false', () => {
		expect(isMobile('1333333')).toBe(false);
	})
});


describe('isPwd', () => {
	test('123456应该返回true', () => {
		expect(isPwd(123456)).toBeTruthy();
	});

	test('123应该返回false', () => {
		expect(isPwd('123')).toBeFalsy();
	})
});

describe('snapshot', () => {
	test('手机号码的正则表达式', () => {
		expect(REG_MOBILE).toMatchSnapshot();
	})

	test('密码的正则表达式', () => {
		expect(REG_PWD).toMatchSnapshot();
	})
})
