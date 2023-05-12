'use strict'

console.log('hello there');
window.addEventListener('load', function () {

    bord();
    food();
    sauce();
    drink();
    moidify();
    showSum();
    showOrder();

});

let globalObject = {
    total: 0,
    table: ''
}

function bord() {
    let tableBtn = document.querySelector('#tableSelect');
    let bordNr = document.querySelector('.bordsNummer');
    let table = document.querySelector('#bord');
    let h2 = document.querySelector('.tableNR');
    let changeBtn = document.querySelector('#changeSelect');
    let tableSelect = document.querySelector('#bord');

    bordNr.setAttribute('class', 'd-flex w-100 justify-content-around mt-4 d-none')
    bordNr.append(changeBtn);

    for (let i = 0; i < 20; i++) {
        let option = document.createElement('option');
        option.value = i + 1;
        option.append(i + 1)
        tableSelect.append(option);
    }

    tableBtn.addEventListener('click', () => {

        globalObject.table = table.options[table.selectedIndex].text;
        console.log(globalObject.table);
        h2.textContent = 'Bord ' + globalObject.table;
        bordNr.classList.toggle('d-none');
        h2.classList.toggle('d-none');
        tableBtn.classList.toggle('d-none');
        changeBtn.classList.toggle('d-none');
        table.classList.toggle('d-none');

    });

    changeBtn.addEventListener('click', () => {
        tableBtn.classList.toggle('d-none');
        changeBtn.classList.toggle('d-none');
        table.classList.toggle('d-none');
        h2.classList.toggle('d-none');
        bordNr.classList.toggle('d-none');
    });

}


function food() {
    let tableBtn = document.querySelector('#foodSelect');
    tableBtn.addEventListener('click', () => {
        fillList('food1-item', 'Pizzor klass 1');
        fillList('food2-item', 'Pizzor klass 2');
        fillList('food3-item', 'Pizzor klass 3');
    });
}

function sauce() {
    let tableBtn = document.querySelector('#sauceSelect');
    tableBtn.addEventListener('click', () => {
        fillList('sauce-item', 'Såser');
    });

}
function drink() {
    let tableBtn = document.querySelector('#drinkSelect');
    tableBtn.addEventListener('click', () => {
        fillList('drink-item', 'Dryck');
    });

}


function fillList(listType, name) {
    //skapar ett div-element där allt innehåll i menyn ska ligga
    let headDiv = document.createElement('div');
    let olRec = document.querySelector('.recieptList ol');
    let olSum = document.querySelector('.sumList ol');

    //kollar om diven till listtypen som skickas in är tom eller inte
    if (document.querySelector('.' + listType).firstChild == null) {

        for (const [menuName, menuSection] of Object.entries(menu)) {

            if (menuName == name) {
                let header = document.createElement('h1');

                header.append(menuName);
                headDiv.append(header);


                //loopar igenom alla 
                for (const menuItem of menuSection) {

                    let div = document.createElement('div');
                    let div2 = document.createElement('div');
                    let btn = document.createElement('div');
                    let addBtn = document.createElement('div');
                    let remBtn = document.createElement('div');

                    div2.setAttribute('class', 'allergi');
                    div.setAttribute('class', 'd-flex justify-content-between m-2 border-bottom h6');
                    btn.setAttribute('class', 'btn btn-primary m-1 py-0');
                    addBtn.setAttribute('class', 'btn m-1 py-0 d-none success');
                    remBtn.setAttribute('class', 'btn m-1 py-0 d-none alert');

                    btn.append('+')
                    addBtn.append('Ja');
                    remBtn.append('Nej');
                    div.append(menuItem['name'] + ' ' + menuItem['price'] + 'kr');

                    let contentDiv = document.createElement('div');
                    contentDiv.setAttribute('class', 's-text d-flex');
                    let span = document.createElement('span');

                    for (let i = 0; i < menuItem['contents']?.length; i++) {

                        span.append(menuItem['contents'][i] + ' ');
                        contentDiv.append(span);

                        if (menuItem['contents'][i].includes('a:')) {
                            let x = menuItem['contents'][i].replace(/a:/, ' *');
                            div2.append(x);
                        }

                    }

                    div.append(contentDiv);
                    div2.append(btn);
                    div.append(div2);
                    headDiv.append(div);

                    btn.addEventListener('click', () => {
                        div2.append(remBtn);
                        div2.append(addBtn);
                        addBtn.classList.toggle('d-none');
                        remBtn.classList.toggle('d-none');
                        btn.classList.toggle('d-none');

                    });

                    addBtn.addEventListener('click', () => {
                        let sum = parseInt(menuItem['price']);
                        let olRecDiv = document.createElement('div');
                        let olSumDiv = document.createElement('div');
                        globalObject.total += sum;
                        console.log(globalObject.total);
                        addBtn.classList.toggle('d-none');
                        remBtn.classList.toggle('d-none');
                        btn.classList.toggle('d-none');
                        olRecDiv.append(menuItem['name'] + ' ' + menuItem['price'] + ':-');
                        olSumDiv.append(menuItem['name']);
                        olRec.append(olRecDiv);
                        olSum.append(olSumDiv);

                        let sumDiv = document.querySelector('.sumList');
                        if (!sumDiv.classList.contains('d-none')) {
                            sumDiv.classList.toggle('d-none');
                        }

                        let recDiv = document.querySelector('.recieptList');
                        if (!recDiv.classList.contains('d-none')) {
                            recDiv.classList.toggle('d-none');
                        }



                    });
                    remBtn.addEventListener('click', () => {
                        addBtn.classList.toggle('d-none');
                        remBtn.classList.toggle('d-none');
                        btn.classList.toggle('d-none');
                    });
                }
            }

            document.querySelector('.' + listType).append(headDiv);
        }
    } else {
        document.querySelector('.' + listType).removeChild(document.querySelector('.' + listType).firstChild);
    }
}

