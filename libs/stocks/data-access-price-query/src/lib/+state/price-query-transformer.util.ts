import { PriceQueryResponse, PriceQuery } from './price-query.type';
import { map, pick } from 'lodash-es';
import { parse } from 'date-fns';
import moment from 'moment';
export function transformPriceQueryResponse(
  response: PriceQueryResponse[]
): PriceQuery[] {
  return map(
    response,
    responseItem =>
      ({
        ...pick(responseItem, [
          'open',
          'high',
          'low',
          'volume',
          'change',
          'changePercent',
          'label',
          'changeOverTime'
        ]),
        date: moment(responseItem.date, 'YYYY-MM-DD').toDate(),
        close: Math.round(responseItem.close),
        dateNumeric: parse(responseItem.date).getTime()
      } as PriceQuery)
  );
}
