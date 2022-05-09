/* Your Code Here */
const createEmployeeRecord = function(array){
    return {
        firstName : array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = function(array){
    return array.map(createEmployeeRecord)
}

const createTimeInEvent = function(dateString){
    const timeArray = dateString.split(' ');
    this.timeInEvents.push({
        type: 'TimeIn',
        date: timeArray[0],
        hour: parseInt(timeArray[1], 10)
    })
    return this
}

const createTimeOutEvent = function(timeString){
    const timeArray = timeString.split(' ');
    this.timeOutEvents.push({
        type: 'TimeOut',
        date: timeArray[0],
        hour: parseInt(timeArray[1], 10)
    })
    return this
}

const hoursWorkedOnDate = function(dateString){
    let timeIn = this.timeInEvents.find(event => event.date === dateString);
    let timeOut = this.timeOutEvents.find(event => event.date === dateString);
    return timeOut.hour/100 - timeIn.hour/100
}

function wagesEarnedOnDate(dateString){
    let hours = hoursWorkedOnDate.call(this, dateString)
    return hours * this.payPerHour
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

const findEmployeeByFirstName = function(srcArray, firstName){
    return srcArray.find(record => record.firstName === firstName)
}

const calculatePayroll = function(array){
    let payrollArray = array.map(record => allWagesFor.call(record))
    return payrollArray.reduce((total, wage)=>total + wage, 0) 
}