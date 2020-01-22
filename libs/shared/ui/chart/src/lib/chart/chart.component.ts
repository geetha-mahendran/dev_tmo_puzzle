import {
  Component,
  Input,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CHART_CONST } from './chart.constant';
@Component({
  selector: 'coding-challenge-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnDestroy {
  @Input() data$: Observable<any>;
  chartData: any;
  chart: any;
  destroy: Subject<void> = new Subject<void>();
  constructor() {}
  ngOnInit() {
    this.chart = {
      title: CHART_CONST.CHART_TITLE,
      type: CHART_CONST.LINE_CHART,
      data: [],
      columnNames: CHART_CONST.CHART_COLUMNS,
      options: {
        title: CHART_CONST.CHART_TITLE,
        width: CHART_CONST.CHART_WIDTH,
        height: CHART_CONST.CHART_HEIGHT,
        hAxis: {
          title: CHART_CONST.HAXIS_TITLE,
          format: CHART_CONST.DATE_FORMAT_MYY
        },
        vAxis: {
          title: CHART_CONST.VAXIS_TITLE,
          format: CHART_CONST.VAXIS_FORMAT
        }
      }
    };
    this.data$.pipe(takeUntil(this.destroy)).subscribe(newData => {
      this.chartData = newData;
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
