const createIpReg = () => /^([1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])(\.(0|[1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])){2}\.([1-9]\d?|1\d{2}|2[0-4]\d|25[0-5])$/;
export const isValidIp = function (val) {
    const reg = createIpReg();
    return reg.test(val);
}

//192.168.1.1[-192.169.1.254]
export const isValidIpOrRange = function (val) {
    const reg = createIpReg()
    if (!~val.indexOf('-')) {
        return reg.test(val);
    };
    const array = val.split('-');
    return array.length === 2 && reg.test(array[0]) && reg.test(array[1]);
}

//192.168.1.0/24
export const isValidIpSegment = function (val) {
    const reg = /^(?=(\b|\D))(((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{1,2})|(2[0-4]\d)|(25[0-5]))(?=(\b|\D))\/([1-2][0-9]|3[0-2]|[1-9])$/
    if (!reg.test(val)) {
        return false;
    } else {
        const [segmentIp, mask] = val.split('/');
        const segmentIpSplit = segmentIp.split('.');
        let segmentIpBinaryStr = '';
        segmentIpSplit.forEach(e => {
            segmentIpBinaryStr += ('00000000' + Number(e).toString(2)).substr(-8);
        });
        return /^0+$/.test(segmentIpBinaryStr.substr(Number(mask) - 32));
    }
}
export const isValidVlanId = function (val) {
    if (/[^\d]/.test(val)) {
        return false;
    }
    const num = Number(val);
    return num <= 4094 && num >= 1;
}

// 1-2
export const isValidVlanIdRange = function (val) {
    if (!/^[1-9]\d{0,3}\-[1-9]\d{0,3}$/.test(val)) {
        return false;
    }
    const [start, end] = val.split('-');
    if (!isValidVlanId(start) || !isValidVlanId(end)) {
        return false;
    }
    if (Number(start) >= Number(end)) {
        return false;
    }
    return true;
}

// ip:待判断的ip,  ipWithMask: 判断所处的网段
export const isIpWithin = function (ip, ipSegment) {
    const [segmentIp, mask] = ipSegment.split('/');
    const segmentIpSplit = segmentIp.split('.');
    const ipSplit = ip.split('.');
    let segmentIpBinaryStr = '';
    let ipBinaryStr = '';
    segmentIpSplit.forEach(e => {
        segmentIpBinaryStr += ('00000000' + Number(e).toString(2)).substr(-8);
    });
    ipSplit.forEach(e => {
        ipBinaryStr += ('00000000' + Number(e).toString(2)).substr(-8);
    });
    return segmentIpBinaryStr.substr(0, Number(mask)) === ipBinaryStr.substr(0, Number(mask));
}

// 1,2,3-6,8
export const isValidVlanIdAndRangeGroup = function (val) {
    let ret = true;
    const groupArray = val.split(',');
    for (let i = 0, l = groupArray.length; i < l; i++) {
        if (!isValidVlanId(groupArray[i]) && !isValidVlanIdRange(groupArray[i])) {
            ret = false;
            break;
        }
    }
    return ret;
}


// val should pass isValidVlanIdAndRangeGroup check
export const hasConflictVlanId = function (val) {
    let ret = false;
    let hash = {};
    const groupArray = val.split(',');
    loop: for (let i = 0, l = groupArray.length; i < l; i++) {
        if (isValidVlanId(groupArray[i])) {
            if(hash[groupArray[i]]){
                ret = true;
                break;
            }else{
                hash[groupArray[i]] = 1;
            }
        }else{
            const [start, end] = groupArray[i].split('-');
            for(let j = Number(start); j <= Number(end); j++){
                if(hash[j]){
                    ret = true;
                    break loop;
                }else{
                    hash[j] = 1;
                }
            }
        }
    }
    return ret;
}