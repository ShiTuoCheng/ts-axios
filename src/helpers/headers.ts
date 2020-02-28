import { isPlainObject } from "./utils";

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach(k => {
    if (
      k !== normalizedName &&
      k.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = headers[k];
        delete headers[k];
    }
  });
}

export function processHeaders (headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type');
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }

  return headers;
}

export function parseHeaders (headers: string): any {
  const result = Object.create(null);
  if (!headers) {
    return result;
  }

  headers.split('\r\n').forEach(header => {
    let [key, val] = header.split(':');
    key = key.trim().toLowerCase()
    if (!key) {
      return;
    }
    if (val) {
      val = val.trim();
    }
    result[key] = val;
  });

  return result
}