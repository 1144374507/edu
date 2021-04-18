/**
 *数组相关操作
 * @auth hua
 */

function mTrim(str) {
	return str && str.trim()
}

/**
 * 端口前缀相关操作
 */
const PortNameUtil = {
  SHOT_NAME: {
    Tw: "TwentyGigabitEthernet",
    Te: "TenGigabitEthernet",
    TF: "TFGigabitEthernet",
    Fo: "FortyGigabitEthernet",
    MT: "MTGigabitEthernet", //2.5G
    Gi: "GigabitEthernet",
    Fa: "FastEthernet",
    Ag: "AggregatePort",
    FC: "FC",
    Fc: "FC",
    Mg: "Mgmt"
  },
  SHOT_LNAME: {
    Gi: "GigabitEthernet",
    Tw: "TwentyGigabitEthernet",
    Te: "TenGigabitEthernet",
    TF: "TFGigabitEthernet",
    Fo: "FortyGigabitEthernet",
    MT: "MTGigabitEthernet",
    Fa: "FastEthernet",
    Ag: "AggregatePort",
    FC: "FC",
    Fc: "FC",
    Mg: "Mgmt"
  },
  //GigabitEthernet 0/1 -->Gi0/1
  lits: function (str) {
    str = mTrim(str);
    var shotName = this.SHOT_NAME;
    for (var p in shotName) {
      var reg = new RegExp(shotName[p] + " ", "g");
      var reg1 = new RegExp(shotName[p], "g");
      str = str.replace(reg, p);
      str = str.replace(reg1, p);
    }

    return str;
  },
  sitl: function (str) {
    str = mTrim(str);
    str = this.lits(str);
    var shotName = this.SHOT_LNAME;
    for (var p in shotName) {
      var reg = new RegExp(p, "g");
      str = str.replace(reg, shotName[p] + " ");
    }
    return str;
  },
  //没用到？
  /*shortTnull : function(cmd){
  	str = mTrim(cmd);
  	cmd = cmd.replace(/Gi/g,'').replace(/Fa/g,"").replace(/Te/g,'').replace(/Fo/g,"").replace(/ /g,"");
  	var reg = new RegExp(PortPreFix,"g");
  	return cmd.replace(reg,"");
  },
  //没用到？
  webtocli : function(str){
  	str = mTrim(str);
  	//return cmd.replace(/GigabitEthernet /g,'GigabitEthernet 0\/').replace(/FastEthernet /g,'FastEthernet 0\/').replace(/TenGigabitEthernet /g,'TenGigabitEthernet 0\/').replace(/FortyGigabitEthernet /g,'FortyGigabitEthernet 0/');
  	var items = ["Te","Gi","Fo","Fa"];
  	for(var i=0,l=items.length; i<l; i++){
  		var name = this.SHOT_NAME[items[i]];
  		var reg = new RegExp(name+" ","g");
  		str = str.replace(reg,name+" 0\/");
  	}
  	return str;
  },
  //没用到？
  sitnull : function(str){
  	str = mTrim(str);
  	str = this.sitl(str);
  	//return this.sitl(cmd).replace(/GigabitEthernet /g,'').replace(/FastEthernet /g,'').replace(/TenGigabitEthernet /g,'').replace(/AggregatePort /g,'').replace(/FortyGigabitEthernet /g,'');
  	var shotName = this.SHOT_NAME;
  	for(var p in shotName){
  		var reg = new RegExp(shotName[p]+" ","g");
  		str = str.replace(reg,"");
  	}
  	return str;
  },
  //没用到？
  sitnulloutap : function(str){
  	str = mTrim(str);
  	str = this.sitl(str);
  	//return this.sitl(cmd).replace(/GigabitEthernet /g,'').replace(/FastEthernet /g,'').replace(/TenGigabitEthernet /g,'').replace(/FortyGigabitEthernet /g,'');
  	var items = ["Te","Gi","Fo","Fa"];
  	for(var i=0,l=items.length; i<l; i++){
  		var name = this.SHOT_NAME[items[i]];
  		var reg = new RegExp(name+" ","g");
  		str = str.replace(reg,"");
  	}
  	return str;
  },*/
  shortTPrenull: function (cmd, prefix) {
    var str = mTrim(cmd);
    cmd = cmd.replace(/Gi/g, '').replace(/TF/g, '').replace(/Fa/g, "").replace(/Te/g, '').replace(/Fo/g, "").replace(/Tw/g, "").replace(/MT/g, "").replace(/ /g, "");
    var reg = new RegExp(prefix, "g");
    return cmd.replace(reg, "");
  }
};

/**
 * 对数组的差集，交集等操作
 */
