import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private _storage: Storage | null = null;
    private _initPromise: Promise<void>;

    constructor(private storage: Storage) {
        this._initPromise = this.init();
    }

    async init() {
        this._storage = await this.storage.create();
    }

    async set(key: string, value: any): Promise<void> {
        await this._initPromise;
        await this._storage?.set(key, value);
    }

    async get(key: string): Promise<any> {
        await this._initPromise;
        return await this._storage?.get(key);
    }

    async remove(key: string): Promise<void> {
        await this._initPromise;
        await this._storage?.remove(key);
    }
}
