/**扩展指定对象的方法**/

//扩展小数点格式化方法
function expend_num_toFixed() {
    Number.prototype.toFixed = function (d) { 
        var s=this+""; 
        if(!d)d=0; 
        if(s.indexOf(".")==-1) {
            s+="."; 
            d = 0;
        }
        s+=new Array(d+1).join("0"); 
        if(new RegExp("^(-|\\+)?(\\d+(\\.\\d{0,"+(d+1)+"})?)\\d*$").test(s)){
            var s="0"+RegExp.$2,pm=RegExp.$1,a=RegExp.$3.length,b=true;
            if(a==d+2){
                a=s.match(/\d/g); 
                if(parseInt(a[a.length-1])>4){
                    for(var i=a.length-2;i>=0;i--){
                        a[i]=parseInt(a[i])+1;
                        if(a[i]==10){
                            a[i]=0;
                            b=i!=1;
                        }else break;
                    }
                }
                s=a.join("").replace(new RegExp("(\\d+)(\\d{"+d+"})\\d$"),"$1.$2");

            }if(b)s=s.substr(1); 
            return (pm+s).replace(/\.$/,"");
        }
        return this+"";
    };  
}

//扩展字符串去除首尾空格
function expend_str_trim() {
    String.prototype.trim = function() {
        return this.replace(/(^\s+)|(\s+$)/g,"");
    }
}

//日期格式化
function expend_date_formate() {
    Date.prototype.formate = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "H+": this.getHours(), //小时 
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }
}


(function() {
    expend_num_toFixed();
    expend_str_trim();
    expend_date_formate();
})();