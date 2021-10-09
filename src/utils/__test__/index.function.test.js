import {isMobile, isPwd } from '..';

describe('isMobile', () => {
	test('13333333333应该返回true', () => {
		expect(isMobile('13333333333')).toBe(true);
	});

	test('1333333应该返回false', () => {
		expect(isMobile('1333333')).toBe(false);
	})
});
