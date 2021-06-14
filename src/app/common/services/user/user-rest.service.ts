import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { ApiService } from '../../../common/services/rest-api/api.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class UserRestService {
  constructor(private apiService: ApiService) {
  }

  /**
   * Generic Get Method
   * @param apiUrl api url
   */
  public getApi(apiUrl: string) {
    return this.apiService.getApi(apiUrl)
      .toPromise().then((res: any) => {
        return res;
    }).catch(error => {
      let badRequestError = {
        success: false,
        data: null,
        message: "Server Error, Something went wrong!"
      };
      return badRequestError;
    });
  }  

  /**
   * Generic Post Method
   * @param apiUrl api url
   * @param data request data
   */
  public postApi(apiUrl: string, data: any) {
    return this.apiService.postApi(apiUrl, data)
      .toPromise().then((res: any) => {
        return res;
      }).catch(error => {
        let badRequestError = {
          success: false,
          data: null,
          message: "Server Error, Something went wrong!"
        };
        return badRequestError;
      });
  }

  /**
   * Generic PUT Method
   * @param apiUrl api url
   * @param data request data
   */
  public putApi(apiUrl: string, data: any) {
    return this.apiService.putApi(apiUrl, data)
      .toPromise().then((res: any) => {
        return res;
      }).catch(error => {
        let badRequestError = {
          success: false,
          data: null,
          message: "Server Error, Something went wrong!"
        };
        return badRequestError;
      });
  }

  /**
   * Generic Post Form Data Method
   * @param apiUrl api url
   * @param data request data
   */
  public sendFormData(apiUrl: string, data: any) {
    return this.apiService.sendFormData(apiUrl, data)
      .toPromise().then((res: any) => {
        return res;
      }).catch(error => {
        let badRequestError = {
          success: false,
          data: null, 
          message: "Server Error, Something went wrong!"
        };
        return badRequestError;
      });
  }

  /**
   * Generic Delete Method
   * @param apiUrl api url
   */
  public delete(apiUrl: string) {
    return this.apiService.delete(apiUrl)
      .toPromise()
      .then((res) => res);
  }

}
