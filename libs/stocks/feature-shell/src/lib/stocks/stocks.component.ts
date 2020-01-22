import { Component, OnInit, OnDestroy, ChangeDetectionStrategy} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';
import {STOCK_CONST, DropDownDateRange} from '../stock.constant';
import { debounceTime,takeUntil } from 'rxjs/operators';
import { Subject} from 'rxjs'
import moment from 'moment';
@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  stockPickerForm: FormGroup;
  quotes$ = this.priceQuery.priceQueries$;
  maxDate = moment().toDate();
  minEndDate: Date = new Date();
  destroy: Subject<void> = new Subject<void>();
  timePeriods :Array<DropDownDateRange> =  STOCK_CONST.DateRange_Value.sort((a,b) => {
    return a.order - b.order;
  })
  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: ['', Validators.required],
      startDate: [
        moment()
          .subtract(1, 'years')
          .toDate()
      ],
      endDate: [new Date()]
    });
    this.minEndDate = this.stockPickerForm.value.startDate;
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
      const { symbol, startDate, endDate } = value;
      this.priceQuery.fetchQuote(symbol, {
        startDate: startDate,
        endDate: endDate
      });
    }
  }
  OnChange(event: any) {
    if (event.value > this.stockPickerForm.value.endDate) {
      this.stockPickerForm.controls['endDate'].setValue(event.value);
    }
    this.minEndDate = this.stockPickerForm.value.startDate;
  }
  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
