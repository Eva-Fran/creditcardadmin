import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditcardsService {


  deleteCreditCard(creditCardId: Number):Observable<void>{
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
