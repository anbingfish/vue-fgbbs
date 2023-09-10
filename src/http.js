import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

var Loading = {
  reqNum: 0,
  start () {
    if (this.reqNum === 0) {
      NProgress.start()
    }
    this.reqNum++
  },
  end () {
    if (this.reqNum <= 0) {
      return
    }
    this.reqNum--
    if (this.reqNum === 0) {
      NProgress.done()
    }
  }
}

class Request {
  constructor(parms) {
    this.baseURL = parms.baseURL
  }
  async request (params) {
    
  
    let url = params.url || ''
    let method = params.method || 'GET'
    let data = params.body || ''
    let requestUrl = this.baseURL + url;
    let options = {
      method: method,
      // credentials: 'include',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': localStorage.getItem('Authorization')
      },
      body: JSON.stringify(data)
    }
    if (method == 'GET') {
      delete options.body;
      let qs = '?';
      for (const key in params.data) {
        qs += key + '=' + params.data[key] + '&'
      }
      qs = qs.substring(0, qs.length - 1)
      qs.length > 1 ? requestUrl += qs : ''
    }
    try {
      Loading.start()
      const response = await fetch(requestUrl, options)
      const res = await response.json()
      Loading.end()
      return res
    } catch (err) {
      Loading.end()
      ElMessage({
        message:'操作失败，服务器无法访问',
        type: 'error'
      })
      return err
    }

  }
}
const request = new Request({
  baseURL: "http://fgbbs.test:803/api/"
})



export default request
