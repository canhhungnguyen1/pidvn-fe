// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: 'http://localhost:8889',
  // baseUrl: 'http://10.92.176.57:8889/pidvn-be',
  baseUrlPhp: 'https://10.92.176.57:8080',
  weatherbit:'https://api.weatherbit.io/v2.0/current?key=ec87ff6a58bf4f92969b0fd823bdc686',
  baseUrlJava: 'http://10.92.176.57:6969',
  baseUrlJavaHttps: 'https://10.92.176.57:6868'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
