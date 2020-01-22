export type PriceQuery = {
  date: Date;
  dateNumeric: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  change: number;
  changePercent: number;
  label: string;
  changeOverTime: number;
};

export type PriceQueryResponse = {
  date: Date;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
  uOpen: number;
  uClose: number;
  uHigh: number;
  uLow: number;
  uVolume: number;
  change: number;
  changePercent: number;
  label: string;
  changeOverTime: number;
};
export interface DateRange  {
  startDate: Date;
  endDate: Date;
}