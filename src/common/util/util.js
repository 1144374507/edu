import _ from "lodash";

const Util = {
  /**
   * 判断传入的参数是否为空(null、undefined、空数组、空串).
   *
   * @param {Object}
   *            obj 待验证的变量.
   * @param {Boolean}
   *            allowBlank (optional) 是否允许空串，允许时空串不为空.
   * @return {Boolean} 返回该变量是否存在的布尔值.
   */
  isEmpty: function(obj, allowBlank) {
    return (
      obj === null ||
      obj === undefined ||
      (Util.isArray(obj) && !obj.length) ||
      (!allowBlank ? obj === "" : false)
    );
  },
  /**
   * IP地址转换成整型
   *
   * @param {String}
   *            str 待验证的用户名字符串.
   * @return {Long} 返回整型
   *
   */
  ipToLong: function(ipstr) {
    var iplong;
    var ipArr = new Array();
    ipArr = ipstr.split(".");
    iplong =
      parseInt(ipArr[0], 10) * 256 * 256 * 256 +
      parseInt(ipArr[1], 10) * 256 * 256 +
      parseInt(ipArr[2], 10) * 256 +
      parseInt(ipArr[3], 10);
    return iplong;
  },
  /**
   * 验证一个字符串是否符合有效IP的格式。0\127\224以上开头被排除
   * @param {String} ip 待验证的字符串。
   * @return {Bool} 返回字符串是否通过验证的布尔值。
   */
  validateIP: function(IPstr) {
    return this.isStrictIP(IPstr);
  },
  // 验证必填
  isEmpty: function(str) {
    return _.trim(str) == "";
  },
  // 验证最小长度
  minLen: function(str, len) {
    return str.length >= len;
  },
  // 验证最大长度
  maxLen: function(str, len) {
    return str.length <= len;
  },
  // 验证最大字节长度不超过多少
  maxByteLen: function(str, len) {
    return str.lengthW() <= len;
  },
  // 验证长度的区间
  inRangeLen: function(str, minL, maxL) {
    return str.length >= minL && str.length <= maxL;
  },
  // 验证最大值
  max: function(str, val) {
    var number = parseFloat(str);
    return str && !isNaN(str) && number <= val;
  },
  // 验证最大值
  min: function(str, val) {
    var number = parseFloat(str);
    return str && !isNaN(str) && number >= val;
  },
  // 验证值的范围
  inRange: function(str, min, max) {
    var number = parseFloat(str);
    return str && !isNaN(str) && number >= min && number <= max;
  },
  // 验证URL
  isUrl: function(str) {
    var reg = new RegExp("^https?://([w-]+.)+[w-]+(/[w ./?%&=-]*)?");
    return reg.test(str);
  },
  // 验证整数
  isInteger: function(str) {
    return str == "0" || /^-?[1-9]\d*$/.test(str);
  },
  // 验证正整数
  isPinteger: function(str) {
    return /^[1-9]\d*$/.test(str);
  },
  // 验证数字 0-9的数字
  isNumber: function(str) {
    return /^[0-9]*$/.test(str);
  },
  // 浮点数 整数或小数
  isFloat: function(str) {
    return !isNaN(str);
  },
  // 固话 格式010-8745698 或 0591-8784587
  isPhone: function(str) {
    return /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/.test(str);
  },
  // 移动电话
  isMobile: function(str) {
    return /^1\d{10}$/.test(str);
  },
  // 验证邮箱
  isEmail: function(str) {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(str);
  },
  // 全部中文
  isZh: function(str) {
    return /^[\u4e00-\u9fa5]+$/.test(str);
  },
  /**
   * 验证一个字符串是否含有中文
   *
   * @param {String}
   *            str 待验证的用户名字符串.
   * @return {Boolean} 返回字符串是否通过验证的布尔值.
   */
  hasZh: function(str) {
    return /[\u4E00-\u9FA5]/.test(str);
  },
  // 单词：数字，字母 下划线
  isWord: function(str) {
    return /^\w+$/.test(str);
  },
  /*
   * 判断字符串中是否包含空格 @param {String} str_in 待检查的字符串 @return {Boolean}
   * 返回true,不包含返回false
   */
  hasSpace: function(str_in) {
    return str_in.indexOf(" ") != -1;
  },
  /**
   * 验证一个字符串是否含有中文和全角字符
   *
   * @param {String}
   *            str 待验证的用户名字符串。
   * @return {Boolean} 返回字符串是否通过验证的布尔值。
   */
  hasZhEncod: function(str) {
    return /[^\x00-\xff]/.test(str);
  },
  /**
   * 验证一个字符串是否为合法的用户名格式.考虑到其他字符可以配置，基本的过滤?,其他的过滤条件具体考虑 lin
   *
   * @param {String}
   *            username 待验证的用户名字符串.
   * @return {Boolean} 返回字符串是否通过验证的布尔值.
   *
   */
  validateName: function(username) {
    var reg = /[?]/;
    return !reg.test(username);
  },
  /**
   * 验证一个字符串是否为合法，所有输入框都要经过此验证
   *
   * @param {String}
   *            str 待验证的用户名字符串.
   * @return {Boolean} 返回字符串是否通过验证的布尔值.
   */
  vInput: function(str) {
    return this.validateInput(str);
  },
  /**
   * 严格验证一个字符串是否为合法.
   *
   * @param {String}
   *            str 待验证的用户名字符串.
   * @return {Boolean} 返回字符串是否通过验证的布尔值.
   */
  validateInput: function(str) {
    var reg = /\?/;
    var reg2 = /\S+\s+\S*\/\s*$/;
    return !reg.test(str) && !reg2.test(str);
  },
  /**
   * 验证一个字符串是否符合有效IP的格式.
   *
   * @param {String}
   *            ip 待验证的字符串.
   * @return {Bool} 返回字符串是否通过验证的布尔值.
   */
  isIP: function(ip) {
    if (Util.isEmpty(ip)) {
      return false;
    }
    var re = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/g;
    if (re.test(ip)) {
      if (
        RegExp.$1 < 256 &&
        RegExp.$2 < 256 &&
        RegExp.$3 < 256 &&
        RegExp.$4 < 256
      ) {
        // CJL 增加每个数值的长度判定
        if (
          RegExp.$1.length < 4 &&
          RegExp.$2.length < 4 &&
          RegExp.$3.length < 4 &&
          RegExp.$4.length < 4
        )
          return true;
      }
    }
    return false;
  },
  /**
   * 验证一个字符串是否符合有效的 多IP 的格式.
   *
   * @param {String}
   *            str 待验证的字符串.
   * @return {Bool} 返回字符串是否通过验证的布尔值.
   */
  isMuchIP: function(str) {
    if (Util.isEmpty(str)) {
      return false;
    }
    var ips = str.split(",");
    for (var i = 0, l = ips.length; i < l; i++) {
      if (!Util.isIP(ips[i])) {
        return false;
      }
    }
    return true;
  },
  /*
   * 对输入的IP地址进行严格校验,格式为xx.xx.xx.xx @param {String} IPstr 待验证的IP串. @return
   * {Boolean} 返回true or false
   */
  isStrictIP: function(IPstr) {
    if (Util.isEmpty(IPstr)) {
      return false;
    }
    var re = /^((25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)\.){3}(25[0-5]|2[0-4]\d|1\d\d|[1-9]\d|\d)$/g;
    /* return re.test(ip); */
    if (!re.test(IPstr)) return false;
    var IPArray = IPstr.split(".");
    if (IPArray[0] == 0 || IPArray[0] == 127 || parseInt(IPArray[0]) >= 224) {
      return false;
    }
    return true;
  },
  /**
   * 判断是否单播地址
   *
   * @param {String}
   *            IPstr
   * @return true or false
   */
  isUnicastIP: function(IPstr) {
    /* 有效性校验 */
    var IPPattern = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    if (!IPPattern.test(IPstr)) {
      return false;
    }
    /* 检查域值 */
    var IPArray = IPstr.split(".");
    if (IPArray.length != 4) {
      return false;
    }
    var tInt = 0;
    var iInt = 0;
    for (iInt = 0; iInt < 4; iInt++) {
      /* 每个域值范围1-255 */
      tInt = parseInt(IPArray[iInt]);
      if (tInt < 0 || tInt > 255) {
        return false;
      }
      /* 子网或广播ip都不行 */
      if ((tInt == 0 || tInt == 255) && iInt == 3) {
        return false;
      }
      /* 0.0.0.*不可以返回false A B C类的判断 */
      if (iInt == 0 && (tInt < 1 || tInt > 223)) {
        return false;
      }
      /* 127.*.*.*不合法 */
      if (iInt == 0 && tInt == 127) {
        return false;
      }
    }
    return true;
  },
  /**
   * 验证一个IP是否在一个IP段内
   *
   * @param {String}
   *            ip 待验证的IP.
   * @param {String}
   *            startIp 起始IP.
   * @param {String}
   *            endIp 结束IP.
   * @param {Boole}
   *            include 是否包含起始和结束IP.
   * @return {Boolean} 在IP段之间则返回true.
   */
  ipBetween: function(ip, startIp, endIp, include) {
    var vip = Util.ipToLong(ip);
    var sip = Util.ipToLong(startIp);
    var eip = Util.ipToLong(endIp);
    if (include) {
      return vip >= sip && vip <= eip;
    } else {
      return vip > sip && vip < eip;
    }
  },
  /**
   * 验证IP 是否在某个网段内
   *
   * @param {String}
   *            ip IP地址如192.168.23.25
   * @param {String}
   *            mask IP所处的掩码，如255.255.255.0
   * @param {String}
   *            netCode 网段地址，如192.168.23.0
   * @return {Boolean}
   */
  ipInSubnet: function(ip, mask, netCode) {
    var net = Util.getNetCode(ip, mask);
    // 通过掩码计算IP的网段，判断是否一致
    return net == netCode;
  },
  /**
   * 验证2个IP是否同属一个网段
   */
  inSameNet: function(ip1, ip2, mask) {
    var net1 = Util.getNetCode(ip1, mask);
    var net2 = Util.getNetCode(ip2, mask);
    return net1 == net2;
  },
  /**
   * 生成随机MAC地址。
   * @return {str} 随机MAC字符串。
   *
   */
  getRandomMAC: function() {
    var randomPool = "0123456789AaBaCcDdEeFf",
      unicastPool = "02468AaCcEe",
      randomMAC = "";
    for (var i = 0; i < 12; i++) {
      var value =
        i != 1
          ? randomPool.charAt(parseInt(Math.random() * randomPool.length))
          : unicastPool.charAt(parseInt(Math.random() * unicastPool.length));
      randomMAC += value;
    }
    var arr = randomMAC.split("");
    arr.splice(4, 0, ".");
    arr.splice(-4, 0, ".");
    randomMAC = arr.join("");
    return randomMAC;
  },
  /**
   * 对输入的Mac地址进行校验.
   *
   * @param {String}
   *            MACstr 待验证的mac字符串.
   * @return {Boolean} 掩码是否正确的布尔值.
   */
  isMAC: function(MACstr) {
    var MACPattern = /^[0-9,a-f,A-F]{4}\.[0-9,a-f,A-F]{4}\.[0-9,a-f,A-F]{4}$/;
    if (MACstr == "0000.0000.0000") {
      return false;
    }
    if (!MACPattern.test(MACstr)) return false;
    var unicastPattern = /^[0-9,a-f,A-F]{1}[1,3,5,7,9,b,d,f]{1}.*$/;
    if (unicastPattern.test(MACstr)) return false;
    return true;
  },
  /**
   * 对输入的Mac2地址进行校验.
   *
   * @param {String}
   *            MACstr 待验证的mac字符串.	00:FF:1F:75:34:91或00-FF-1F-75-34
   * @return {Boolean} 掩码是否正确的布尔值.
   */
  isMAC2: function(MACstr) {
    var MACPattern = /^[0-9,a-f,A-F]{2}[:-][0-9,a-f,A-F]{2}[:-][0-9,a-f,A-F]{2}[:-][0-9,a-f,A-F]{2}[:-][0-9,a-f,A-F]{2}[:-][0-9,a-f,A-F]{2}$/;
    if (MACstr == "00:00:00:00:00:00" || MACstr == "00-00-00-00-00-00") {
      return false;
    }
    if (!MACPattern.test(MACstr)) return false;
    var unicastPattern = /^[0-9,a-f,A-F]{1}[1,3,5,7,9,b,d,f]{1}.*$/;
    if (unicastPattern.test(MACstr)) return false;
    return true;
  },
  /**
   * 校验是否合法的掩码地址.
   *
   * @param {String}
   *            maskCode 待验证的掩码字符串.
   * @return {Boolean} 掩码是否正确的布尔值.
   * @auth zhongcj at 20130106
   */
  isMaskCode: function(maskCode) {
    // 首先判断是否合法的IP
    if (!Util.isIP(maskCode)) {
      return false;
    }
    // 二进制码要相邻，即形如111...11000...0的形式
    // 将掩码转化成32无符号整型，取反为000...00111...1，然后再加1为00...01000...0，此时为2^n，如果满足就为合法掩码
    var num = Util.ipToLong(maskCode);
    num = ~num + 1;
    // 判断是否为2^n
    return (num & (num - 1)) == 0;
  },
  /**
   * 校验是否合法的IPV6地址，如2:14:58:a1:23:34:43:9 或缩写 20::33或者20::
   *
   * @param {String}
   *            ip 待验证的ipv6字符串.
   * @return {Boolean} 掩码是否正确的布尔值. IPV6 格式：
   *         8段4位16进制数字，中间用:隔开，每段中前面的0可以省略，连续的0可省略为"::"
   * @auth zhongcj at 20130109
   */
  isIPV6: function(ip) {
    if (!/:/.test(ip)) {
      // 必须包含":"号
      return false;
    }
    if (/::/.test(ip)) {
      // 包含"::"号
      if (ip.match(/::/g).length > 1) {
        // "::"只能有一个
        return false;
      }
      return /^::$|^(::)?([\da-f]{1,4}(:|::)){0,6}[\da-f]{0,4}$/i.test(ip);
    } else {
      // 8组4位十六进制字符串 中间用":"号隔开
      return /^([\da-f]{1,4}:){7}[\da-f]{1,4}$/i.test(ip);
    }
  },
  /**
   * 验证携带掩码的IPV6地址，格式2:14:58:a1:23:34:43:9/64 或缩写 20::33/64
   */
  isIPV6WithMask: function(ip) {
    if (ip.indexOf("/") == -1) {
      return false;
    }
    var arr = ip.split("/");
    if (arr.length != 2) {
      return false;
    }
    return Util.isIPV6(arr[0]) && Util.inRange(arr[1], 0, 128);
  },
  /**
   * 验证字符串是否包含空格
   *
   * @return 包含空格返回true
   */
  containSpace: function(str) {
    return / /.test(str);
  },
  /**
   * 验证字符串不能包含中文字符？及-
   * @param {type} str
   * @returns {undefined}
   */
  zhSpecialChar: function(str) {
    return !/？|—/.test(str);
  },
  /**
   * 验证一个字符串是否为合法的URL格式。
   * @param {String} str_url 待验证的URL字符串。
   * @return {Boolean} 返回字符串是否通过验证的布尔值。
   */
  validateUrl: function(str_url) {
    var strRegex =
      "^((https|http|ftp|rtsp|mms)://)" +
      "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" + //ftp的user@
      //+ "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
      "((([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\\.){3}([1-9]?[0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])" + //IP形式的URL- 199.194.52.184
      "|" + // 允许IP和DOMAIN（域名）
      "([0-9a-z_!~*'()-]+\\.)*" + // 域名- www.
      "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\\." + // 二级域名暂时不支持中文 \u4e00-\u9fa5
      "[a-z]{2,6})" + // first level domain- .com or .museum
      "(:([1-9]?[0-9]|[1-9][0-9]{2}|[1-9][0-9]{3}|[1-5][0-9]{4}|6[0-5][0-5][0-3][0-5]))?" + // 端口- :80
      "((/?)|" + // a slash isn't required if there is no file name
      "(/[\\\\0-9a-zA-Z_!~*'().;?:@&=+$,%#-]+)+/?)$"; //支持反斜杠和大写字母
    var re = new RegExp(strRegex);
    if (re.test(str_url)) {
      return true;
    } else {
      return false;
    }
  },
  validatePort: function(port) {
    return (
      this.isNumber(port) &&
      parseInt(port, 10) > 0 &&
      parseInt(port, 10) <= 65535
    );
  },
  validatePort1: function(port) {
    return (
      this.isNumber(port) &&
      parseInt(port, 10) > 0 &&
      parseInt(port, 10) <= 4094
    );
  }
};

export default Util;
