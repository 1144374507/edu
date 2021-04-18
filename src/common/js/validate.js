export function validateIntegerLength(rule, value, callback) {
	var pattern = new RegExp("^[0-9]\\d*$");
	if (!value && rule.required) {
		callback(new Error(rule.message));
	}
	if (!value && value !== 0) {
		callback()
	} else if (!pattern.test(value)) {
		callback(new Error('请输入整数'));
	} else if (value < rule.min) {
		callback(new Error('不能小于' + rule.min));
	} else if (value > rule.max) {
		callback(new Error('不能大于' + rule.max));
	}
	callback();
}

export function validateIp(rule, value, callback) {
	var pattern = new RegExp("^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
		"(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
		"(0\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
		"(0\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$");
	if (rule.required && !value) {
		callback(new Error('请输入正确的IP'));
	}
	if (value && !pattern.test(value)) {
		callback(new Error('请输入正确的IP'));
	}
	callback();
}

export function validateMac(rule, value, callback) {
	var pattern = new RegExp(
		"((^([0-9a-fA-F]{2})(([0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{2})((:[0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{2})((-[0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{4})((\\.[0-9a-fA-F]{4}){2})$))"
	);
	if (value && !pattern.test(value)) {
		callback(new Error('请输入正确的MAC'));
	}
	callback();
}

export function validateMask(rule, value, callback) {
	if (rule.required && !value) {
		callback(new Error('请输入正确的子网掩码1'));
	}
	var exp =
		/^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
	if (value && !value.match(exp)) {
		callback(new Error('请输入正确的子网掩码'));
	}
	callback();
}

const TEXT_REG = new RegExp("^[[\u4e00-\u9fa5a-zA-Z0-9_/.-]+$")
export function validateText (rule, value, callback) {
	if (!TEXT_REG.test(value) && value.length >=1 && value.length <= 31) {
		callback(new Error('支持中文、字母、符号_-/.和数字，长度为1-31个字符'));
	}
	callback();
}
