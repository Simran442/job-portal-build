import { Constants } from './common/Constants';

export class AppApi {
    static loginUrl = Constants.baseUrl + 'login';
    static registerUrl = Constants.baseUrl + 'register';
    static forgetUrl = Constants.baseUrl + 'forgotPassword';
    static jobsUrl = Constants.baseUrl + 'jobs';
    static UsersUrl = Constants.baseUrl + 'user';
    static UsersJobUrl = Constants.baseUrl + 'userJob';
    static applyJobsUrl = Constants.baseUrl + 'apply-job';
    static viewJobs = Constants.baseUrl + 'view-job';
    static topAppliedJobs = Constants.baseUrl + 'get-recent-applied-job';
}
