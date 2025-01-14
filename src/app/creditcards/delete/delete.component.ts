import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeLast, takeUntil } from 'rxjs';
import { CreditcardsService } from 'src/app/srvices/creditcards.service';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.scss']
})

export class DeleteComponent {
creditCardId!: Number;

private destroy$: Subject<void> = new Subject<void>();


  constructor (private router: ActivatedRoute,
    private route: Router,
    private matSnackBar : MatSnackBar,
    private  creditcardsService: CreditcardsService){
    this.creditCardId = parseInt(this.router.snapshot.paramMap.get("id") || ''
  );

    //Delete Functionality
    this.creditcardsService.deleteCreditCard(this.creditCardId)
    .pipe(takeUntil(this.destroy$))
    .subscribe
    ((data:any) => {
      this.showSuccessMessage("Credit Card Deleted Successfully");
        alert("Credit Card Deleted");
        this.route.navigate(['creditcards']);
    })

  }

  showSuccessMessage(message: string){
    this.matSnackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition:'top'
    });
  }

  ngOnDestroy(){
    this.destroy$.next();
    this.destroy$.complete();
  }
}
