import axios from '@/js/api.request.js'

export const editShopInfo = (data) => {
  data.lease_type = '1'
  return axios.request({
    url: '/api/StoreLease/edit',
    data,
    method: 'post'
  })
}


export const getShopDetail = (data) => {
  return axios.request({
    url: '/api/StoreLease/show',
    data,
    method: 'post'
  })
}



/*
  新建一家店铺
*/
/*
  kitchen_id: (...)
  kitchen_name: "四道口厨房（二店）"
  manage_id: (...)
  manage_lease: (...)
  manage_lease_id: (...)
  manage_name: (...)
  pay: "https://ocs-attachment.oss-cn-qingdao.aliyuncs.com/4c621/d3934/5c9da084e7488.png"
  shopkeeper: (...)
  shopkeeper_phone: (...)
  store_name: (...)
  store_no: (...)

  rent: Array(1)
  0:
  category_id: (...)
  money: (...)
  quantity: (...)
  remark: (...)
  rent_type: (...)
  title: (...)
*/
/*
  build-kichen -- 添加商铺
*/
export const setKitchen = (data) => {
  data.opinion_type = '1'
  return axios.request({
    url: '/api/StoreLease/add',
    data,
    method: 'post'
  })
}