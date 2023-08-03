import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ICache } from '../utils/abstracts/cache.interface';

@Injectable({
  providedIn: 'root'
})
export class CacheService implements ICache {

  private cache: Map<string, any> = new Map();
  private cacheTimeout: number = 5000;

  get(key: string): Observable<any> {
    return of(this.cache.get(key));
  }

  set(key: string, value: any): void {
    this.cache.set(key, value);

    setTimeout(() => {
      this.cache.delete(key);
    }, this.cacheTimeout);
  }

  has(key: string): boolean {
    return this.cache.has(key);
  }

  clear(): void {
    this.cache.clear();
  }
  
}
