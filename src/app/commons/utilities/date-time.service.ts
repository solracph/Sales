import { Injectable } from "@angular/core";

@Injectable()
export class DateTimeService {

    setTime(date: Date, time: string){
        date = this.resetTime(date);

        let splitedTime = time.split(':');
        let hours = +splitedTime[0];
        let minutes = +splitedTime[1];

        date.setHours(hours);
        date.setMinutes(minutes);

        return date;
    }

    resetTime(date : Date) : Date {
        date.setHours(0);
        date.setMinutes(0);
        date.setSeconds(0);

        return date;
    }

    getFormattedTime(date: Date): string{

        let minutes = `${date.getMinutes()}`;
        let hours = `${date.getHours()}`;
    
        minutes =  minutes.length == 1 
          ? minutes = `0${minutes}` 
          : minutes;
    
        hours = hours.length == 1 
          ? `0${hours}` 
          : hours;
       
        return `${hours}:${minutes}`;
      }
    
}