import Cookie from 'js-cookie'
export default function (app) {
  const axios = app.$axios
  // 基本配置
  axios.defaults.timeout = 10000
  axios.defaults.headers.post['Content-Type'] = 'application/json'
  axios.defaults.headers.patch['Content-Type'] = 'application/json'
  axios.defaults.headers.put['Content-Type'] = 'application/json'

  // 请求回调
  axios.onRequest((config) => {
    console.log(config)
    const token = Cookie.get('token')
    config.headers.Authorization = `Bearer ${token}`
  })

  // 返回回调
  axios.onResponse((res) => {
      console.log(res)
    if (res.headers.refreshtoken) {
      Cookie.set('token', res.headers.refreshtoken)
    }
  })

  // 错误回调
  axios.onError((error) => {
    switch (error.response.status) {
      case 401:
        location.href = '/login'
        break
    }
  })
}