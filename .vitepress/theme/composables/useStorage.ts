import type { Storage } from '../enums'

export function setStorage(key: Storage, value: any) {
  localStorage[key] = value
}

export function getStorage(key: Storage) {
  return localStorage[key]
}
