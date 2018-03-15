import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class CommunicationService {

  // Observable string sources
  private stopNumberSource = new Subject<string>();

  // Observable string streams
  stopNumberSource$ = this.stopNumberSource.asObservable();

  // Service message commands
  changeStopNumber(stopNumber: string) {
    this.stopNumberSource.next(stopNumber);
  }

}
