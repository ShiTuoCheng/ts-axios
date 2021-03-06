import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "../types";
import { xhr } from "./xhr";
import { buildUrl } from "../helpers/url";
import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders, flattenHeaders } from '../helpers/headers';

function dispatchRequest (config: AxiosRequestConfig): AxiosPromise {
  processConfig(config);
  return xhr(config).then(res => {
    return transformResponseData(res);
  });
}

function processConfig (config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config);
  config.data = transformRequestData(config);
  config.headers = flattenHeaders(config.headers, config.method!);
}

function transformURL (config: AxiosRequestConfig): string {
  const {params, url} = config;
  return buildUrl(url!, params);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res
}

function transformRequestData (config: AxiosRequestConfig): any {
  const {data} = config;
  return transformRequest(data);
}

function transformHeaders (config: AxiosRequestConfig): any {
  const {headers = {}, data} = config;
  return processHeaders(headers, data);
}

export default dispatchRequest