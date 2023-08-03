import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class DistributionService {

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) { }

  getAll(useCache: boolean = true): Observable<any[]> {
    const cacheKey = 'distributionData';
    
    if (useCache && this.cacheService.has(cacheKey)) {
      return this.cacheService.get(cacheKey);
    }

    return this.http.get<any[]>('https://localhost:7120/api/v1/distribution/histories').pipe(
      tap(data => {
        if (useCache)
          this.cacheService.set(cacheKey, data);
      }),
      catchError(error => {
        console.error('Error fetching data: ', error);
        return of([]);
      }),
      shareReplay(1)
    );
  }

  deploy(): Observable<any> {
    return this.http.put('https://localhost:7120/api/v1/distribution/renqueue-deploy', {}).pipe(
      catchError(error => {
        console.error('Error during deploy: ', error);
        return of(null);
      })
    );
  }
  
}
