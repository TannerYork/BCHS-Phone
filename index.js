console.log("Connected to index.js");
let form = document.querySelector(".search");
let table = document.querySelector(".table");
let dropdown = document.querySelector('.dropdown');
let textSearch = document.querySelector('.input');
let submit = document.querySelector('.submit');

function search(event) {
    event.preventDefault();
    Tabletop.init({ 
        key: `https://docs.google.com/spreadsheets/d/1rW2RihBk66H1xQcItV7E9vHA4ucyqyFFg1NOB3Un__0/pubhtml`,
        callback: function(data, tabletop) {
            var results;
            console.log(data);
            
            if (dropdown.value !== 'none-selected') {
                console.log("Searching by school");
                results = searchBySchool(dropdown.value, data);
            } else if (textSearch.value !== '' && textSearch.value !== "Searching by Last Name") {
                console.log("Searching by Last Name");
                results = searchByLastName(textSearch.value, data);
            } else {
                console.log("Searching");
                results = data;
            }
            console.log(results);
            let object_data = Object.keys(results[0]);
            generateTable(table, results); // generate the table first
            generateTableHead(table, object_data); // then the head
            form.style.display = 'none';
            table.style.display = 'flex';
        },
        simpleSheet: true 
    })
}

  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
      let th = document.createElement("th");
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }

  function searchByLastName(search, data) {
    return data.filter((object) => {if (object['Last Name'] === search) {return object}});
  }

  function searchBySchool(search, data) {
    return data.filter((object) => {if (object['School'] === search) {return object}});
  }

form.addEventListener('submit', search);
