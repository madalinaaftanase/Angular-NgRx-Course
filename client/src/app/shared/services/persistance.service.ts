import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
})
export class PersistanceService {
    private isLocalStorageAvailable = typeof localStorage !== 'undefined';

    set(key: string, data: unknown): void {
        try {
            if (this.isLocalStorageAvailable) {
                localStorage.setItem(key, JSON.stringify(data))
            }
        } catch (e) {
            console.error('Error saving to local storage', e)
        }
    }

    get(key: string): unknown {
        try {
            if (this.isLocalStorageAvailable) {
                const localStorageItem = localStorage.getItem(key)
                return localStorageItem ? JSON.parse(localStorageItem) : null
            }
            return null
        } catch (e) {
            console.error('Error getting from local storage', e)
            return null
        }
    }
}
