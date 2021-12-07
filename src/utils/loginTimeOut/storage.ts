export default {
  setLocalStorageItem<T = any>(key: string, value: T) {
    const newValue = value ? JSON.stringify(value) as string : null;
    newValue && window.localStorage.setItem(key, newValue);
  },
  getLocalStorageItem<T = any, V = any>(key: string, defaultValue?: T): string | null | T {
    let value = window.localStorage.getItem(key)
    let newValue: any = null;
    try {
      value && (newValue = JSON.parse(value));
    } catch (error) {
      console.log(error)
    }
    return newValue || defaultValue;
  },
  removeLocalStorageItem(key: string) {
    window.localStorage.removeItem(key)
  },
  clearLocalStorage() {
    window.localStorage.clear();
  },
  setSessionStorageItem<T = any>(key: string, value: T) {
    const newValue = value ? JSON.stringify(value) as string : null;
    newValue && window.localStorage.setItem(key, newValue);
  },
  getSessionStorageItem<T = any, V = any>(key: string,  defaultValue?: T): string | null | T {
    let value = window.localStorage.getItem(key)
    let newValue: any = null;
    try {
      value && (newValue = JSON.parse(value));
    } catch (error) {
      console.log(error)
    }
    return newValue || defaultValue;
  },
  removeSessionStorageItem(key: string) {
    window.sessionStorage.removeItem(key)
  },
  clearSessionStorage() {
    window.sessionStorage.clear();
  }
}