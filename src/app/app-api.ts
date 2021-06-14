import { Constants } from './common/Constants';

export class AppApi {
    static loginUrl = Constants.baseUrl + 'login';
    static registerUrl = Constants.baseUrl + 'register'
    static forgetUrl = Constants.baseUrl + 'forgotPassword'
}
