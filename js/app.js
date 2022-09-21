const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = 
    `
     <div class="alert-banner">
        <button onclick="dropMenu()" class="drop-menu"><strong>Alert:</strong> You have <strong>2</strong> unread messages</button>
        <div><p class="alert-banner-close">x</p></div>
        <div id="dropdown" class="dropdown">
            <ul class="dropdown-list">
                <li><a class="dropdown-item" href='#'>Introduction to WebApp</a></li>
                <li><a class="dropdown-item" href='#'>New Member Information</a></li>
            </ul>
        </div>
    </div>
    `

////
///////////////////// Alert Banner /////////////////////
////

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none";
    }
});

// toggle between hiding and showing the list when the user clicks on button
function dropMenu() {
    document.getElementById("dropdown").classList.toggle("show");
};

// close the dropdown menu if the user clicks oustide of it
window.onclick = function(event) {
    if (!event.target.matches('.drop-menu')) {
        let dropdowns = document.getElementsByClassName("dropdown");
        for (i = 0; i < dropdowns.length; i++) {
            let openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

////
///////////////////// Traffic Chart /////////////////////
////

const trafficCanvas = document.getElementById("traffic-chart").getContext('2d');
const labels = document.querySelectorAll('.traffic-nav label')

const chartArray = [
    [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
    [880, 1760, 566, 1430, 1200, 1554, 1380, 1800, 1300, 1600, 2700],
    [1200, 1900, 300, 700, 1100, 1280, 1150, 900, 1200, 1700, 2900],
    [1300, 2100, 230, 600, 2100, 1700, 1665, 1100, 950, 100, 3100]
]

let trafficData = {
    labels: ["16-22", "23-29", "30-5", "6-12", "13-19", "20-26", "27-3", "4-10", "11-17", "18-24", "25-31"],
    datasets : [{
        data: chartArray[0],
        backgroundColor: 'rgba(116, 119, 191, .3)',
        borderWidth: 1,
    }]
};

let trafficOptions = {
    backgroundColor: 'rgba(112, 104, 201, .5)',
    fill: true,
    aspectRatio: 2.5,
    animation: {
        duration: 0
    },
    scales: {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener('click', () => {
        if (labels[i] === labels[i]) {
            trafficChart.data.datasets[0].data = chartArray[i];
        }
        trafficChart.update()
    })
}


let trafficChart = new Chart(trafficCanvas, {
    type: 'line',
    data: trafficData, 
    options: trafficOptions
});

////
///////////////////// Daily Chart /////////////////////
////

const dailyCanvas = document.getElementById("daily-chart");

const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [{
        label: '# of Hits',
        data: [75, 115, 175, 125, 225, 200, 100],
        backgroundColor: '#7477BF',
        borderWidth: 1
    }]
};

const dailyOptions = {
    scales : {
        y: {
            beginAtZero: true
        }
    },
    plugins: {
        legend: {
            display: false
        }
    }
};

let dailyChart = new Chart(dailyCanvas, {
    type: 'bar',
    data: dailyData,
    options: dailyOptions
});

////
///////////////////// Mobile Chart /////////////////////
////

const mobileCanvas = document.getElementById("mobile-chart");

const mobileData = {
    labels: ["Desktop", "Tablet", "Phones"],
    datasets: [{
        labels: '# of Users',
        data: [2000, 550, 500],
        borderWidth: 0,
        backgroundColor: [
            '#7477BF',
            '#78CF82',
            '#51B6C8'
        ]
    }]
};

const mobileOptions = {
    aspectRatio: 1.9,
    plugins: {
        legend: {
            position: 'right',
            labels: {
                boxWidth: 20,
                fontStyle: 'bold'
            }
        }
    }
};

let mobileChart = new Chart(mobileCanvas, {
    type: 'doughnut',
    data: mobileData,
    options: mobileOptions
});

////
///////////////////// Autocomplete Search User /////////////////////
////

let userNames = [
    "Victoria Chambers",
    "Dale Byrd",
    "Dawn Wood",
    "Dan Oliver"
];

const input = document.querySelector('.form-field');
const list = document.createElement('ul');

input.addEventListener('keyup', (e) => {
    document.body.onkeyup = function(e) {
        if (e.key == " "  || e.key == 32 || e.code == "Space") {
            list.remove() 
            }
        }
    list.classList.add('list')
    insertAfter(list, input)
    removeElements()
    for (let i of userNames) {
        if (i.toLowerCase().startsWith(input.value.toLowerCase()) && input.value != ' ') {
            let listItem = document.createElement("li");
            listItem.classList.add("list-item");
            listItem.style.cursor = "pointer";   
            listItem.style.padding = '20px 15px 10px 0px';
            listItem.style.listStyle = 'none';
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
        
            let word = "<b>" + i.substring(0, input.value.length) + "</b>";
            word += i.substring(input.value.length);
        
            listItem.innerHTML = word;
            list.appendChild(listItem);

            if (input.value.length == 0 || input.value == ' '  ) {
                list.remove()
            }
        }
    }
});

const insertAfter = (newNode, existingNode) => {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
}

const displayNames = (value) => {
    input.value = value;
    removeElements();
}

const removeElements = () => {
    let items = document.querySelectorAll(".list-item");
    items.forEach((item) => {
        item.remove();
    });
}

////
///////////////////// Message User /////////////////////
////

const user = document.getElementById("userField");
const message =  document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener('click', () => {
    //ensure user and message fields are filled out
    if (user.value === "" && message.value === "") {
        alert("Please fill out user and message fields before sending");
        return false;
    } else if (user.value === "") {
        alert("Please fill out user field before sending");
    } else if (message.value === "") {
        alert("Please fill out message field before sending");
    } else {
        alert(`Message successfully sent to: ${user.value}`)
    }
});

////
///////////////////// Save / Cancel In Local Storage /////////////////////
////

const email = document.querySelector(".email-toggle");
const public = document.querySelector(".public-toggle");
const timezone = document.getElementById("timezone");
const save = document.getElementById("save");
const cancel = document.getElementById("cancel");

save.addEventListener('click', () => {
    localStorage.setItem('email', email.checked);
    localStorage.setItem('public', public.checked);
    localStorage.setItem('timezone', timezone.value);
});

let emailStorage = localStorage.getItem(email);
let publicStorage = localStorage.getItem(public);
let timezoneStorage = localStorage.getItem(timezone);

cancel.addEventListener('click', () => {
    localStorage.removeItem('email', email.checked);
    localStorage.removeItem('public', public.checked);
    localStorage.removeItem('timezone', timezone.value);
    email.checked = false;
    public.checked = false;
    timezone.value = "Select a Timezone";
    localStorage.clear();
});

const storedItems = () => {
    if (localStorage.email === "true") {
        email.checked = true;
    } else {
        email.checked = false;
    }

    if (localStorage.public === "true") {
        public.checked = true;
    } else {
        public.checked = false;
    }

    if (localStorage.timezone) {
        timezone.value = localStorage.timezone;
    }
};

storedItems();

