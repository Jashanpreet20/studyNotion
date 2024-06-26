import axios from "axios";


export const axiosInstance=axios.create({});

export const ApiConnector= (method,url,bodydata,headers,params) =>{
    return axiosInstance({
        method:method,
        url:`${url}`,
        data:bodydata,
        headers:headers ? headers : null,
        params:params ? params: null,
    })
}
