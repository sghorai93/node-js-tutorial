const { format } = require('date-fns');
const { v4 : uuid } = require('uuid');

console.log(format(new Date(), 'dd-MMM-yyyy\tHH:mm:ss'));
console.log(uuid());