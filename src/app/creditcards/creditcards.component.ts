import { Component, ViewChild } from '@angular/core';
import { CreditCard } from '../models/credit-card';
import { MatTableDataSource }       from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { CreditcardsService } from '../services/creditcards.service';

@Component({
  selector: 'app-creditcards',
  templateUrl: './creditcards.component.html',
  styleUrls: ['./creditcards.component.scss']
})
export class CreditcardsComponent {

  creditcards: CreditCard[] = [];

  creditCardMaximumAmount: number = 0;

  constructor(private creditcardsService: CreditcardsService){
     this.creditcardsService.getCreditCards().subscribe((data:CreditCard[]) =>{
      // console.log("data:",data)
      this.creditcards = data;

      this.dataSource = new MatTableDataSource(this.creditcards);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
     
      // console.log(this.dataSource.data)

      this.calculateMetrics()
    })
  }

  dataSource = new MatTableDataSource(this.creditcards);
    displayColumns = ["select", "id", "name", "description", "bankName", "maxCredit", "interestRate", "active", "recommendedScore", "actions"];

  //  dataSource = new MatTableDataSource(TABLE_DATA);

   selection = new SelectionModel(true, []);

   @ViewChild( MatPaginator) paginator!: MatPaginator;
   @ViewChild(MatSort) sort! : MatSort

  //  ngAfterViewInit(){
  //    }

   selectHandler(row: CreditCard){
    this.selection.toggle(row as never);
   }
   calculateMetrics(){
    this.creditCardMaximumAmount = this.creditcards.filter (card => card.maxCredit > 3000).length;
    
   }
   
}
