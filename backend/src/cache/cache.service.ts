import {Injectable} from '@nestjs/common';
import {caching} from 'cache-manager';

@Injectable()
export class CacheService {
    private memoryCache;

    constructor() {
        (async () => {
            this.memoryCache = await caching('memory', {
                max: 100,
                ttl: 86400000 // 24 hours in milliseconds
            });
        })();
    }

    async set(key: string, value: any, ttl?: number): Promise<void> {
        await this.memoryCache.set(key, value, ttl);
    }

    async get(key: string): Promise<any> {
        return await this.memoryCache.get(key);
    }

    async del(key: string): Promise<void> {
        await this.memoryCache.del(key);
    }

    async wrap<T>(key: string, fn: () => Promise<T>, ttl?: number): Promise<T> {
        return await this.memoryCache.wrap(key, fn, {ttl});
    }
}
