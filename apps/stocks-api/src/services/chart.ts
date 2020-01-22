import axios from 'axios';
import { environment } from '../environments/environment';
import { APP_CONSTANT } from '../app/app.constant';
import { ChartRequest } from '@coding-challenge/api-model';
export const chartPlugin = {
  name: APP_CONSTANT.STOCKS_PLUGIN_NAME,
  register: async (server) => {
    const getChartData = async (request: ChartRequest) => {
      let priceQueryRes: any = {};
      try {
        priceQueryRes = await axios
          .get(
            `${environment.apiURL}/stable/stock/${request.symbol}/chart/${
              request.period
            }?token=${environment.apiKey}`
          )
      } catch (error) {
        console.log('Error Occured while fetching data');
        throw error;
      }
      return priceQueryRes.data;
    };
    const chartCache = server.cache({
      cache: APP_CONSTANT.SERVER_CACHE,
      expiresIn: 10 * 1000,
      segment: APP_CONSTANT.SERVER_SEGMENT,
      generateFunc: async (cacherequest: ChartRequest) => {
        const cachedResponse = await getChartData(cacherequest);
        return cachedResponse;
      },
      generateTimeout: APP_CONSTANT.CACHE_RESPONSE_TIME_OUT
    });
    server.route({
      method: APP_CONSTANT.API_METHOD_POST,
      path: APP_CONSTANT.STOCK_PLUGIN_PATH,
      handler: async (apiRequest) => {
        const { symbol, period }: any = apiRequest.payload;
        const id = `${symbol}:${period}`;
        return await chartCache.get({ id, symbol, period });
      },
      options: {
        cache: {
          expiresIn: 20000,
          privacy: 'private'
        }
      }
    });
  }
};
