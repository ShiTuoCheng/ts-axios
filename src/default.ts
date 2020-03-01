import { AxiosRequestConfig } from "./types";

const defaultConfig: AxiosRequestConfig = {
  method: 'get',
  timeout: 0,
  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    },
  }
}

const methodsWithNoData = ['get', 'delete', 'head', 'options'];

methodsWithNoData.forEach(method => {
  defaultConfig.headers[method] = {};
});

const methodsWithData = ['put', 'post', 'put', 'patch'];

methodsWithData.forEach(method => {
  defaultConfig.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
});

export default defaultConfig;