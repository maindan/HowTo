function redirectCategory(idCat) {
    window.location.href = `./pages/categoria.html?categoria=${idCat}`;
}

function redirectPost(postid) {
    window.location.href = `./pages/random.html?postid=${postid}`;
}

document.addEventListener("DOMContentLoaded", () => {

    const contCards = document.querySelector(".container-cards");
    const catCards = document.querySelector(".container-categ");

    fetch("./assets/posts.json")
        .then(response => response.json())
        .then(data => {
            let totalItems = data.length;


            let items = [];
            let recomendados = [];
            while (items.length != 4) {
                let value = getRandomInt(totalItems)
                if (!items.includes(value)) {
                    items.push(value);
                }
            }
            while (recomendados.length != 3) {
                let value = getRandomInt(totalItems);
                if (!items.includes(value) && !recomendados.includes(value)) {
                    recomendados.push(value);
                }
            }
            console.log(items)
            console.log(recomendados)
            data.forEach((post) => {
                items.forEach((item) => {
                    if (post.id == item) {
                        let img_url = post.img_url.split("../");
                        let cards = createCard(post.id, post.category, post.title, img_url[1]);
                        contCards.innerHTML += cards[0];
                    }
                });
                recomendados.forEach((item) => {
                    if (post.id == item) {
                        let img_url = post.img_url.split("../");
                        let cards = createCard(post.id, post.category, post.title, img_url[1], post.description);
                        catCards.innerHTML += cards[1];
                    }
                });
            });
        });

    function createCard(postid, cat, titulo, img_url, description) {
        let card1 = `
        <div class="card-custom" style="background-image: url('${img_url}')">
            <div class="card-custom-top w-100">
                <a href="#" class="text text-start px-1"
                    style="color: #DDBEA9; text-decoration: none;" onClick="redirectCategory('${cat}')">${cat}</a>
                <a href="#" style="text-decoration: none;" onClick="redirectPost(${postid})">
                    <h4 class="text-light">${titulo}</h4>
                </a>
                <p class="text text-start px-1" style="color: #DDBEA9; font-size: 0.8rem;"><i
                        class="bi bi-clock"></i>
                    publicado em 06 de abril de 2024</p>
            </div>
            <div class="card-custom-bottom gap-2 w-100 justify-content-start"
                style="display: flex; align-items: center; color: #F8F9FA">
                <img src="./assets/images/avatar.png" alt="" class="img-fluid" style="width: 2.5rem;">
                <div style="display: flex; flex-direction: column; line-height: 0.2rem;">
                    <h6>Daniel Lima</h6>
                    <p>Admin</p>
                </div>
            </div>
        </div>
        `;

        let card2 = `
        <div class="container cat-card mt-2 d-flex-col d-flex gap-2 p-3 justify-content-center align-content-center flex-lg-row align-items-center">
            <img src="${img_url}" alt="" class="img-fluid rounded-3"
                style="height: 200px;">
            <div class="container mt-2 mt-lg-0 d-flex flex-column">
                <h4>${titulo}</h4>
                <p>${description}</p>
                <a href="#" class="btn btn-primary" style="width: 8rem" onClick="redirectPost(${postid})">Acesse</a>
                <hr>
                <a href="#" class="text-black" style="text-decoration: none;" onClick="redirectCategory('${cat}')">${cat}</a>
            </div>
        </div>
        `;

        const cards = [card1, card2]
        
        return cards;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function randomic() {
        // let rand = [0, 1, 2, 3, 4, 5, 6]
        // let n = getRandomInt(10)
        // console.log(n)
        redirectPost(5)
    }
})
