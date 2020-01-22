export type DropDownDateRange = { viewValue: string; value: string; order: number };
export const STOCK_CONST = {
    DateRange_Value: [
        { viewValue: 'All available data', value: 'max', order: 8 },
        { viewValue: 'Five years', value: '5y', order: 7 },
        { viewValue: 'Two years', value: '2y', order: 6 },
        { viewValue: 'One year', value: '1y', order: 5 },
        { viewValue: 'Year-to-date', value: 'ytd', order: 4 },
        { viewValue: 'Six months', value: '6m', order: 3 },
        { viewValue: 'Three months', value: '3m', order: 2 },
        { viewValue: 'One month', value: '1m', order: 1 }
      ]
}
