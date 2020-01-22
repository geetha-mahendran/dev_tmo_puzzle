import { StocksAppConfigToken } from './stocks-app-data-token.constant';
import { async, TestBed } from '@angular/core/testing';
describe('StocksAppConfigToken', () => {
  let config: any;
  const environmentConfig = {
    production: false,
    apiKey: 'test token',
    apiURL: 'https://testurl.com'
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: StocksAppConfigToken,
          useValue: environmentConfig
        }
      ]
    }).compileComponents();
  }));

  it('should define StocksAppConfigToken', () => {
    config = TestBed.get(StocksAppConfigToken);
    expect(config).toBeDefined();
    expect(config.apiURL).toBe(environmentConfig.apiURL);
  });
});
