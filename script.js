'use strict'

console.log('hello there');

window.addEventListener('load', function () {
    let sum = 0;
    bord();
    food(sum);
    sauce(sum);
    drink(sum);
    showSum();
    showReciept();
    
});

function bord() {
    let tableBtn = document.querySelector('#tableSelect');
    tableBtn.addEventListener('click', () => {
        let table = '';
        console.log('Hello table');
        let h2 = document.querySelector('.tableNR');
        h2.textContent = 'Bord ' + table;
        h2.classList.toggle('d-none');
        tableBtn.classList.toggle('d-none');
    });

}
function food(sum) {
    let tableBtn = document.querySelector('#foodSelect');
    tableBtn.addEventListener('click', () => {
        fillList('food1-item', 'Pizzor klass 1', sum);
        fillList('food2-item', 'Pizzor klass 2', sum);
        fillList('food3-item', 'Pizzor klass 3',);
    });
}

function sauce(sum) {
    let tableBtn = document.querySelector('#sauceSelect');
    tableBtn.addEventListener('click', () => {
        fillList('sauce-item', 'Såser', sum);
    });

}
function drink(sum) {
    let tableBtn = document.querySelector('#drinkSelect');
    tableBtn.addEventListener('click', () => {
        fillList('drink-item', 'Dryck', sum);
    });

}


function fillList(listType, name, sum) {
    //skapar ett div-element där allt innehåll i menyn ska ligga
    let headDiv = document.createElement('div');
    let footer = document.querySelector('.footer');
    let price = document.querySelector('.sumList'); 
    
    footer.classList.toggle('fixed-bottom');


    //kollar om diven till listtypen som skickas in är tom eller inte
    if (document.querySelector('.'+listType).firstChild == null) {
        for (const [menuName, menuSection] of Object.entries(menu)) {
            if (menuName == name) {
                let header = document.createElement('h1');
                header.append(menuName);
                headDiv.append(header);

                for (const menuItem of menuSection) {
                    let div = document.createElement('div');
                    let btn = document.createElement('div');
                    div.setAttribute('class', 'd-flex justify-content-between m-2 border-bottom');
                    btn.setAttribute('class', 'btn btn-primary m-1 py-0');
                    btn.append('+')
                    div.append(menuItem['name']);
                    div.append(btn);
                    headDiv.append(div);
                    btn.addEventListener('click', ()=>{
                        sum+=parseInt(menuItem['price']);
                        price.innerHTML='Summa: '+sum+':-';
                        console.log(sum)
                    });
                }
            }
            document.querySelector('.'+listType).append(headDiv);
        }
    }else{
        document.querySelector('.'+listType).removeChild(document.querySelector('.'+listType).firstChild);
    }
}

function showSum(){
    let sumBtn = document.querySelector('.sum');
    let sumDiv = document.querySelector('.sumList');
    sumBtn.addEventListener('click', ()=>{
        sumDiv.classList.toggle('d-none');
        
    });
}

function showReciept(){
    let recBtn = document.querySelector('.reciept');
    let recDiv = document.querySelector('.recieptList');
    recBtn.addEventListener('click', ()=>{
        recDiv.classList.toggle('d-none');
        
    });
}