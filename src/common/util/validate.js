import Util from "./util";
import _ from "lodash";

export function validateIntegerLength(rule, value, callback) {
  var pattern = new RegExp("^[0-9]\\d*$");
  if (!value && rule.required) {
    callback(new Error(rule.message));
  }
  if (!value && value !== 0) {
    callback();
  } else if (!pattern.test(value)) {
    callback(new Error("请输入整数"));
  } else if (value < rule.min) {
    callback(new Error("不能小于" + rule.min));
  } else if (value > rule.max) {
    callback(new Error("不能大于" + rule.max));
  }
  callback();
}

export function validateIp(rule, value, callback) {
  var pattern = new RegExp(
    "^(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|[1-9])\\." +
    "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
    "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)\\." +
    "(1\\d{2}|2[0-4]\\d|25[0-5]|[1-9]\\d|\\d)$"
  );
  if (rule.required && !value) {
    callback(new Error("请输入正确的IP"));
  }
  if (value && !pattern.test(value)) {
    callback(new Error("请输入正确的IP"));
  }
  callback();
}

export function validateMac(rule, value, callback) {
  var pattern = new RegExp(
    "((^([0-9a-fA-F]{2})(([0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{2})((:[0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{2})((-[0-9a-fA-F]{2}){5})$)|(^([0-9a-fA-F]{4})((\\.[0-9a-fA-F]{4}){2})$))"
  );
  if (value && !pattern.test(value)) {
    callback(new Error("请输入正确的MAC"));
  }
  callback();
}

export function validateMask(rule, value, callback) {
  if (rule.required && !value) {
    callback(new Error("请输入正确的子网掩码1"));
  }
  var exp = /^(254|252|248|240|224|192|128|0)\.0\.0\.0|255\.(254|252|248|240|224|192|128|0)\.0\.0|255\.255\.(254|252|248|240|224|192|128|0)\.0|255\.255\.255\.(254|252|248|240|224|192|128|0)$/;
  if (value && !value.match(exp)) {
    callback(new Error("请输入正确的子网掩码"));
  }
  callback();
}

const TEXT_REG = new RegExp("^[[\u4e00-\u9fa5a-zA-Z0-9_/.-]+$");
export function validateText(rule, value, callback) {
  if (!TEXT_REG.test(value) && value.length >= 1 && value.length <= 31) {
    callback(new Error("支持中文、字母、符号_-/.和数字，长度为1-31个字符"));
  }
  callback();
}

const MAIL_REG = new RegExp(
  "^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$"
);
export function validateMail(rule, value, callback) {
  if (!MAIL_REG.test(value)) {
    callback(new Error(rule.message || "请输入正确的邮箱地址"));
  }
  callback();
}

// 格式如1.1.1.1或者1.1.1.1-1.1.1.10(范围不大于31)
export function validateIpOrIpRangeLimit(rule, val, callback) {
  if (Util.validateIP(val)) {
    callback();
  } else if (val.indexOf("-") !== -1) {
    const limit = rule.limit || 31;
    var ip = val.split("-");
    if (
      Util.validateIP(_.trim(ip[0])) &&
      Util.validateIP(_.trim(ip[1])) &&
      ip.length === 2 &&
      Util.ipToLong(_.trim(ip[1])) - Util.ipToLong(_.trim(ip[0])) <= limit
    ) {
      callback();
    }
  }
  callback(new Error(rule.message || "IP格式错误"));
}

// 校验端口范围,后面的比前面的大,可以是单个端口，也可以是端口范围
export function validatePortRange(rule, val, callback) {
  if (Util.validatePort(val)) {
    callback();
  } else if (val.indexOf("-") !== -1) {
    var port = val.split("-");
    if (
      Util.validatePort(_.trim(port[0])) &&
      Util.validatePort(_.trim(port[1])) &&
      port.length === 2 &&
      parseInt(port[0], 10) < parseInt(port[1], 10)
    )
      callback();
  }
  callback(new Error(rule.message || "端口格式错误"));
}
// 校验不能超过32个字符(中文占两个字符)
export function validateCharacter(rule, value, callback) {
  var len = 0;
  for (var i = 0; i < value.length; i++) {
    var c = value.charCodeAt(i);
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++;
    } else {
      len += 2;
    }
  }
  if (len > 32) {
    callback(new Error("不能超过32个字符(中文占两个字符)"));
  } else {
    callback();
  }
}
