/**
 * 参考
 * https://www.jianshu.com/p/bdaffff30b31
 */

import sortBy from 'lodash/sortBy'

export function list2Tree(data, rootId, options) {
  const defaultOptions = {
    idKey: 'id',
    pidKey: 'pid',
    childrenKey: 'children',
    childrenSort: undefined,
  }
  const newOptions = Object.assign({}, defaultOptions, options)
  const { idKey, pidKey, childrenKey, childrenSort } = newOptions

  function interceptor (arr) {
    return childrenSort ? sortBy(arr, childrenSort) : arr
  }

  // 递归方法
  function getNode (id) {
    var node = []
    for (var i = 0; i < data.length; i++) {
      const item = { ...data[i] }
      if (item[pidKey] == id) {
        const children = getNode(item[idKey])
        if (children.length > 0) {
           item[childrenKey] = children
        }
        node.push(item)
      }
    }
    return interceptor(node)
  }
  // 使用根节点
  return getNode(rootId)
}

export function findParentsById(dataList, childId) {
  const arr = []

  // 递归方法
  function getData (id) {
    const data = dataList.find(item => item.id === id)
    if (data) {
      if(data.id !== childId) {//排除自身，只要父亲节点
        arr.unshift(data)
      }
      if (data.pid === 0 || !data.pid) {
        return arr
      } else {
        return getData(data.pid)
      }
    } 
    return arr
  }

  getData(childId)

  // 使用根节点
  return arr
}

export function findParentsByIdIncludeSelf(dataList, childId) {
  const arr = []

  // 递归方法
  function getData (id) {
    const data = dataList.find(item => item.id === id)
    if (data) {
      arr.unshift(data)
      if (data.pid === 0 || !data.pid) {
        return arr
      } else {
        return getData(data.pid)
      }
    } 
    return arr
  }

  getData(childId)

  // 使用根节点
  return arr
}


export function setChildrenByCurrentId(dataList, currentId,message) {
  const arr = []

  // 递归方法
  function getData (childList,id) {
    if(childList == undefined) {
			return;
		}
		for(let i = 0;i < childList.length; i++){
			let item = childList[i];
			if(item.id == id) {
				item.children = message;
			} else {
				getData(item.children,currentId);
			}
		}
  }

  getData(dataList,currentId)

}
