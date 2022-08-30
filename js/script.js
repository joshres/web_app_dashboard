const alertBanner = document.getElementById("alert");

alertBanner.innerHTML = 
    `
     <div class="alert-banner">
        <div><p><strong>Alert:</strong> You have <strong>6</strong> unread messages</p></div>
        <div><p class="alert-banner-close">x</p></div>
    </div>
    `

alertBanner.addEventListener('click', e => {
    const element = e.target;
    if (element.classList.contains("alert-banner-close")) {
        alertBanner.style.display = "none";
    }
});