function showSum() {
    let sumBtn = document.querySelector('.sum');
    let sumDiv = document.querySelector('.sumList');
    let h4 = document.querySelector('.sumList > h4');
    let h3 = document.querySelector('.sumList h3');
    let table = document.querySelector('#bord');

    sumBtn.addEventListener('click', () => {

        
        let x = table.options[table.selectedIndex].text;
        h3.innerHTML=('Order Bord '+x);
        let body = document.querySelector('form');

        if(!body.classList.contains('d-none')&&sumDiv.classList.contains('d-none')){
            body.classList.toggle('d-none');
        }else if(body.classList.contains('d-none')&&!sumDiv.classList.contains('d-none')){
            body.classList.toggle('d-none');
        }

        let recDiv = document.querySelector('.recieptList');
        if (!recDiv.classList.contains('d-none')) {
            recDiv.classList.toggle('d-none');
        }

        sumDiv.classList.toggle('d-none');
        

    });
    
}

function showOrder() {
    let recBtn = document.querySelector('.reciept');
    let recDiv = document.querySelector('.recieptList');
    let ol = document.querySelector('.recieptList ol');
    let h4 = document.querySelector('.recieptList h4');
    let h3 = document.querySelector('.recieptList h3');
    let table = document.querySelector('#bord');
    

    recBtn.addEventListener('click', () => {

        let body = document.querySelector('form');
        let x = table.options[table.selectedIndex].text;
        h3.innerHTML=('Kvitto Bord '+x);
        
        if(!body.classList.contains('d-none')&&recDiv.classList.contains('d-none')){
            body.classList.toggle('d-none');
        }else if(body.classList.contains('d-none')&&!recDiv.classList.contains('d-none')){
            body.classList.toggle('d-none');
        }
        let sumDiv = document.querySelector('.sumList');

        if (!sumDiv.classList.contains('d-none')) {
            sumDiv.classList.toggle('d-none');
        }

        recDiv.classList.toggle('d-none');
        h4.innerHTML = 'Total summa: ' + globalObject.total + ':-';
        ol.append(h4);

    });

}


function moidify() {
    let modButton = document.querySelector('.specialSelect');
    let textDiv = document.querySelector('.textDiv');
    let specialBtnAdd = document.querySelector('.specialBtnAdd');
    let modAdd = document.createElement('button');
    let p = document.querySelector('.sumList p');

    modAdd.setAttribute('class', 'btn btn-primary')
    modAdd.append('Lägg till önskemål')
    specialBtnAdd.append(modAdd);

    modButton.addEventListener('click', () => {
        textDiv.classList.toggle('d-none')
    });

    specialBtnAdd.addEventListener('click', () => {

        let textArea = document.querySelector('textarea');
        let p2 = document.createElement('p');
        p2.setAttribute('class', 'm-0 p-0');
        p2.append(textArea.value);
        p.append(p2)
        textArea.value = '';
        textDiv.classList.toggle('d-none');

    });
}