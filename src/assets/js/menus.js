import menuJson from './menu-json-new'

//构造菜单
let condructMenuLs = function(dataLs, pid) {
    let self = this;
    let menuLsTemp = [];
    for(let index in dataLs){
        let d = dataLs[index];
        let pidTemp = d.pid ? d.pid : 0;
        if(pidTemp == pid){
            let menuLs = condructMenuLs(dataLs, d.id);
            menuLsTemp.push({
                name:d.menuName,
                labelName: d.labelName,
                id:d.id,
                url:d.menuUrl,
                imgCls:d.icon,
                active:"",
                subLs:menuLs || [],
                rowIndex: d.rowIndex,
                cellIndex: d.cellIndex,
                isDisabled: (d.isDisabled == 1 ? false : true),
                showSub4NewPage: d.showSub4NewPage
            });
        }
    }
    return menuLsTemp;
};

// 如果自己没有配置menuUrl，则用第一个儿子的地址更新地址
function updateMenuUrlWithFirstChildMenuUrl (allMenus, menu) {
  const childrenMenu = allMenus.filter(subItem => subItem.pid === menu.id)
  if (childrenMenu.length && !menu.menuUrl) {
    menu.menuUrl = childrenMenu[0].menuUrl
  }
}

function initMenuUrl (menus) {
  const firstMenus = menus.filter(item => item.pid === 0)
  firstMenus.forEach(item => {
    const secondeMenus = menus.filter(subItem => subItem.pid === item.id)
    const secondeMenusIds = secondeMenus.map(item => item.id)
    const thirdMenus = menus.filter(subItem => secondeMenusIds.includes(subItem.pid))
    const thirdMenusIds = thirdMenus.map(item => item.id)
    for (let item of thirdMenus) {
      updateMenuUrlWithFirstChildMenuUrl(menus, item)
    }
  })
}

// 更新labelName
function updateLabelName (menus) {
  menus.forEach(item => {
    if (!item.labelName && item.menuUrl && item.menuUrl.startsWith('/home/eweb-')) {
      const arr = item.menuUrl.split('/') // '/home/eweb-setting-flow/flow-control'
      if (arr[2]) {
        item.labelName = arr[2]
      }
    }
  })
}

export const findMenuLs = function(axios) {
    return new Promise((resolve, reject) => {
      initMenuUrl(menuJson.result)
      // updateLabelName(menuJson.result)
      return resolve(condructMenuLs(menuJson.result, 0)||[]) // todo delete 测试使用
      console.info("获取菜单开始...");
      axios.get("/api/base/menu/gets").then(res => {
        if (res.data.success) {
          let menus = condructMenuLs(res.data.result||[], 0)||[];
          resolve(menus);
        } else {
          resolve([]);
        }
        console.info("获取菜单完成...");
      }).catch(error => {
        console.info("获取菜单异常...");
        resolve([]);
      });
    });
 };


