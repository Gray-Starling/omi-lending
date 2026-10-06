/* Форма */
var form = document.getElementById("leadForm");
var consentPd = document.getElementById("consentPd");
var consentInfo = document.getElementById("consentInfo");
var nameInput = form.querySelector('input[name="name"]');
var phoneInput = form.querySelector('input[name="phone"]');

form.addEventListener("submit", function (e) {
  e.preventDefault();
  var name = nameInput.value.trim();
  var phone = phoneInput.value.trim();
  var hasDigits = /\d/.test(phone);
  if (!name || !hasDigits || !consentPd.checked) {
    alert(
      "Пожалуйста, заполните имя, телефон и отметьте согласие на обработку данных.",
    );
    return;
  }
  var pd = consentPd.checked ? "Да" : "Нет";
  var info = consentInfo.checked ? "Да" : "Нет";
  alert(
    "Заявка отправлена!\n\nИмя: " +
      name +
      "\nТелефон: " +
      phone +
      "\n\nСогласие на обработку ПДн: " +
      pd +
      "\nИнформационные сообщения: " +
      info,
  );
  this.hidden = true;
  document.querySelector(".consent-group").hidden = true;
  document.getElementById("formOk").hidden = false;
});

/* Мобильное меню */
var burger = document.querySelector(".burger"),
  mnav = document.getElementById("mnav"),
  mclose = document.querySelector(".mnav__close");
function mToggle(open) {
  mnav.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);
  document.body.style.overflow = open ? "hidden" : "";
}
burger.addEventListener("click", function () {
  mToggle(true);
});
mclose.addEventListener("click", function () {
  mToggle(false);
});
mnav.querySelectorAll("a").forEach(function (a) {
  a.addEventListener("click", function () {
    mToggle(false);
  });
});

/* Fade-in */
var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduce && "IntersectionObserver" in window) {
  var io = new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 },
  );
  document.querySelectorAll(".fade").forEach(function (el) {
    io.observe(el);
  });
} else {
  document.querySelectorAll(".fade").forEach(function (el) {
    el.classList.add("visible");
  });
}

/* Sticky-CTA */
var mcta = document.getElementById("mcta");
window.addEventListener(
  "scroll",
  function () {
    mcta.classList.toggle("show", window.scrollY > 600);
  },
  { passive: true },
);
if ("IntersectionObserver" in window) {
  new IntersectionObserver(
    function (es) {
      es.forEach(function (e) {
        mcta.classList.toggle(
          "show",
          !e.isIntersecting && window.scrollY > 600,
        );
      });
    },
    { threshold: 0.2 },
  ).observe(document.getElementById("contacts"));
}

/* Карусели */
function initCarousel(carouselEl, autoInterval) {
  var viewport = carouselEl.querySelector(".carousel__viewport");
  var track = carouselEl.querySelector(".carousel__track");
  var items = track.children;
  var prevBtn = carouselEl.querySelector('[data-dir="prev"]');
  var nextBtn = carouselEl.querySelector('[data-dir="next"]');
  var currentIndex = 0;
  var totalItems = items.length;
  var autoTimer = null;
  var isPaused = false;

  function getVisibleCount() {
    return window.innerWidth <= 900 ? 1 : 3;
  }
  function updatePosition() {
    var itemsPerView = getVisibleCount();
    var itemWidth = items[0].offsetWidth;
    var gap = 24;
    var offset = currentIndex * (itemWidth + gap);
    track.style.transform = "translateX(-" + offset + "px)";
  }
  function next() {
    currentIndex =
      (currentIndex + 1) % Math.max(1, totalItems - getVisibleCount() + 1);
    updatePosition();
  }
  function prev() {
    currentIndex =
      currentIndex > 0
        ? currentIndex - 1
        : Math.max(0, totalItems - getVisibleCount());
    updatePosition();
  }
  function startAuto() {
    if (autoTimer) clearInterval(autoTimer);
    autoTimer = setInterval(function () {
      if (!isPaused) next();
    }, autoInterval);
  }
  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  nextBtn.addEventListener("click", function () {
    next();
    stopAuto();
    startAuto();
  });
  prevBtn.addEventListener("click", function () {
    prev();
    stopAuto();
    startAuto();
  });
  carouselEl.addEventListener("mouseenter", function () {
    isPaused = true;
  });
  carouselEl.addEventListener("mouseleave", function () {
    isPaused = false;
  });

  var isDragging = false,
    startX = 0;
  viewport.addEventListener("mousedown", function (e) {
    isDragging = true;
    viewport.classList.add("dragging");
    startX = e.pageX;
  });
  viewport.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
    e.preventDefault();
    var walk = startX - e.pageX;
    if (Math.abs(walk) > 50) {
      if (walk > 0) next();
      else prev();
      isDragging = false;
      viewport.classList.remove("dragging");
      stopAuto();
      startAuto();
    }
  });
  viewport.addEventListener("mouseup", function () {
    isDragging = false;
    viewport.classList.remove("dragging");
  });
  viewport.addEventListener("mouseleave", function () {
    isDragging = false;
    viewport.classList.remove("dragging");
  });

  var touchStartX = 0;
  viewport.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  });
  viewport.addEventListener("touchmove", function (e) {
    if (!touchStartX) return;
    var diff = touchStartX - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
      touchStartX = 0;
      stopAuto();
      startAuto();
    }
  });

  window.addEventListener("resize", function () {
    if (currentIndex > Math.max(0, totalItems - getVisibleCount()))
      currentIndex = Math.max(0, totalItems - getVisibleCount());
    updatePosition();
  });
  updatePosition();
  startAuto();
}
initCarousel(document.getElementById("projectsCarousel"), 5000);
initCarousel(document.getElementById("reviewsCarousel"), 6000);

/* Cookie-баннер */
var cookieBanner = document.getElementById("cookieBanner");
var cookieAccept = document.getElementById("cookieAccept");
if (!localStorage.getItem("cookieConsent")) {
  setTimeout(function () {
    cookieBanner.classList.add("show");
  }, 1500);
}
cookieAccept.addEventListener("click", function () {
  localStorage.setItem("cookieConsent", "true");
  cookieBanner.classList.remove("show");
});