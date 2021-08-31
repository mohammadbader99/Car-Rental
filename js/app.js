'use strict';

let orders =[];

function Order(customerName, carModel) {
    this.customerName = customerName;
    this.carModel = carModel;
    this.carImgSrc = `./img/${carModel}.jpg`;
    this.carPrice;
    orders.push(this);
}

function saveToLocalStorage() {
    let data = JSON.stringify(orders);
    localStorage.setItem('orders', data);
}

function readFromLocalStorage() {
    let stringObj = localStorage.getItem('orders');
    let normalObj = JSON.parse(stringObj);

    if (normalObj) {
        orders = normalObj;
    }
}

readFromLocalStorage();

Order.prototype.randomPrice = function () {
    let min = Math.ceil(1000);
    let max = Math.floor(10000);

    this.carPrice = Math.floor(Math.random() * (max - min + 1) + min);
};

let table = document.getElementById('myTable');

Order.prototype.render = function () {
    let trEl = document.createElement('tr');
    table.appendChild(trEl);

    let tdEl1 = document.createElement('td');
    let img = document.createElement('img');
    img.setAttribute('src', this.carImgSrc);
    tdEl1.appendChild(img);
    trEl.appendChild(tdEl1);

    let tdEl2 = document.createElement('td');

    let s1 = document.createElement('span');
    s1.textContent = ('Customer Name: ' + this.customerName);
    tdEl2.appendChild(s1);

    let s2 = document.createElement('span');
    s2.textContent = ('Car Model: ' + this.carModel);
    tdEl2.appendChild(s2);

    let s3 = document.createElement('span');
    s3.textContent = ('Car Price: ' + this.carPrice);
    tdEl2.appendChild(s3);

    trEl.appendChild(tdEl2);
};

let myForm = document.getElementById('myForm');

myForm.addEventListener('submit', addOrder);

function addOrder(event) {
    event.preventDefault();

    let customerName = event.target.name.value;
    let carModel = event.target.selectCar.value;

    let newOrder = new Order(customerName, carModel);

    newOrder.randomPrice();
    newOrder.render();

    saveToLocalStorage();
    console.log(orders);
}
