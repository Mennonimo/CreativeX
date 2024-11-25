function addComentario() {
    let i;
    let chave;
    let valor;
    let valorChave;
    let chaveComentario;

    for (i = 0; i < localStorage.length; i++) {

        let main = document.querySelector(".conjuntoTodo");

        chave = localStorage.key(i);

        chaveComentario = chave.replace(/\d+$/, "");
        if (chaveComentario == "comentario") {
            valor = JSON.parse(localStorage.getItem(chave));
            valorChave = parseInt(chave.replace(/\D/g, ""));

            let nome = valor.nome;
            let descricao = valor.descricao;
            let tags = valor.tags;
            let upvotes = valor.upvotes;
            let downvotes = valor.downvotes;

            let wrapper = document.createElement("div");
            wrapper.setAttribute("class", "wrapper");
            wrapper.setAttribute("id", "wrapper" + valorChave);



            wrapper.innerHTML = `
                <div class="before-wrapper" id="before-wrapper${valorChave}"></div>
                <div class="display">
                <div class="textos">
                    <div class="nome">
                        <h2>${nome}</h2>
                    </div>
                    <div class="comentario">
                        <h2>${descricao}</h2>
                    </div>
                    <div class="funcional">
                        <div class="tags">
                            <h2>${tags}</h2>
                        </div>
                        <div class="votes">
                            <div class="arrow-up">
                                <input type="button" value="🢧" onclick="darLike(${valorChave})">
                                <h2 class="likes" id="upVote${valorChave}">${upvotes}</h2>
                            </div>
                            <div class="arrow-down">
                                <input type="button" value="🢧" onclick="darDesLike(${valorChave})">
                                <h2 class="desliikes" id="downVote${valorChave}">${downvotes}</h2>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <span></span>
            <span></span>
            `;

            main.appendChild(wrapper);

            if (localStorage.getItem("votos") !== null) {

                var votos = JSON.parse(localStorage.getItem("votos"));

                if (votos["comentario" + valorChave] !== null) {
                    let voto = parseInt(votos["comentario" + valorChave]);
                    if (voto == 1) {
                        let before = document.getElementById("before-wrapper" + valorChave);
                        before.classList.add("display");
                        before.style.display = "block";
                    }
                }
            }

        }
    }
}


function darLike(id) {

    if (localStorage.getItem("votos") !== null) {

        var votos = JSON.parse(localStorage.getItem("votos"));

        if (votos["comentario" + id] == null) {
            votos["comentario" + id] = 0;
            localStorage.setItem("votos", JSON.stringify(votos));
        }

        let voto = parseInt(votos["comentario" + id]);

        if (voto == 0) {
            let seta = document.getElementById("upVote" + id);
            let valorDeLikes = parseInt(seta.textContent);
            valorDeLikes++;
            seta.textContent = valorDeLikes;

            let item = JSON.parse(localStorage.getItem("comentario" + id));
            item.upvotes++;
            localStorage.setItem("comentario" + id, JSON.stringify(item));

            votos["comentario" + id] = 1;
            localStorage.setItem("votos", JSON.stringify(votos));

            let before = document.getElementById("before-wrapper" + id);
            before.classList.add("display");
            before.style.display = "block";

        } else if (voto == 2) {
            let seta = document.getElementById("upVote" + id);
            let setaContraria = document.getElementById("downVote" + id);
            let valorDeDesLikes = parseInt(setaContraria.textContent);
            let valorDeLikes = parseInt(seta.textContent);
            valorDeDesLikes--;
            valorDeLikes++;
            setaContraria.textContent = valorDeDesLikes;
            seta.textContent = valorDeLikes;

            let item = JSON.parse(localStorage.getItem("comentario" + id));
            item.upvotes++;
            item.downvotes--;
            localStorage.setItem("comentario" + id, JSON.stringify(item));

            votos["comentario" + id] = 1;
            localStorage.setItem("votos", JSON.stringify(votos));

            let before = document.getElementById("before-wrapper" + id);
            before.classList.add("display");
            before.style.display = "block";
        }
    } else {
        let seta = document.getElementById("upVote" + id);
        let valorDeLikes = parseInt(seta.textContent);
        valorDeLikes++;
        seta.textContent = valorDeLikes;

        let item = JSON.parse(localStorage.getItem("comentario" + id));
        item.upvotes++;
        localStorage.setItem("comentario" + id, JSON.stringify(item));

        let votos = {
            ["comentario" + id]: 1
        };
        localStorage.setItem("votos", JSON.stringify(votos));

        let style = document.styleSheets[0];
        style.insertRule(`
                #wrapper`+ id + `::before {
                    display: block;
                }        
            `);
        let before = document.getElementById("before-wrapper" + id);
        before.classList.add("display");
        before.style.display = "block";
    }
}

function darDesLike(id) {
    if (localStorage.getItem("votos")) {

        var votos = JSON.parse(localStorage.getItem("votos"));
        let voto = parseInt(votos["comentario" + id]);

        if (voto == 0) {
            let seta = document.getElementById("downVote" + id);
            let valorDeLikes = parseInt(seta.textContent);
            valorDeLikes++;
            seta.textContent = valorDeLikes;

            let item = JSON.parse(localStorage.getItem("comentario" + id));
            item.downvotes++;
            localStorage.setItem("comentario" + id, JSON.stringify(item));

            votos["comentario" + id] = 2;
            localStorage.setItem("votos", JSON.stringify(votos));

        } else if (voto == 1) {
            let seta = document.getElementById("downVote" + id);
            let setaContraria = document.getElementById("upVote" + id);
            let valorDeDesLikes = parseInt(seta.textContent);
            let valorDeLikes = parseInt(setaContraria.textContent);
            valorDeDesLikes++;
            valorDeLikes--;
            seta.textContent = valorDeDesLikes;
            setaContraria.textContent = valorDeLikes;

            let item = JSON.parse(localStorage.getItem("comentario" + id));
            item.upvotes--;
            item.downvotes++;
            localStorage.setItem("comentario" + id, JSON.stringify(item));

            votos["comentario" + id] = 2;
            localStorage.setItem("votos", JSON.stringify(votos));

            let before = document.getElementById("before-wrapper" + id);
            before.classList.add("display");
            before.style.display = "none";
        }
    } else {
        let seta = document.getElementById("downVote" + id);
        let valorDeLikes = parseInt(seta.textContent);
        valorDeLikes++;
        seta.textContent = valorDeLikes;

        let item = JSON.parse(localStorage.getItem("comentario" + id));
        item.downvotes++;
        localStorage.setItem("comentario" + id, JSON.stringify(item));

        let votos = {
            ["comentario" + id]: 2
        };
        localStorage.setItem("votos", JSON.stringify(votos));
    }
}

window.addEventListener('scroll', function() {
    let scrol = window.scrollY;  // A posição do scroll na página
    let parallax = document.querySelector('.parallax'); // O elemento com efeito parallax
    
    parallax.style.transform = 'translateY(-' + scrol * 0.5 + 'px)';
});

