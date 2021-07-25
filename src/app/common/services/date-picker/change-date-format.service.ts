import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // add toster service
import { HttpClient } from '@angular/common/http';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


@Injectable()
export class ChangeDateFormatService {
  dateDay: string | number;
  dateMonth: string | number;
  dateYear: string | number;

  FullYear: string | number;
  currentDate = new Date();

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastrService: ToastrService,
  ) {
  }

  /**
   * @description : This Function is used date format separator.
   * @params : dateFormat
   * @return date object
   */
  getDateFormatDelimeters(dateFormat) {
    return dateFormat.match(/[^(dmy)]{1,}/g);
  }

  isValidDate(dt) {
    return dt instanceof Date;
  }

  getTimeInMilliseconds(someDate) {
    const objDate = someDate.split('-');
    return this.getDate(parseInt(objDate[0]), parseInt(objDate[1]), parseInt(objDate[2])).getTime();
  }

  getDate(year, month, day) {
    return new Date(year, month - 1, day, 0, 0, 0, 0);
  }

  /**
   * Following function return date in string format dd-mm yyyy
   * @param dateValue :dateobj accepted as date obj. we are returning the object into string
   */
  convertDateObjectToString(dateValue: any) {
    const dateValueUpdated = dateValue.date;
    if (dateValueUpdated != null && dateValueUpdated !== '' && dateValueUpdated !== undefined) {
      let dayVal;
      let monVal;
      if (dateValueUpdated.day >= 10) {
        dayVal = dateValueUpdated.day;
      } else {
        dayVal = '0' + dateValueUpdated.day;
      }
      if (dateValueUpdated.month >= 10) {
        monVal = dateValueUpdated.month;
      } else {
        monVal = '0' + dateValueUpdated.month;
      }
      const finalDate = dateValueUpdated.year + '-' + monVal + '-' + dayVal;
      return finalDate;
    } else {
      return null;
    }
  }

  /**
   * Following function return time in string format hh:mm
   * @param timeValue :timeobj accepted as time obj. we are returning the object into string
   */
  convertTimeObjectToString(timeValue: any) {
    if (timeValue != null && timeValue !== '' && timeValue !== undefined) {
      let hourVal;
      let minVal;
      if (timeValue.hour >= 10) {
        hourVal = timeValue.hour;
      } else {
        hourVal = '0' + timeValue.hour;
      }
      if (timeValue.minute >= 10) {
        minVal = timeValue.minute;
      } else {
        minVal = '0' + timeValue.minute;
      }
      const finalTime = hourVal + ':' + minVal;
      return finalTime;
    } else {
      return null;
    }
  }

  /**
   * Following function return date string in object format
   * @param strDate : date will accepted as a string format.
   */
  convertStringDateToObject(strDate: string) {
    if (strDate != null && strDate !== '' && strDate !== undefined) {
      const objDate = strDate.split('-');
      let mnth;
      mnth = parseInt(objDate[1], 10);
      if (mnth.toString() === 'NaN') {
        const monthLabels = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, May: 5, Jun: 6, Jul: 7, Aug: 8, Sep: 9, Oct: 10, Nov: 11, Dec: 12 };
        mnth = monthLabels[objDate[0]];
      }
      return {
        date: {
          year: parseInt(objDate[0], 10),
          month: parseInt(mnth),
          day: parseInt(objDate[2], 10)
        }
      };
    } else {
      return null;
    }
  }

  /**
   * Following function return time string in object format
   * @param strTime : time will accepted as a string format.
   */
  convertStringTimeToObject(strTime: string) {
    if (strTime != null && strTime !== '' && strTime !== undefined) {
      const objDate = strTime.split(':');
      return {
        hour: parseInt(objDate[0], 10),
        minute: parseInt(objDate[1], 10)
      };
    } else {
      return null;
    }
  }

  formatDateObject(date) {
    return {
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate()
      }
    };
  }

  formatTime(strTime) {
    if (strTime != null && strTime !== '' && strTime !== undefined) {
      const firstTimeObjTime = strTime.split(':');
      const finalValue = firstTimeObjTime[0] + ':' + firstTimeObjTime[1];
      return finalValue;
    }
  }

  /**
   * Following function return time in string format hh:mm
   * @param timeValue :timeobj accepted as time obj. we are returning the object into string
   */
  compareTime(firstTimeValue: any, secondTimeValue: any) {
    if ((firstTimeValue != null && firstTimeValue !== '' && firstTimeValue !== undefined) &&
      (secondTimeValue != null && secondTimeValue !== '' && secondTimeValue !== undefined)) {
      const firstTimeObjTime = firstTimeValue.split(':');
      const secondTimeObjTime = secondTimeValue.split(':');
      let firstTimeHourValue;
      let firstTimeMinuteValue;
      let finalFirstTimeValue;
      let secondTimeHourValue;
      let secondTimeMinuteValue;
      let finalSecondTimeValue;

      if (parseInt(firstTimeObjTime[0], 10) >= 10) {
        firstTimeHourValue = parseInt(firstTimeObjTime[0], 10);
      } else {
        firstTimeHourValue = '0' + parseInt(firstTimeObjTime[0], 10);
      }
      if (parseInt(firstTimeObjTime[1], 10) >= 10) {
        firstTimeMinuteValue = parseInt(firstTimeObjTime[1], 10);
      } else {
        firstTimeMinuteValue = '0' + parseInt(firstTimeObjTime[1], 10);
      }
      finalFirstTimeValue = firstTimeHourValue + ':' + firstTimeMinuteValue;

      if (parseInt(secondTimeObjTime[0], 10) >= 10) {
        secondTimeHourValue = parseInt(secondTimeObjTime[0], 10);
      } else {
        secondTimeHourValue = '0' + parseInt(secondTimeObjTime[0], 10);
      }
      if (parseInt(secondTimeObjTime[1], 10) >= 10) {
        secondTimeMinuteValue = parseInt(secondTimeObjTime[1], 10);
      } else {
        secondTimeMinuteValue = '0' + parseInt(secondTimeObjTime[1], 10);
      }
      finalSecondTimeValue = secondTimeHourValue + ':' + secondTimeMinuteValue;
      if (finalFirstTimeValue >= finalSecondTimeValue) {
        return true;
      } else {
        return false;
      }
    } else {
      return null;
    }
  }


  // Convert a time in hh:mm format to minutes
  timeToMins(time) {
    const b = time.split(':');
    return b[0] * 60 + +b[1];
  }

  // Convert minutes to a time in format hh:mm
  // Returned value is in range 00  to 24 hrs
  timeFromMins(mins) {
    function z(n) { return (n < 10 ? '0' : '') + n; }
    const h = (mins / 60 | 0) % 24;
    const m = mins % 60;
    return z(h) + ':' + z(m) + ':00';
  }

  // Add two times in hh:mm format
  addTimes(t0, t1) {
    return this.timeFromMins(this.timeToMins(t0) + this.timeToMins(t1));
  }

  /**
   * Following function return time in string format hh:mm
   * @param firstTimeValue :timeobj accepted as time obj. we are returning the object into string
   */
  getTimeDiff(firstTimeValue: any, secondTimeValue: any) {
    if ((firstTimeValue != null && firstTimeValue !== '' && firstTimeValue !== undefined) &&
      (secondTimeValue != null && secondTimeValue !== '' && secondTimeValue !== undefined)) {
      const firstTimeObjTime = firstTimeValue.split(':');
      const secondTimeObjTime = secondTimeValue.split(':');
      let firstTimeHourValue;
      let firstTimeMinuteValue;
      let finalFirstTimeValue;
      let secondTimeHourValue;
      let secondTimeMinuteValue;
      let finalSecondTimeValue;
      let finalTimeValue;

      if (parseInt(firstTimeObjTime[0], 10) >= 10) {
        firstTimeHourValue = parseInt(firstTimeObjTime[0], 10);
      } else {
        firstTimeHourValue = '0' + parseInt(firstTimeObjTime[0], 10);
      }
      if (parseInt(firstTimeObjTime[1], 10) >= 10) {
        firstTimeMinuteValue = parseInt(firstTimeObjTime[1], 10);
      } else {
        firstTimeMinuteValue = '0' + parseInt(firstTimeObjTime[1], 10);
      }
      finalFirstTimeValue = new Date();
      finalFirstTimeValue.setHours(firstTimeHourValue);
      finalFirstTimeValue.setMinutes(firstTimeMinuteValue);
      if (parseInt(secondTimeObjTime[0], 10) >= 10) {
        secondTimeHourValue = parseInt(secondTimeObjTime[0], 10);
      } else {
        secondTimeHourValue = '0' + parseInt(secondTimeObjTime[0], 10);
      }
      if (parseInt(secondTimeObjTime[1], 10) >= 10) {
        secondTimeMinuteValue = parseInt(secondTimeObjTime[1], 10);
      } else {
        secondTimeMinuteValue = '0' + parseInt(secondTimeObjTime[1], 10);
      }
      finalSecondTimeValue = new Date();
      finalSecondTimeValue.setHours(secondTimeHourValue);
      finalSecondTimeValue.setMinutes(secondTimeMinuteValue);
      let diff = finalSecondTimeValue.getTime() - finalFirstTimeValue.getTime();
      firstTimeValue = Math.floor(diff / (1000 * 60 * 60));
      diff -= firstTimeValue * (1000 * 60 * 60);
      secondTimeValue = Math.floor(diff / (1000 * 60));
      diff -= secondTimeValue * (1000 * 60);
      finalTimeValue = firstTimeValue + ':' + secondTimeValue;
      return finalTimeValue;
    } else {
      return null;
    }
  }

  /**
   * Function to convert time hours string to minuts
   * @param timeString timeString
   */
  convertHoursToMin(timeString) {
    if ((timeString != null && timeString !== '' && timeString !== undefined)) {
      const splitTimeString = timeString.split(':');
      const timeInMins = parseInt(splitTimeString[0], 10) * 60 + parseInt(splitTimeString[1], 10);
      return timeInMins;
    } else {
      return null;
    }
  }

  timeConvertor(time) {
    if (time) {
      const PM = time.match('PM') ? true : false;
      time = time.split(':');
      let min; let hour;
      if (PM) {
        hour = 12 + parseInt(time[0], 10);
        min = time[1].replace('PM', '');
      } else {
        hour = time[0];
        min = time[1].replace('AM', '');
      }
      return 'T' + hour + ':' + min;
    } else {
      return null;
    }
  }

  timeConvertorTo12HoursFormat(time) {
    if (time) {
      const PM = time.match('PM') ? true : false;
      time = time.split(':');
      let min;
      let hour;
      if (PM) {
        hour = 12 + parseInt(time[0], 10);
        min = time[1].replace('PM', '');
      } else {
        hour = time[0];
        min = time[1].replace('AM', '');
      }
      return hour + ':' + min;
    } else {
      return null;
    }
  }

  /**
   * Function to compare two dates
   * @param startDate startDate
   * @param endDate endDate
   */
  compareTwoDates(startDate, endDate) {
    // covert end date to unix time stamp
    if ((startDate !== '' && startDate !== undefined) && (endDate !== '' && endDate !== undefined)) {
      const theStartDate = Math.round(this.getTimeInMilliseconds(startDate) / 1000.0);
      // covert end date to unix time stamp
      const theEndDate = Math.round(this.getTimeInMilliseconds(endDate) / 1000.0);
      if (new Date(theEndDate) < new Date(theStartDate)) {
        return false;
      } else {
        return true;
      }
    }
  }

  /**
   * Function to convert date string to Nov,15,2019 formate
   * @param dateString
   */
  changeDateByMonthName(DateString) {
    if (DateString) {
      const monthLabels = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep',
        10: 'Oct', 11: 'Nov', 12: 'Dec'
      };
      const dateArr = DateString.split('/');
      let day = dateArr[1];
      const month = monthLabels[parseInt(dateArr[0], 10)];
      const year = dateArr[2];
      if (day.length < 2) {
        day = '0' + day;
      }
      if (month === undefined) {
        return DateString;
      }
      if (day === 'NaN' || month === 'NaN' || year.toString() === 'NaN') {
        return '';
      } else {
        return month + ' ' + day + ', ' + year;
      }
    } else {
      return '';
    }
  }

  /**
   * Function to formate date
   * @param dateTimeString 
   */
  dateFormate(dateTimeString) {
    if (dateTimeString) {
      dateTimeString = dateTimeString.split('T');
      dateTimeString = dateTimeString[0];
      const monthLabels = {
        1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep',
        10: 'Oct', 11: 'Nov', 12: 'Dec'
      };
      const dateArr = dateTimeString.split('-');
      let day = dateArr[2];
      let month = dateArr[1];
      const year = dateArr[0];
      if (day.length < 2) {
        day = '0' + day;
      }
      if (month.length < 2) {
        month = '0' + month;
      }
      if (day === 'NaN' || month === 'NaN' || year.toString() === 'NaN') {
        return '';
      } else {
        return day  + '-' + month + '-' + year;
      }
    } else {
      return '';
    }
  }

    /**
   * Function to formate date
   * @param dateTimeString 
   */
     dateFormateByHyphen(dateTimeString) {
      if (dateTimeString) {
        dateTimeString = dateTimeString.split('T');
        dateTimeString = dateTimeString[0];
        const monthLabels = {
          1: 'Jan', 2: 'Feb', 3: 'Mar', 4: 'Apr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Aug', 9: 'Sep',
          10: 'Oct', 11: 'Nov', 12: 'Dec'
        };
        const dateArr = dateTimeString.split('-');
        let day = dateArr[2];
        let month = dateArr[1];
        const year = dateArr[0];
        if (day.length < 2) {
          day = '0' + day;
        }
        if (month.length < 2) {
          month = '0' + month;
        }
        if (day === 'NaN' || month === 'NaN' || year.toString() === 'NaN') {
          return '';
        } else {
          return month  + '/' + day + '/' + year;
        }
      } else {
        return '';
      }
    }

}
