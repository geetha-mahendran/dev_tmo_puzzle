import { Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {STOCK_CONST, DropDownDateRange} from '../stock.constant';
import { debounceTime,takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs'
@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  destroy: Subject<void> = new Subject<void>();
  timePeriods :Array<DropDownDateRange> =  STOCK_CONST.DateRange_Value.sort((a,b) => {
    return a.order - b.order;
  })
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      period: [null, Validators.required]
    });
    this.stockPickerForm.get('period').setValue('1m');
  }

  ngOnInit() {
    this.stockPickerForm.valueChanges
    .pipe(debounceTime(500),
    takeUntil(this.destroy)
    )
    .subscribe(value => this.fetchQuote(value));
  }

  fetchQuote(value) {
    if (this.stockPickerForm.valid) {
      const { symbol, period } = value
      this.priceQuery.fetchQuote(symbol, period);
    }
  }

  ngOnDestroy(){
    this.destroy.next();
    this.destroy.complete();
  }
}
