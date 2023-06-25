const date = new Date(); // Assuming you have a Date object

const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false // Use 24-hour format
};

export const formattedDateTime = (time) => {
    let date = new Intl.DateTimeFormat('en-US', options).format(time);
    console.log("date", date);
}



export const DateTime = (datetime) => {
    // Format the updated date and time

    const currentDate = datetime; // Current date and time
    console.log("currentDate", currentDate);

    // Calculate the updated date by adding 1 hour
    const updatedDate = new Date(currentDate.getTime() + (1 * 60 * 60 * 1000)); // Adding 1 hour in milliseconds

    var time = `${updatedDate.getFullYear()}-${(updatedDate.getMonth() + 1).toString().padStart(2, '0')}-${updatedDate.getDate().toString().padStart(2, '0')} ${updatedDate.getHours().toString().padStart(2, '0')}:${updatedDate.getMinutes().toString().padStart(2, '0')}:${updatedDate.getSeconds().toString().padStart(2, '0')}`;
    console.log("formattedDateTime", time);


}

export const OldDateTimeConvert = (datetime) => {
    const oldDate = new Date(datetime); // Assuming you have an old Date object
    const currentDate = new Date(); // Current date and time
    const timeDifference = currentDate.getTime() - oldDate.getTime(); // Calculate the time difference in milliseconds
    // Convert the time difference to years, months, weeks, days, hours, and minutes
    const years = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365.25));
    const months = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * (365.25 / 12)));
    const weeks = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * (365.25 / 12))) / (1000 * 60 * 60 * 24 * 7));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
    console.log(`Years: ${years}, Months: ${months}, Weeks: ${weeks}, Days: ${days}, Hours: ${hours}, Minutes: ${minutes}`);
    return { years, months, weeks, days, hours, minutes, seconds }
}
