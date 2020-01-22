import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { DataPersistence } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { assert } from 'chai';
import { fakeAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
  let service: PriceQueryFacade;
  let mockPriceQuery = [
    {
      date: '2000-10-20',
      close: 12
    },
    {
      date: '2000-10-20',
      close: 12
    },
    {
      date: '2000-10-20',
      close: 12
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StocksComponent],
      imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        SharedUiChartModule,
        StocksDataAccessPriceQueryModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule
      ],
      providers: [
        {
          provide: StocksAppConfigToken,
          useValue: {
            production: false,
            apiKey: 'testkey',
            apiURL: 'http://testurl'
          }
        },
        DataPersistence,
        {
          provide: PriceQueryFacade,
          useValue: {
            fetchQuote: jest.fn(),
            priceQueries$: of(mockPriceQuery)
          }
        },
        MatDatepickerModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    // component.OnChange = jest.fn();
    service = TestBed.get(PriceQueryFacade);
    component.stockPickerForm.controls['symbol'].setValue('aapl');
    fixture.detectChanges();
  });

  it('should create', () => {
    assert.isDefined(component);
  });

  it('should call fetchQuote service', () => {
    fixture.detectChanges();
    assert.isTrue(component.stockPickerForm.valid);
  });

  it('should call fetchQuote on form edit event', fakeAsync(() => {
    component.stockPickerForm.controls['symbol'].setValue('aapl222');
    component.stockPickerForm.controls['startDate'].setValue(new Date());
    component.stockPickerForm.controls['endDate'].setValue(new Date());
    tick(500);
    fixture.detectChanges();
    const spy = jest.spyOn(service, 'fetchQuote');
    assert.isTrue(component.stockPickerForm.valid);
    expect(spy).toHaveBeenCalled();
  }));

  it('should change the end date if start date is greater than ', () => {
    const testDateValue = new Date('01/10/2020');
    component.stockPickerForm.controls['startDate'].setValue(testDateValue);
    component.stockPickerForm.controls['endDate'].setValue(new Date('01/10/2019'));
    component.OnChange({ value : testDateValue});
    fixture.detectChanges();
    expect(component.stockPickerForm.value.endDate).toEqual(testDateValue);
    expect(component.minEndDate).toEqual(testDateValue);
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroy, 'complete');
    component.ngOnDestroy();
    expect(component.destroy.complete).toHaveBeenCalled();
  });
});
