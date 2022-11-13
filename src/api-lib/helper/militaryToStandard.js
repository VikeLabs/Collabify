export const startToEndStandardTime = (startMilitaryTime, endMilitaryTime) => {


    function convert(time){


        time = time.split(':'); // convert to array

        // fetch
        var hours = Number(time[0]);
        var minutes = Number(time[1]);
        

        // calculate
        var timeValue;

        if (hours > 0 && hours <= 12) {
            timeValue= "" + hours;
        } else if (hours > 12) {
            timeValue= "" + (hours - 12);
        } else if (hours == 0) {
            timeValue= "12";
        }
 
        timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
        timeValue += (hours >= 12) ? " PM" : " AM";  // get AM/PM

        return timeValue
    }

    let standardTime; 

    let date = startMilitaryTime.split('T')[0];
    let startTime = convert(startMilitaryTime.split('T')[1]);
    let endTime = convert(endMilitaryTime.split('T')[1]);

    let year = date[0] + date[1] + date[2] + date[3];
    let month = date[5] + date[6];
    let day = date[8] + date[9];
  

    let monthNumbers = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    let months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

    let index = 0;
    for (let monthNumber of monthNumbers) {
        if (month === monthNumber){
            month = months[index]
            break
        }
            index += 1
    }

    standardTime = startTime + " " + "to" + " " + endTime + "," + " " + month + " " + day + "-" + year

    return standardTime
}

