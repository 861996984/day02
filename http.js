import Axios from "axios";

var baseURL;

const instance = Axios.create({
    baseURL,
    timeout: 2000,
});
//创建axios实例

// 封装http方法，如果请求成功就把请求到的数据return 如果响应失败就执行失败的catch函数
// data是post的传参  params是get的传参
export default function http(url, method, data = {}, params = {}) {
    return instance({
            url,
            method,
            data,
            params,
        })
        .then((res) => {
            // console.log(res);
            if (res.status >= 200 && res.status < 300) {
                return res;
            } else {
                return Promise.reject(res.data.meta.msg);
                //如果状态码不是200-300的之后就走失败的回调
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

// http.js就是封装的一个 axios请求的方法 后期还要添加一个请求拦截 一个响应拦截