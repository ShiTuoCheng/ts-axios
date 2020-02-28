import { ResolvedFn, RejectedFn, AxiosInterceptorManager } from "../types";

interface Interceptor<T> {
  resolvedFn: ResolvedFn<T>
  rejectedFn?: RejectedFn
}

export class InterceptorManager<T> {
  private interceptors: (Interceptor<T> | null)[];

  constructor() {
    this.interceptors = [];
  }

  use(resolvedFn: ResolvedFn<T>, rejectedFn?: RejectedFn): number {
    this.interceptors.push({
      resolvedFn, 
      rejectedFn
    });
    return this.interceptors.length - 1;
  }

  forEach(fn: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach(interceptor => {
      interceptor && fn(interceptor);
    });
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }
}