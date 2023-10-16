//catture elementi
let navbar = document.querySelector("#navbar");
let links = document.querySelectorAll('.nav-link');
let logo = document.querySelector("#logo");

//navbar scambio colori allo scroll
window.addEventListener('scroll', () => {
    let scrolled = window.scrollY;
    
    if(scrolled > 0){
        changeNavbar("navbar-blur", "movie-red", "var(--colorThird)");
    }else{
        navbar.classList.remove('navbar-blur');
        changeNavbar("navbar-custom", "movie-white", "var(--colorPrimary)",);
    }
});

function changeNavbar(background, imgLogo, color1, color3){
    navbar.classList.add(background);
    
    logo.src = `./media/${imgLogo}.png`;
    
    links.forEach((link) => {
        link.style.color = color1;
    });
    
    logo.src = `./media/${imgLogo}.png`;
    
    links.forEach((link) => {
        link.style.color = color3;
    });
}






//filtro globale
let genresWrapper = document.querySelector('#genresWrapper');
let cardsWrapper = document.querySelector('#cardsWrapper');
let priceInput = document.querySelector('#priceInput');
let priceNumbers = document.querySelector('#priceNumbers');
let wordInput = document.querySelector('#wordInput');


fetch('./annunci.json').then((response) => response.json()).then((data) => {
    data.forEach((element) => {
        element.price = element.price.split('')
        element.price.shift()
        element.price = element.price.join('').replace(',','.')
    })
    
    function setGenres(){
        let genres = data.map((announce) => announce.genres);
        console.log(genres);

        let uniqueGenres = [];

        genres.forEach((genre) => {
            if(!uniqueGenres.includes(genre)){
                uniqueGenres.push(genre);
            }
        });

        uniqueGenres.forEach((genre) => {
            let div = document.createElement('div');
            div.classList.add('form-check');
            div.innerHTML = 
            `<input class="form-check-input" type="radio" name="genres" id="${genre}">
            <label class="form-check-label" for="${genre}">
              ${genre}
            </label>`

            genresWrapper.appendChild(div);
        });
    }
    setGenres();


    function showCards(array){

        array.sort((a, b) => b.price - a.price);

        cardsWrapper.innerHTML = '';

        array.forEach((announce) => {
            let div = document.createElement('div');
            div.classList.add("card-custom");
            div.innerHTML = `
            <h2>${announce.name}</h2>
            <h3 class="card-title">${announce.genres}</h3>
            <p class="card-tx">€ ${announce.price}</p>
            `
            cardsWrapper.appendChild(div);
        });
    }
    showCards(data);

    let radios = document.querySelectorAll('.form-check-input');

    function filterByCategory(array){
        let checked = Array.from(radios).find((button) => button.checked);
        let genres = checked.id;

        if(genres != 'all'){
            let filtered = array.filter((announce) => announce.genres == genres);
            if(check){
                setPriceInput(filtered);
                check = false;
            }
            return filtered
        }else{
            if(check){
                setPriceInput(data);
                check = false;
            }
            return array
        }
    }

    let check = false;
    
    radios.forEach((button) => {
        button.addEventListener('click', () => {
            check = true
            globalFilter();
        })
    })

    function setPriceInput(array){
        let maxPrice = array[0].price;
        priceInput.max = Math.ceil(maxPrice);
        priceInput.value = Math.ceil(maxPrice);
        priceNumbers.innerHTML = maxPrice;
    }
    setPriceInput(data);

    priceInput.addEventListener('input', () => {
        priceNumbers.innerHTML = priceInput.value;
        globalFilter();
    })

    function filterByPrice(array){
        let filtered = array.filter((announce) => +announce.price <= +priceInput.value)
        return filtered;
    }

    wordInput.addEventListener('input', () => {
        globalFilter();
    })

    function filterByWord(array){
        let filtered = array.filter((announce) => announce.name.toLowerCase().includes(wordInput.value.toLowerCase()))
        return filtered;
    }

    function globalFilter(){
        let filterCategory = filterByCategory(data);
        let filterPrice = filterByPrice(filterCategory);
        let filterWord = filterByWord(filterPrice);

        showCards(filterWord);
    }

});