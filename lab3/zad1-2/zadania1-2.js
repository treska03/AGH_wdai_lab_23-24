// Sorters
function sortAsc(a, b) {
    if (a.innerText.toUpperCase() > b.innerText.toUpperCase()) return 1;
    if (a.innerText.toUpperCase() < b.innerText.toUpperCase()) return -1;
    return 0;
}

function sortDesc(a, b) {
    if (a.innerText.toUpperCase() < b.innerText.toUpperCase()) return 1;
    if (a.innerText.toUpperCase() > b.innerText.toUpperCase()) return -1;
    return 0;
}

function sortById(a, b) {
    return Number(Number(a.id) > Number(b.id))
}
// Sorters end


const getJSON = async url => {
    const response = await fetch(url);
    if(!response.ok) // check if response worked (no 404 errors etc...)
    throw new Error(response.statusText);
  
    return response.json(); // get JSON from the response
}

var data = getJSON('https://dummyjson.com/products');

data.then((responseData) => {
    var i = 1
    for(const product of responseData.products) {
        const title = product.title;
        const description = product.description;
        const thumbnailLink = product.thumbnail
        
        const myList = document.getElementById("list-1")
        const text = document.createTextNode(title + ", " + description);
        const litem = document.createElement("li");
        const img = document.createElement("img");
        litem.id = i;
        img.src = thumbnailLink;
        
        litem.appendChild(text);
        litem.appendChild(img);
        myList.appendChild(litem);
        i++;
    }
})


$(document).ready(function() {
    var container = $("ul");
    $("#sorter-asc").click(function() {
      var $sections = $("#list-1").children().detach();
      $sections.sort(function(a, b) {
          return sortAsc(a, b);
        });
        container.append($sections);
    });
    $("#sorter-desc").click(function() {
        var $sections = $("#list-1").children().detach();
        $sections.sort(function(a, b) {
            return sortDesc(a, b);
        });
        container.append($sections);
    });
    $("#sorter-default").click(function() {
        var $sections = $("#list-1").children().detach();
        $sections.sort(function(a, b) {
            return sortById(a, b);
        });
        container.append($sections);
    });
    $("#filter-default").click(function () {
        const arr = Array.from(container.children());
        arr.forEach(element => {
            element.classList.remove("hidden");
        });
    });
    $("#filter-every-third").click(function(){
        const arr = Array.from(container.children());
        arr.forEach(element => {
            element.classList.remove("hidden");
            if(Number(element.id) % 3 != 0) {
                element.classList.add("hidden");
            }
        });
    });
    $("#filter-by-val").click(function(){
        const arr = Array.from(container.children());
        const filterValue = $("#filter-val").val();
        arr.forEach(element => {
            element.classList.remove("hidden");
            if(!element.innerText.toLowerCase().includes(filterValue)) {
                element.classList.add("hidden");
            }
        });
    });

});

/// CZY DA SIĘ TO WYŻEJ ZROBIĆ JAKOŚ LEPIEJ??