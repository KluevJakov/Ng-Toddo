setTimeout( () => {
let pi = document.getElementById('promoInner');
if (pi != null) {
    let hueValue = 0;
    let timer = setInterval(() => {
        hueValue++;
        if (hueValue > 360) {
            hueValue = 0;
        }
    pi.style.backdropFilter = "hue-rotate("+hueValue+"deg)";
    }, 50); 
}
}, 1000);