const UtilArr = {
  contains: function (a, element) {
    for (var i = 0; i < a.length; i++) {
      if (a[i] == element) {
        return true;
      }
    }
    return false;
  },
  /* @param {Function} fn 进行迭代判定的函数
   * @param more ... 零个或多个可选的用户自定义参数
   * @returns {Array} 结果集，如果没有结果，返回空集
   */

  each: function (b, fn) {
    fn = fn || Function.K;
    var a = [];
    var args = Array.prototype.slice.call(arguments, 1);
    for (var i = 0; i < b.length; i++) {
      var res = fn.apply(b, [b[i], i].concat(args));
      if (res != null) a.push(res);
    }
    return a;
  },

  /**
   * 得到一个数组不重复的元素集合<br/>
   * 唯一化一个数组
   * @returns {Array} 由不重复元素构成的数组
   */
  uniquelize: function (a) {
    var self = this;
    var ra = new Array();
    for (var i = 0; i < a.length; i++) {
      if (!self.contains(ra, a[i])) {
        ra.push(a[i]);
      }
    }
    return ra;
  },

  /**
  * 求两个集合的补集
  {%example
  <script>
       var a = [1,2,3,4];
       var b = [3,4,5,6];
       alert(Array.complement(a,b));
  </script>
  %}
  * @param {Array} a 集合A
  * @param {Array} b 集合B
  * @returns {Array} 两个集合的补集
  */
  complement: function (a, b) {
    var self = this;
    return self.minus(self.union(a, b), self.intersect(a, b));
  },

  /**
   * 求两个集合的交集
   * @param {Array} a 集合A
   * @param {Array} b 集合B
   * @returns {Array} 两个集合的交集
   */
  intersect: function (a, b) {
    var self = this;
    return self.each(self.uniquelize(a), function (o) {
      return self.contains(b, o) ? o : null;
    });
  },

  /**
  * 求两个集合的差集
  {%example
  <script>
       var a = [1,2,3,4];
       var b = [3,4,5,6];
       alert(Array.minus(a,b));
  </script>
  %}
  * @param {Array} a 集合A
  * @param {Array} b 集合B
  * @returns {Array} 两个集合的差集
  */
  minus: function (a, b) {
    var self = this;
    return self.each(self.uniquelize(a), function (o) {
      return self.contains(b, o) ? null : o;
    });
  },

  /**
  * 求两个集合的并集
  {%example
  <script>
       var a = [1,2,3,4];
       var b = [3,4,5,6];
       alert(Array.union(a,b));
  </script>
  %}
  * @param {Array} a 集合A
  * @param {Array} b 集合B
  * @returns {Array} 两个集合的并集
  */
  union: function (a, b) {
    var self = this;
    return self.uniquelize(a.concat(b));
  },
  removeNull: function (a) {
    var newarr = new Array();
    for (var i = 0; i < a.length; i++) {
      if (a[i].replace(/[\r\n]/, "").trim() != '') {
        newarr[newarr.length] = a[i];
      }
    }
    return newarr;
  }
};

