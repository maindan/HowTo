
function redirectCategory(idCat, ...par) {
    
    if(par == "newpost") {
        window.location.href = `../pages/categoria.html?categoria=${idCat}`;
    } 
    else {
        window.location.href = `./categoria.html?categoria=${idCat}`;
    }
}

function redirectPost(postid) {
    window.location.href = `./random.html?postid=${postid}`;
}

function randomic() {
    fetch("../assets/posts.json")
        .then(response => response.json())
        .then(data => {
            let totalItems = data.length;
            let id = getRandomInt(totalItems);
            console.log("entrei no fetch")
            data.forEach((post) => {
                if(post.id == id) {
                    console.log("cheguei aqui")
                    window.location.href = `../pages/random.html?postid=${post.id}`;
                }
            })
        });
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

document.addEventListener("DOMContentLoaded", () => {
    const contCards = document.querySelector(".container-cards");
    const contPost = document.querySelector(".container-post");
    const parameters = new URLSearchParams(window.location.search);
    const cat = parameters.get("categoria");
    const postid = parameters.get("postid");

    if (cat) {
        document.getElementById("cat-title").textContent = cat;
        fetch("../assets/posts.json")
            .then(response => response.json())
            .then(data => {
                data.forEach((post) => {
                    if(post.category == cat) {
                        contCards.innerHTML += createCard(post.id, post.category, post.title, post.img_url);
                    }
                });
            })
    }

    if(postid) {
        fetch("../assets/posts.json")
            .then(response => response.json())
            .then(data => {
                data.forEach((post) => {
                    if(post.id == postid) {
                        const textObj = post.text[0];
                        contPost.innerHTML += createPost(post.img_url, post.title, post.description, textObj);
                    }
                });
            })
    }

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

    function createPost(img_url, title, description, textObj) {
        let post = `
        <div class="card" style="width: 40rem;">
            <img src="${img_url}" class="card-img-top" alt="...">
            <div class="card-body">
                <h3 class="card-title">${title}</h3>
                <p class="card-text">${description}</p>
        `;
        for (const key in textObj) {
            if (textObj.hasOwnProperty(key)) {
                const value = textObj[key];
                post += `
                    <h2>${key}</h2>
                    <p>${value}</p>
                `;
            }
        }
    
        post += `
            </div>
        </div>
        `;
        return post;
    }
})