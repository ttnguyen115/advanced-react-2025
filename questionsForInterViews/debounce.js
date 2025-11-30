const solidData = ["Apple", "Banana", "Orange"];

// Issue: when declaring a debounce as a utility function, `this` will be global or undefined (use strict).
// function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func(...args);
//         }, delay);
//     };
// }

// Best
// function debounce(func, delay) {
//     let timer;
//     return function (...args) {
//         clearTimeout(timer);
//         timer = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

class Store {
    constructor() {
        this.name = "Fruit and Juice";
        this.data = solidData;
    }

    // if declaring a debounce inside a class, `use strict` automatically triggers -> `this` is undefined.
    // In this case, it still be working well.
    // debounce(func, delay) {
    //     let timer;
    //     return function (...args) {
    //         clearTimeout(timer);
    //         timer = setTimeout(() => {
    //             func.apply(this, args);
    //         }, delay);
    //     };
    // }

    init() {
        this.searchBox = document.querySelector('input[name="searchInput"');
        this.searchList = document.getElementById('searchList');

        // Issue: with normal function, `this` will depend on where it is called.
        // In this case, `this` point to `input` element.
        // Fix: bind context `this` class to function() {...}.
        const onSearch = debounce(function() {
            const value = this.searchBox.value.toLowerCase();
            this.data = solidData.filter(item => {
                return item.toLowerCase().includes(value);
            });
            this.renderSearchList();
        }, 500);

        this.searchBox.addEventListener("input", onSearch);

        this.renderSearchList();
    }

    renderSearchList() {
        this.searchList.innerHTML = "";
        this.data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = item;
            this.searchList.appendChild(li);
        });
    }
}

const app = new Store();
app.init(); 
