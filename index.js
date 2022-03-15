function createEmployeeRecord(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrs) {
   return arrs.map(arr => {
       return createEmployeeRecord(arr)
    })  
}

function createTimeInEvent(dateTime) {
    let [date, time] = dateTime.split(' ')
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    })
    return this
}

function createTimeOutEvent(dateTime) {
    let [date, time] = dateTime.split(' ')
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return this
}

function hoursWorkedOnDate(date){
    let inEvent = this.timeInEvents.find(function(e){
        return e.date === date
    })

    let outEvent = this.timeOutEvents.find(function(e){
        return e.date === date
    })

    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(date){
    let wage = hoursWorkedOnDate.call(this, date)
        * this.payPerHour
    return wage
}
function findEmployeeByFirstName(array, firstName) {
    return array.find(function(record){
      return record.firstName === firstName
    })
  }

  function calculatePayroll(arr){
    return arr.reduce(function(memo, rec){
        return memo + allWagesFor.call(rec)
    }, 0)
}

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}