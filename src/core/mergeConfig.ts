import { AxiosRequestConfig } from "../types";
import { isPlainObject, deepMerge } from "../helpers/utils";

const strats = Object.create(null);
const config = Object.create(null);
const stratKeyFromVal2 = ['url', 'params', 'data'];
const deepMergeStratKey = ['header'];

function defaultStrat (val1: any, val2: any): any {
  return val2 === void 0 ? val1 : val2;
};

function stratFromVal2(val1: any, val2: any): any {
  if (val2 !== void 0) {
    return val2;
  }
}

function deepMergeStrat(val1: any, val2: any) : any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (val2 !== void 0) {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (val1 !== void 0) {
    return val1;
  }
}

deepMergeStratKey.forEach(key => {
  strats[key] = deepMergeStrat;
});

stratKeyFromVal2.forEach(key => {
  strats[key] = stratFromVal2;
})

export default function mergeConfig (
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) {
    config2 = {};
  }

  for (const key in config2) {
    mergeField(key);
  }
  
  for (const key in config1) {
    if (config2[key] === void 0) {
      mergeField(key);
    }
  }

  function mergeField (key: string) {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }

  return config;
}