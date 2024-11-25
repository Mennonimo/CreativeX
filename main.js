window.addEventListener('scroll', function() {
    let scrol = window.scrollY; // A posição do scroll na página
    let docHeight = document.documentElement.scrollHeight; // Altura total do documento
    let windowHeight = window.innerHeight; // Altura da janela de visualização
    let scrolPercentage = (scrol / (docHeight - windowHeight)) * 100; // Porcentagem de scroll

    let faixa = document.querySelector('.faixa-branca');

    console.log(scrolPercentage); // Exibe a porcentagem do scroll

    let parallax = document.querySelector('.parallax'); // O elemento com efeito parallax
    parallax.style.transform = 'translateY(-' + scrol * 0.5 + 'px)'; // Aplica o efeito parallax

    let planeta = document.querySelector('.parallax-planeta'); // Outro elemento com efeito parallax
    planeta.style.transform = 'translateY(-' + scrol * 1.5 + 'px)'; // Aplica o efeito no outro elemento

    if (scrolPercentage > 30) {
        faixa.style.animation = 'surgirFaixa forwards 0.8s ease';
    } else {
        faixa.style.animation = 'tirarFaixa forwards 0.8s ease';
    }
});