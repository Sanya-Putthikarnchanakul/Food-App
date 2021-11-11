exports.getCurrentDateTimeDisplay = (format) => {
    let today = new Date();

    let year = today.getFullYear().toString();
    let month = (today.getMonth() + 1).toString();
    let day = today.getDate().toString();
    let hour = today.getHours().toString();
    let minute = today.getMinutes().toString();
    let second = today.getSeconds().toString();

    month = (month.length === 1) ? `0${month}` : month;
    day = (day.length === 1) ? `0${day}` : day;
    hour = (hour.length === 1) ? `0${hour}`: hour;
    minute = (minute.length === 1) ? `0${minute}` : minute;
    second = (second.length === 1) ? `0${second}` : second;

    switch(format) {
        case 'yyyy-mm-dd hh:mm':
            return `${year}-${month}-${day} ${hour}:${minute}`;
        default:
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }
}