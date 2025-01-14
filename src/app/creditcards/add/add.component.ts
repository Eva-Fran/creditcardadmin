import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreditCard } from 'src/app/models/credit-card';
import { CreditcardsService } from 'src/app/services/creditcards.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})


export class AddComponent {
  
  private subscription: Subscription | undefined;

  constructor(private creditcardsServie:CreditcardsService, 
    private router: Router ){
}
  newCreditCard: CreditCard = {
    id: 1,
    name: "",
    description: "",
    bankName: "",
    maxCredit: 5000,
    interestRate: 10,
    active: true,
    recommendedScore: "100-500",
    annualFee: 12,
    termsAndConditions: "Terms and Condtitions for the credit card",
    createdDate: Date(),
    updatedDate: Date()

  }
  // id: number;
  //   name: string;
  //   description: string;
  //   bankName: string;
  //   maxCredit: number;
  //   interestRate: number;
  //   active: boolean;
  //   recommendedScore: string;
  //   annualFee: number;
  //   termsAndConditions: string;
  //   createdDate: string;
  //   updatedDate: string;

  


  saveCreditCard(){
    this.subscription = this.creditcardsServie.createCreditCard(this.newCreditCard).subscribe(data =>{
    alert ("New Credit Carad Added");
    this.router.navigate(['creditcards']);
    })   
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
