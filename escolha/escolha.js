window.addEventListener('mousemove', function(event) {

    var parallax = document.querySelector('.parallax');
    var card1 = document.querySelector('.card1-backview');
    var card2 = document.querySelector('.card2-backview');

    let mouseX = event.clientX;
    let mouseY = event.clientY;

    let centroX = window.innerWidth/2;
    let centroY = window.innerHeight/2;

    let posX = (mouseX - centroX) * 0.05;
    let posY = (mouseY - centroY) * 0.05;
    
    parallax.style.transform = `translate(${posX}px, ${posY}px)`;
});