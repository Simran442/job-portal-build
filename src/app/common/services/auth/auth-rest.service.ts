import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { FormGroup, FormControl } from "@angular/forms";
import { ApiService } from '../../../common/services/rest-api/api.service';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class AuthRestService {

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
   * Generic Post Method
   * @param apiUrl api url
   * @param data request data
   */
  public postApiWitoutToken(apiUrl: string, data: any) {
    return this.apiService.postApiWitoutToken(apiUrl, data)
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
   * Generic PUT Method
   * @param apiUrl api url
   * @param data request data
   */
  public putApiWitoutToken(apiUrl: string, data: any) {
    return this.apiService.putApiWitoutToken(apiUrl, data)
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
  * Function to import docs list
  */
  public uploadDocs(apiUrl: string, data: any) {
    return this.apiService.sendFormData(apiUrl, data)
      .toPromise()
      .then((res: any) => {
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
   * Generic Get Method
   * @param apiUrl api url
   */
  public getApiWitoutToken(apiUrl: string) {
    return this.apiService.getApiWitoutToken(apiUrl)
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

}
