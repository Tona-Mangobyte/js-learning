// import moment from "moment";
const moment = require("moment");

const now = moment();
const closingDate = '2023-03-20';
const momentClosingDate = moment(closingDate)
const result = momentClosingDate.isAfter(now)
console.log(result);