(function fetchToken() {
    fetch('https://api.vantage.online/application/loginsingle', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic YmQ1OGY0NmMtODBiZC00NjI2LWFkOGMtMjQzNjhkMjMxODk1OjJhMmU4NWYxNDE0N2ViNTQ0ZTUzMTljYzcwZWNjNDM2'
        }
    })
        .then(response => response.json())
        .then(json => {
            token = json.Token;
        })
        .catch(error => console.log('Error Message:', error));
})();

let token = '';
const url = 'https://api.vantage.online/customer';

const getDataButton = document.querySelector('#get-data');
const singleCustomerButton = document.querySelector('#single-customer');
const customersButton = document.querySelector('#customers');
const equipmentsButton = document.querySelector('#equipments');
const contentBox = document.querySelector('.content-box');
const results = document.querySelector('#results');
const paginationDiv = document.querySelector('.pagination');
const leftArrow = document.querySelector('#left-arrow');
const rightArrow = document.querySelector('#right-arrow');

let currentPage = 0;

getDataButton.addEventListener('click', allData);
singleCustomerButton.addEventListener('click', getSingleCustomer);
customersButton.addEventListener('click', getCustomers);
equipmentsButton.addEventListener('click', getEquipments);
leftArrow.addEventListener('click', goLeft);
rightArrow.addEventListener('click', goRight);

function showFirstCustomer() {
    const allParagraph = results.querySelectorAll('p');
    paginationDiv.style.opacity = 1;

    for (let i = 123; i <= allParagraph.length; i++) {
        allParagraph[i].style.display = 'none';
    }
}

function goLeft() {
    const allParagraph = results.querySelectorAll('p');

    if (currentPage > 0) {
        currentPage--;
        
        allParagraph.forEach(paragraph => {
            paragraph.style.display = 'none';
        });

        for (let i = currentPage * 123; i <= currentPage * 123 + 123; i++) {
            allParagraph[i].style.display = 'block';
        }

        contentBox.scrollTop = 0; 
    }
}

function goRight() {
    const allParagraph = results.querySelectorAll('p');

    if (currentPage < 5) {
        currentPage++;
        
        allParagraph.forEach(paragraph => {
            paragraph.style.display = 'none';
        });

        for (let i = currentPage * 123; i <= currentPage * 123 + 122; i++) {
            allParagraph[i].style.display = 'block';
        }

        contentBox.scrollTop = 0; 
    }
}

function allData() {
    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let output = '<h3>All Data</h3>';
            data.value.forEach(text => {
                const keys = Object.keys(text);
                keys.forEach(key => {
                    output += `<p>${key}: ${text[key]}</p>`;
                });
            });
            results.innerHTML = output;
            showFirstCustomer();
        })
        .catch(error => console.log('Error Message:', error));
}

function getSingleCustomer() {
    paginationDiv.style.opacity = 0;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            const customer = Math.floor(Math.random() * Math.floor(7));
            let output = '<h3>Single Customer</h3>';
            const keys = Object.keys(data.value[customer]);
            keys.forEach(key => {
                output += `<p>${key}: ${data.value[customer][key]}</p>`;
            });
            document.getElementById('results').innerHTML = output;
        })
        .catch(error => console.log('Error Message:', error));
}

function getCustomers() {
    paginationDiv.style.opacity = 0;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let output = '<h3>Customers</h3>';
            data.value.forEach(text => {
                output += `<p>${text.Name}</p>`;
            });
            document.getElementById('results').innerHTML = output;
        })
        .catch(error => console.log('Error Message:', error));
}

function getEquipments() {
    paginationDiv.style.opacity = 0;

    fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            let output = '<h3>Equipments</h3>';
            const keys = Object.keys(data.value[0]);
            keys.forEach(key => {
                output += `<p>${key}</p>`;
            });
            document.getElementById('results').innerHTML = output;
        })
        .catch(error => console.log('Error Message:', error));
}




