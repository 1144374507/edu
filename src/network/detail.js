import request from './request'

export function getDetail(iid) {
  request({
    url: "/detail",
    params: {
      iid,
    }
  })
}