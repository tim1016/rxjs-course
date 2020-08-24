import { Observable } from 'rxjs';
import * as e from 'express';
import { RepositionScrollStrategy } from '@angular/cdk/overlay';

export function createHttpObservable(url: string): Observable<any> {
  return Observable.create(observer => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetch(url, { signal })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          observer.error('request failed with error code' + response.status);
        }
      })
      .then(body => {
        observer.next(body);
        observer.complete();
      })
      .catch(error => {
        observer.error(error);
      });

    return () => controller.abort();
  });
}
