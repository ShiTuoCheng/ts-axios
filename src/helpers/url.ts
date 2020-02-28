import { isDate, isPlainObject } from "./utils";

function encode (val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}

export function buildUrl (url: string, params?: any): string {
  if (!params) {
    return url;
  }

  const parts: string[] = [];

  Object.keys(params).forEach(k => {
    const val = params[k];
    if (val === null || val === void 0) {
      return;
    }

    let values: string[];

    if (Array.isArray(val)) {
      values = val;
      k += '[]';
    } else {
      values = [val];
    }

    values.forEach(v => {
      if (isPlainObject(v)) {
        v = JSON.stringify(v);
      } else if (isDate(v)) {
        v = v.toISOString();
      }
      parts.push(`${k}=${v}`)
    });
  });

  const serializedParams = parts.join('&')

  if (serializedParams) {
    const markIndex = url.indexOf('#')
    if (markIndex !== -1) {
      url = url.slice(0, markIndex)
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
  }

  return url
}