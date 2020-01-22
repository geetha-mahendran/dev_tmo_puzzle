import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks.component';
import { ChangeDetectionStrategy } from '@angular/core';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule
} from '@angular/material';
import { SharedUiChartModule } from '@coding-challenge/shared/ui/chart';
import { StocksDataAccessPriceQueryModule } from '@coding-challenge/stocks/data-access-price-query';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { DataPersistence } from '@nrwl/nx';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { assert } from 'chai';

import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

describe('StocksComponent', () => {
  let component: StocksComponent;
  let fixture: ComponentFixture<StocksComponent>;
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
        BrowserAnimationsModule
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
        PriceQueryFacade
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksComponent);
    component = fixture.componentInstance;
    component.stockPickerForm.controls['symbol'].setValue('aapl');
    component.stockPickerForm.controls['period'].setValue('2m');
    fixture.detectChanges();
  });

  it('should create', () => {
    assert.isDefined(component);
  });

  it('should call fetchQuote service', () => {
    component.fetchQuote();
    assert.isTrue(component.stockPickerForm.valid);
  });
});
