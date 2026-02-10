document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll(".slideshow figure");
  let current = 0;
  let interval = null;

  // ---- SLIDESHOW ----
  function showSlide(index) {
    slides.forEach(s => s.classList.remove("show"));
    slides[index].classList.add("show");
  }

  function startSlideshow() {
    if (interval) return; // nicht doppelt starten
    interval = setInterval(() => {
      // wenn irgend ein Post offen ist -> nichts tun
      if (document.querySelector(".expandable.active")) return;

      current = (current + 1) % slides.length;
      showSlide(current);
    }, 4000);
  }

  function stopSlideshow() {
    clearInterval(interval);
    interval = null;
  }

  function showSlide(index) {
  slides.forEach(s => {
    s.classList.remove("show");
    s.classList.remove("active");   // ❗️HINZUGEFÜGT → alles schließen
  });

  slides[index].classList.add("show");
}


  // ---- INITIAL STATE ----
if (slides.length > 0) {
  showSlide(0);
  startSlideshow();
}


  // ---- EXPAND / COLLAPSE ----
document.querySelectorAll('.expandable .click-area').forEach(item => {
  item.addEventListener('click', () => {
    const figure = item.parentElement;

    figure.classList.toggle("active");

    // Wenn irgendein Post offen → Slideshow stoppen
    if (document.querySelector(".expandable.active")) {
      stopSlideshow();
    } else {
      startSlideshow();
    }

    // 👉 HIER NEU:
    if (figure.classList.contains("active")) {
      setTimeout(() => {
        figure.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 10); // kleine Verzögerung wegen Animation
    }

  });
});



// ---- MANUELLE NAVIGATION MIT PFEILEN ----
const prevBtn = document.querySelector(".slideshow .prev");
const nextBtn = document.querySelector(".slideshow .next");

if (prevBtn && nextBtn) {

  prevBtn.addEventListener("click", () => {
    stopSlideshow();
    current = (current - 1 + slides.length) % slides.length;
    showSlide(current);
  });

  nextBtn.addEventListener("click", () => {
    stopSlideshow();
    current = (current + 1) % slides.length;
    showSlide(current);
  });

}


// ---- BURGER MENU ----
const burger = document.getElementById("burger");
const mobileMenu = document.getElementById("mobileMenu");

if (burger && mobileMenu) {

  burger.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // Menü automatisch schließen beim Klick auf Link
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open");
    });
  });

}


});




document.addEventListener("DOMContentLoaded", function () {

  const aboutImages = document.querySelectorAll(".about-banner img");
  let i = 0;

  if (aboutImages.length > 0) {

    // erstes Bild sichtbar machen
    aboutImages[0].classList.add("active");

    setInterval(() => {
      aboutImages[i].classList.remove("active");

      i = (i + 1) % aboutImages.length;

      aboutImages[i].classList.add("active");
    }, 5000);   // 👉 alle 5 Sekunden
  }

});
