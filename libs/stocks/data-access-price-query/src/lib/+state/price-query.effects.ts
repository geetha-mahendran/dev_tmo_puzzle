import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  StocksAppConfig,
  StocksAppConfigToken
} from '@coding-challenge/stocks/data-access-app-config';
import { Effect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/nx';
import { map } from 'rxjs/operators';
import {
  FetchPriceQuery,
  PriceQueryActionTypes,
  PriceQueryFetched,
  PriceQueryFetchError
} from './price-query.actions';
import { PriceQueryPartialState } from './price-query.reducer';
import { PriceQueryResponse } from './price-query.type';
import moment from 'moment';
@Injectable()
export class PriceQueryEffects {
  @Effect() loadPriceQuery$ = this.dataPersistence.fetch(
    PriceQueryActionTypes.FetchPriceQuery,
    {
      run: (action: FetchPriceQuery, state: PriceQueryPartialState) => {
        return this.httpClient
          .get(
            `${this.env.apiURL}/beta/stock/${action.symbol}/chart/${
              this.env.period
            }?token=${this.env.apiKey}`
          )
          .pipe(
            map(resp => {
              if (action.dateRange) {
                return new PriceQueryFetched(
                  (resp as PriceQueryResponse[]).filter(
                    value =>
                      moment(value.date, STOCK_CONSTANT.API_DATE_FORMAT).toDate() >=
                        action.dateRange.startDate &&
                      moment(value.date, STOCK_CONSTANT.API_DATE_FORMAT).toDate() <=
                        action.dateRange.endDate
                  )
                );
              } else {
                return new PriceQueryFetched(resp as PriceQueryResponse[]);
              }
            })
          );
      },
      onError: (action: FetchPriceQuery, error) => {
        return new PriceQueryFetchError(error);
      }
    }
  );

  constructor(
    @Inject(StocksAppConfigToken) private env: StocksAppConfig,
    private httpClient: HttpClient,
    private dataPersistence: DataPersistence<PriceQueryPartialState>
  ) {}
}

export const STOCK_CONSTANT: any = {
  API_DATE_FORMAT : 'YYYY-MM-DD'
};