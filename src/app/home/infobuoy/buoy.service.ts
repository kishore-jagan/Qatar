import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuoyService {
  private buoyClickedSource = new Subject<string>();

  buoyClicked$ = this.buoyClickedSource.asObservable();

  notifyBuoyClicked(buoyName: string) {
    this.buoyClickedSource.next(buoyName);
  }
}
