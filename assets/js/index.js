function redirectCategory(idCat) {
    window.location.href = `./pages/categoria.html?categoria=${idCat}`;
}

function redirectPost(postid) {
    window.location.href = `./pages/random.html?postid=${postid}`;
}

document.addEventListener("DOMContentLoaded", () => {

    const contCards = document.querySelector(".container-cards");

    fetch("./assets/posts.json")
        .then(response => response.json())
        .then(data => {
            let totalItems = data.length;
            let items = [];
            while (items.length <= 6) {
                let value = getRandomInt(totalItems);
                if (!items.includes(value)) {
                    items.push(value);
                }
            }
            console.log(items)
            data.forEach((post) => {
                items = items.sort();
                items.forEach((item) => {
                    if (post.id == item) {
                        const img_url = post.img_url.split("../");
                        contCards.innerHTML += createCard(post.id, post.category, post.title, img_url[1]);
                    }
                });
            });
        });

    function createCard(postid, cat, titulo, img_url) {
        let card = `
        <div class="card-custom" style="background-image: url('${img_url}')">
            <div class="card-custom-top w-100">
                <a href="#" class="text text-start px-1"
                    style="color: #DDBEA9; text-decoration: none;">${cat}</a>
                <a href="#" style="text-decoration: none;" onClick="redirectPost(${postid})">
                    <h4 class="text-light">${titulo}</h4>
                </a>
                <p class="text text-start px-1" style="color: #DDBEA9; font-size: 0.8rem;"><i
                        class="bi bi-clock"></i>
                    publicado em 06 de abril de 2024</p>
            </div>
            <div class="card-custom-bottom gap-2 w-100 justify-content-start"
                style="display: flex; align-items: center; color: #F8F9FA">
                <img src="../assets/images/avatar.png" alt="" class="img-fluid" style="width: 2.5rem;">
                <div style="display: flex; flex-direction: column; line-height: 0.2rem;">
                    <h6>Daniel Lima</h6>
                    <p>Admin</p>
                </div>
            </div>
        </div>
        `;
        return card;
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
})