const UtilPortRange = {
  //根据槽号划分不同的端口类别
  getSlotsPortData: function (str) {
    let data = typeof str == "string" ? str.split(",") : str;
    var map = [];
    for (var i = 0; i < data.length; i++) {
      var item = mTrim(data[i]).replace(/ /g, "");
      var pre = item.substring(2, item.lastIndexOf("/") + 1);
      var list = map.pop();
      var speed = item.substring(0, 2);

      if (list == null) {
        list = {
          "speed": speed,
          "id": pre,
          "ports": [item]
        };
      } else if (list.id == pre && list.speed == speed) {
        list.ports.push(item);
      } else {
        var isExit = false;
        for (var j = 0; j < map.length; j++) {
          if (map[j].id == list.id && list.speed == map[j].speed) {
            map[j].ports = map[j].ports.concat(list.ports);
            isExit = true;
            break;
          }
        }
        if (!isExit) {
          map.push(list);
        }
        list = {
          "speed": speed,
          "id": pre,
          "ports": [item]
        };
      }
      isExit = false;
      for (var j = 0; j < map.length; j++) {
        if (map[j].id == list.id && list.speed == map[j].speed) {
          map[j].ports = map[j].ports.concat(list.ports);
          isExit = true;
          break;
        }
      }
      if (!isExit) {
        map.push(list);
      }
    }
    return map;
  },
  /*
   * 端口字符串根据端口前缀进行分组
   * 数组str :[Gi2/1,Gi2/3,Gi2/7,Gi2/8,Gi4/3]
   * 返回格式：[Gi2/1-10,Gi2/20,Gi4/10-20,Gi4/40,Ag78,Ag100]
   */

  getPortRange: function (str) {
    var portArr = UtilPortRange.getSlotsPortData(str);
    var portdata = [];
    for (var i = 0; i < portArr.length; i++) {
      var temp = portArr[i];
      var preTemp = UtilPortRange.getRangePort(PortNameUtil.shortTPrenull(temp.ports.join(","), temp.id)).split(",");
      for (var j = 0; j < preTemp.length; j++) {
        if (temp.speed != "Ag") {
          var slots = "";
          slots = temp.id.substring(0, temp.id.length - 1);
          portdata.push(temp.speed + temp.id + preTemp[j]);
        } else {
          portdata.push(temp.id + preTemp[j]);
        }
      }
    }
    return portdata;
  },

  //通过端口号获得用1-3,5-8,9显示的端口范围
  getRangePort: function (str) {
    if (str == "") {
      return "";
    }
    if (str.indexOf(":") != -1) {
      return str;
    }
    var Expression = /^[0-9]+$/;
    var objExp = new RegExp(Expression);
    var portArr = UtilArr.uniquelize(UtilArr.removeNull(str.split(","))).sort();
    i = portArr.length - 1;
    var portAg = "";
    for (i; i > 0; i--) {
      if (portArr[i].indexOf("Ag") != -1) {
        portAg = portArr[i] + ',' + portAg;
        portArr[i] = "";
      } else {
        break;
      }
    }
    if (portArr.length > 1) {
      portArr = UtilArr.removeNull(portArr).sort(function (a, b) {
        return a - b;
      });
    }
    var portStr = "";
    var i = 0;
    var j = 1;
    var count = 1;
    var portDown = parseInt(portArr[0]);
    if (portArr.length > 1) {
      for (i, j; i < portArr.length; j++, i++) {
        var portUp = parseInt(portArr[j]);
        if (++portDown == portUp) {
          count++;
          continue;
        } else {
          if (count > 1) {
            portStr += (portDown - count) + "-" + (portDown - 1) + ",";
          } else if (count == 1) {
            if (portDown != "NaN") {
              portStr += (portDown - count) + ",";
            }

          }
          count = 1;
          portDown = portUp;
        }
      }
    } else {
      portStr = portArr[0] + ",";
    }
    portStr += portAg;
    portStr = portStr.lastIndexOf(",") + 1 == portStr.length ? portStr.substr(0, portStr.length - 1) : portStr;
    portStr = UtilArr.removeNull(portStr.split(",")).join(",");
    return portStr;
  },
  /*
   * 端口字符串根据端口前缀进行分组，将分组的数据组合显示在表格中
   * str :格式为字符串，Gi2/1,Gi2/3,Gi2/7,Gi2/8,Gi4/3
   * 返回格式：Gi2/1-10,Gi2/20,Gi4/10-20,Gi4/40,Ag78,Ag100
   */

  getTtablePortData: function (str) {
    if (str == "") {
      return "";
    }
    var self = this;
    var portArr = self.getSlotsPortData(str);
    var portdata = "";
    for (var i = 0; i < portArr.length; i++) {
      var temp = portArr[i];
      var preTemp = self.getRangePort(PortNameUtil.shortTPrenull(temp.ports.join(","), temp.id)).split(",");
      for (var j = 0; j < preTemp.length; j++) {
        if (temp.speed != "Ag") {
          var slots = "";
          var slotsList = mTrim(temp.id.substring(0, temp.id.length - 1)).split(/\//);
          if (slotsList.length == 1) {
            slots = "1/" + slotsList[0];
          } else {
            slots = slotsList[0] + "/" + slotsList[1];
          }
          if (portdata.indexOf(slots) != -1) {
            portdata += temp.speed + temp.id + preTemp[j] + ",";
          } else {
            portdata = portdata.substring(0, portdata.length - 1);
            portdata += "<br/>" + slots + "：" + temp.speed + temp.id + preTemp[j] + ",";
          }

        } else {
          if (portdata.indexOf("AG") != -1) {
            portdata += temp.id + preTemp[j] + ",";
          } else {
            portdata = portdata.substring(0, portdata.length - 1);
            portdata += "<br/> AG：" + temp.id + preTemp[j] + ",";
          }
        }
      }
    }

    portdata = portdata.substring(5, portdata.length - 1);
    if (portdata == "") {
      portdata = "";
    }
    portdata = portdata.replace(/[0-9]*\/[0-9]*：/g, ""); //Resource["pub.deviceSlots"]
    var reg = new RegExp("聚合口" + '：', 'g');
    portdata = portdata.replace(reg, ""); //Resource["pub.ag"]
    return portdata;
  },
  setPortRange: function (str) {
    var portTemp = this.getPortRange(str);
    var prefix = "";
    var newArr = [];
    for (var i = 0; i < portTemp.length; i++) {
      var prefixCurr = portTemp[i].substring(0, 2);
      if (portTemp[i] != "") {
        if (prefixCurr == "Ag") {
          newArr.push(portTemp[i]);
        } else if (prefixCurr != prefix) {
          if (prefix != "") {
            newArr.push(newPrePort);
            newPrePort = "";
          }
          var newPrePort = portTemp[i];
          prefix = prefixCurr;
        } else {
          newPrePort += "," + portTemp[i].substr(2);
        }
      }
    }
    if (newPrePort != "" && newPrePort != undefined) {
      newArr.push(newPrePort);
    }
    if (str == "") {
      newArr = [];
    }
    return newArr;
  }
};

export default {
  PortNameUtil: PortNameUtil,
  UtilArr: UtilArr,
  UtilPortRange: UtilPortRange
}
