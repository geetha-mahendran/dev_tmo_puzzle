import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoogleChartsModule } from 'angular-google-charts';
import { ChartComponent } from './chart.component';
import { of } from 'rxjs';
describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ChartComponent],
      imports: [GoogleChartsModule.forRoot()]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.data$ = of([
      ['12/1/2019', 10],
      ['12/1/2019', 10],
      ['12/1/2019', 10]
    ]);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const spy = jest.spyOn(component.destroy, 'complete');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
