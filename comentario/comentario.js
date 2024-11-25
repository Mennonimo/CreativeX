function formulario() {
    let nome = document.getElementById('nome').value;
    let descricao = document.getElementById('descricao').value;
    let tags = document.getElementById('tags').value;

    var item = "";
    var texto = "";
    var comentarios = 0;

    if (nome == "" || descricao == "" || tags == "") {
        alert("preencha todos os campos!!");
    } else {
        let comentario = {
            nome: nome,
            descricao: descricao,
            tags: tags,
            upvotes: 0,
            downvotes: 0
        };

        let tamanho = localStorage.length;

        for (let i = 0; i < tamanho; i++) {
            item = localStorage.key(i);
            texto = item.replace(/\d+$/, "");
            if (texto == "comentario") {
                comentarios++;
            }
        }

        if (comentarios <= 0) {
            localStorage.setItem("comentario0", JSON.stringify(comentario));
            window.location.href = '../comunidade/comunidade.html';
        }

        if (comentarios > 0) {
            localStorage.setItem("comentario" + comentarios, JSON.stringify(comentario));
            window.location.href = '../comunidade/comunidade.html';
        }
    }
}

window.addEventListener('mousemove', function (event) {

    var item = document.querySelector('.formulario');

    let bordas = item.getBoundingClientRect();

    if (
        event.clientX >= bordas.left &&
        event.clientX <= bordas.right &&
        event.clientY >= bordas.top &&
        event.clientY <= bordas.bottom
    ) {
        item.style.transform = `rotateX(0deg) rotateY(0deg)`;
        item.style.transition = 'all 0.3s ease'
        item.style.transform = `scale(1.1)`;
    } else {
        let mouseX = event.clientX;
        let mouseY = event.clientY;

        let centroX = window.innerWidth / 2;
        let centroY = window.innerHeight / 2;

        let posX = (mouseX - centroX) * 0.05;
        let posY = (centroY - mouseY) * 0.05;

        item.style.transform = `rotateX(${posY}deg) rotateY(${posX}deg)`;
    }
});