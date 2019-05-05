import axios from 'axios';
import { Message, Loading } from 'element-ui';
import router from './router.js'

let loading;
function startLoading(){
    loading = Loading.service({
        lock:true,
        text:"加载中...",
        background:'rgba(0,0,0,.75)'
    })
}
function endLoading(){
    loading.close();
}

//请求拦截
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    startLoading();
    // console.log(config)

    let token = window.localStorage.token;
    if(token){//设置统一的header
      config.headers.Authorization = token;
    }

    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });
 //响应拦截
// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response)
    endLoading();
    return response;
  }, function (error) {
    // Do something with response error
    endLoading();
    // console.log(error)
    // console.log(error.response)
    Message({
        message:error.response.data,
        type:'error',
        showClose:true,
    })

    const { status } = error.response;
    if(status == 401){
      localStorage.removeItem('token');
      Message({
        message: 'token失效，请重新登录！',
        type: 'error',
        showClose: true,
      })
      router.push('/login');
    }

    return Promise.reject(error);
  });

export default axios;