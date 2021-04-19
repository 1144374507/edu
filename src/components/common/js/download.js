import * as tokenObj from '@/common/js/tokenMng.js'
import queryString from 'query-string'

var rjDownload = function () {

  var subSelf = this;

  subSelf.download = function (url) {
    let token = tokenObj.getToken();
    if (url.indexOf("?") !== -1) {
      url = url + "&token=" + token;
    } else {
      url = url + "?token=" + token;
    }
    window.location.href = url;
  };

  // 通过参数对象生成url地址
  subSelf.downloadNew = function (url, query = {}, options = {}) {
    let token = tokenObj.getToken();
    const queryStr = queryString.stringify({
      ...query,
      token,
      _: new Date().getTime()
    }, options)
    if (queryStr) {
      url = url + "?" + queryStr;
    }

    if (options.open === 'self') {
      window.location.href = url;
    } else {
      window.open(url)
    }
  }
};

export default new rjDownload();
