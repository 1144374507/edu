let userNameKey = 'login_userName';
let passwordKey = 'login_password';
let rememberPwdKey = 'login_rememberPwd';
let $store = localStorage;

export const rememberAccount = function (ruleForm) {
  ruleForm = ruleForm || {};
  console.info(ruleForm)
  if (ruleForm.rememberPwd) {
    if (ruleForm.userName) {
      $store.setItem(userNameKey, ruleForm.userName);
    }
    if (ruleForm.password) {
      $store.setItem(passwordKey, ruleForm.password);
    }
    if (ruleForm.rememberPwd) {
      $store.setItem(rememberPwdKey, ruleForm.rememberPwd);
    }
  } else {
    removeAccount();
  }
}

export const removeAccount = function () {
  $store.removeItem(userNameKey);
  $store.removeItem(passwordKey);
  $store.removeItem(rememberPwdKey);
}

export const getRememberAccount = function () {
  let userName = $store.getItem(userNameKey);
  let password = $store.getItem(passwordKey);
  let rememberPwd = $store.getItem(rememberPwdKey);
  return {
    userName,
    password,
    rememberPwd
  }
}
