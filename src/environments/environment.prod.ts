import { environment as env } from '../../extra/bit/environment.prod';

export const environment = {
  production: true,
  Map: env.Map,
  NestServerUrl: env.NestServerUrl,
  BaseServerUrl: env.BaseServerUrl
};
