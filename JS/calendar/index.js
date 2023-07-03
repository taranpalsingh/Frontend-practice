// const sunday = document.getElementById('col-0');
// const monday = document.getElementById('col-1');
// const tueday = document.getElementById('col-2');
// const wednesday = document.getElementById('col-3');
// const thursday = document.getElementById('col-4');
// const friday = document.getElementById('col-5');
// const saturday = document.getElementById('col-6');

let nav = 0;
// let 
const load = () => {
    const dt = new Date();
    if (nav != 0)
        dt.setMonth(new Date().getMonth() + nav);

    const month = dt.getMonth();
    const day = dt.getDate();
    const year = dt.getFullYear();
    const daysInMonth = new Date(year, month+1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    document.getElementById('year-display').innerText = `${dt.toLocaleDateString('en-us', {month: 'long'})} ${year}`
    // console.log(today, month, dt, year, day);
    // console.log(daysInMonth);
    // console.log(firstDayOfMonth);
    createDays(firstDayOfMonth, daysInMonth);
}

function createDays(paddingCount, daysCount) {

    for (let i=0; i<paddingCount + daysCount; i++) {
        const dayCell = document.createElement('div');
        dayCell.classList.add('day-cell');
    
        if (i >= paddingCount) {
            dayCell.innerHTML = i - paddingCount + 1;
        }
        else {
            dayCell.classList.add('padding-day-cell');
        }


        const dayNum = i%7;
        if (i < 7)
            document.getElementById(`col-${i}`).innerHTML = '';

        document.getElementById(`col-${dayNum}`).append(dayCell);
    }

}

const initButtons = () => {
    document.getElementById('prev-button').addEventListener('click', () => {
        nav--;
        load();
    })

    document.getElementById('next-button').addEventListener('click', () => {
        nav++;
        load();
    })
}

initButtons()
load();