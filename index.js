
const getJulianDate = (date = new Date()) => {
    const time = date.getTime();
    const tzoffset = date.getTimezoneOffset();

    return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
}

const LUNAR_MONTH = 29.530588853;

const getLunarAge = (date = new Date()) => {
    const precent = getLunarAgePrecent(date);
    return precent * LUNAR_MONTH;
}

const getLunarAgePrecent = (date = new Date()) => {
    return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}

const normalize  = value => {
    value = value - Math.floor(value);
    if(value < 0)
        value += 1;
    return value;
}

const getLunarPhase = (date = new Date()) => {
    const age = getLunarAge(date);
    if(age < 1.84566)
        return "new_moon";
    else if(age < 5.53699)
        return "waxing_crescent";
    else if(age < 9.22831)
        return "first_quarter";
    else if(age < 12.91963)
        return "waxing_gibbous";
    else if(age < 16.61096)
        return "full_moon"; // Are you aware that the moon grows full...?
    else if(age < 20.30228)
        return "waning_gibbous";
    else if(age < 23.99361)
        return "last_quarter";
    else if(age < 27.68493)
        return "waning_crescent";
    return "new_moon";
}

let days_till_full_moon = 0
let date = new Date()




while(getLunarPhase(date) != "full_moon"){
    days_till_full_moon += 1;
    date.setDate(date.getDate() + 1)
    if(days_till_full_moon > 32)
        break
}

let str = "Error"
str = `${days_till_full_moon}`
if(days_till_full_moon == 0){
    str = ""
    document.getElementById('bg').src = 'background_full.svg'
    document.body.style.backgroundColor = "#051f01"
}else{
    document.getElementById('bg').src = 'background.svg'
    document.body.style.backgroundColor = "#000213"
}


document.getElementById('txt').textContent = str
document.getElementById('moon').src = `${getLunarPhase(new Date())}.svg`
