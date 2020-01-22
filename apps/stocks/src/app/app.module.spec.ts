import { async, TestBed } from '@angular/core/testing';
import { AppModule } from './app.module';
import { StocksAppConfigToken } from '@coding-challenge/stocks/data-access-app-config';
import { environment } from '../environments/environment';
describe('AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppModule],
      providers: [{ provide: StocksAppConfigToken, useValue: environment }]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(AppModule).toBeDefined();
  });
});
