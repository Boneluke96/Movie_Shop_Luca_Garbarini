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



//chiamata asincrona numeri incrementali
let primoNumero = document.querySelector("#primoNumero");
let secondoNumero = document.querySelector('#secondoNumero');
let terzoNumero = document.querySelector('#terzoNumero');

let confirm = false;
let observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if(entry.isIntersecting && confirm == false){
            createInterval(1000, primoNumero, 3);
            createInterval(1500, secondoNumero, 1);
            createInterval(100, terzoNumero, 50);
            confirm = true;
        }
    })
});
observer.observe(primoNumero);

function createInterval(number, element, timing){
    let counter = 0
    let interval = setInterval(() => {
        if(counter < number){
            counter++
            element.innerHTML = counter;
        }else{
            clearInterval(interval)
        }
    }, timing);
}

//recensioni swiper
let reviews = [
    {name : "Angelo", description : "Ottimi prodotti"},
    {name : "Luca", description : "tutto in ottime condizioni non credevo!"},
    {name : "Riccardo", description : "5 stelle meritate per loro"},
    {name : "Antonio", description : "servizio ottimo danno anche qualche adesivo!"},
    {name : "Marco", description : "Ho visto di meglio ma gli darò una chance"},
    {name : "Fulvio", description : "Sito interessante..."}
]

let swiperWrapper = document.querySelector('#swiperWrapper');
let userName = document.querySelector('#userName');
let userDescription = document.querySelector('#userDescription');
let addReviewBtn = document.querySelector('#addReviewBtn');

addReviewBtn.addEventListener('click', () => {
    reviews.push({name : userName.value, description : userDescription.value});
    generateCard();
    userName.value = '';
    userDescription.value = '';
    swiper.update();
})

function generateCard(){
    swiperWrapper.innerHTML = '';
    reviews.forEach((review) => {
        let div = document.createElement('div');
        div.classList.add("swiper-slide");
        div.innerHTML = `
        <div class="review-card">
        <p class="h3">${review.name}</p>
        <p class="lead">${review.description}</p>
        </div>
        `
        swiperWrapper.appendChild(div);
    });
}
generateCard();



//swiper JS
const swiper = new Swiper('.swiper', {

    // Optional parameters
    loop: true,

    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 3,
    coverflowEffect: {
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: false,
    },
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
});