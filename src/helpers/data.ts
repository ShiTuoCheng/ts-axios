import { isPlainObject } from "./utils";

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data !== 'string') return;

  try {
    data = JSON.parse(data);
  } catch (error) {
    console.error('transform data' + error.message);
  }

  return data;
}