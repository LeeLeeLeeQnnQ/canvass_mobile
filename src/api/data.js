import axios from '@/js/api.request.js'


// 获取厨房列表 无权限
export const getKitchenList = () => {
  return axios.request({
    url: '/api/Index/getKitchenList',
    method: 'get'
  })
}


// 获取招商经理
export const getLeasingList = () => {
  const data = { group_id: '8' }
  return axios.request({
    url: '/api/Index/getEmployeeList',
    data,
    method: 'post'
  })
}


// 获取店铺运营
export const getManageList = () => {
  const data = { group_id: '7' }
  return axios.request({
    url: '/api/Index/getEmployeeList',
    data,
    method: 'post'
  })
}


/*
  获取厨房下的档口列表
*/
/*
  kitchen_id
*/
export const getStoreNoList = ( obj ) => {
  return axios.request({
    url: '/api/Index/getStoreNo',
    params: obj,
    method: 'get'
  })
}

// 
export const uploadImg = (data) => {
  return axios.request({
    url: '/api/index/upload',
    data,
    method: 'POST',
  })
}

// 获取全部商户
export const getAllShopList = ( info ) => {
  return axios.request({
    url: '/api/StoreLease/index',
    params: info,
    method: 'get'
  })
}