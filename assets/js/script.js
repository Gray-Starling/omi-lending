/* Inline-скрипт для работы бургера */
    (function () {
      var burger = document.querySelector('.burger');
      var mnav = document.getElementById('mnav');
      var mclose = document.querySelector('.mnav__close');

      function openMenu() {
        mnav.classList.add('open');
        burger.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
      }

      function closeMenu() {
        mnav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }

      burger.addEventListener('click', openMenu);
      mclose.addEventListener('click', closeMenu);

      mnav.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', closeMenu);
      });
    })();
  

/* Появление .fade */
      (function () {
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("visible");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        document.querySelectorAll(".fade").forEach(function (el) {
          io.observe(el);
        });
      })();
    

      (function () {
        /* Появление при скролле */
        var io = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (e) {
              if (e.isIntersecting) {
                e.target.classList.add("visible");
                io.unobserve(e.target);
              }
            });
          },
          { threshold: 0.15 },
        );
        document.querySelectorAll(".fade").forEach(function (el) {
          io.observe(el);
        });

        /* Слайд-шоу: стрелки, точки, автоплей, свайп */
        var box = document.querySelector(".showcase");
        if (!box) return;
        var slides = box.querySelectorAll(".showcase__slide");
        var dotsBox = box.querySelector(".showcase__dots");
        var reduce = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        var i = 0,
          timer = null;

        slides.forEach(function (_, n) {
          var d = document.createElement("button");
          d.className = "showcase__dot";
          d.type = "button";
          d.setAttribute("aria-label", "Фото " + (n + 1));
          d.addEventListener("click", function () {
            go(n);
            restart();
          });
          dotsBox.appendChild(d);
        });
        var dots = dotsBox.querySelectorAll(".showcase__dot");

        function go(n) {
          i = (n + slides.length) % slides.length;
          slides.forEach(function (s, k) {
            s.classList.toggle("active", k === i);
          });
          dots.forEach(function (d, k) {
            d.classList.toggle("active", k === i);
          });
        }
        function restart() {
          clearInterval(timer);
          if (!reduce)
            timer = setInterval(function () {
              go(i + 1);
            }, 5000);
        }

        box
          .querySelector(".showcase__btn--next")
          .addEventListener("click", function () {
            go(i + 1);
            restart();
          });
        box
          .querySelector(".showcase__btn--prev")
          .addEventListener("click", function () {
            go(i - 1);
            restart();
          });
        box.addEventListener("mouseenter", function () {
          clearInterval(timer);
        });
        box.addEventListener("mouseleave", restart);

        var x0 = null;
        box.addEventListener(
          "touchstart",
          function (e) {
            x0 = e.touches[0].clientX;
          },
          { passive: true },
        );
        box.addEventListener(
          "touchend",
          function (e) {
            if (x0 === null) return;
            var dx = e.changedTouches[0].clientX - x0;
            if (Math.abs(dx) > 40) {
              go(i + (dx < 0 ? 1 : -1));
              restart();
            }
            x0 = null;
          },
          { passive: true },
        );

        go(0);
        restart();
      })();
    

/* Временный инлайн-скрипт блока (на сборке уйдёт в общий script.js) */
document.addEventListener('DOMContentLoaded', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els = document.querySelectorAll('.fade');

  // Видео: без автоплея при предпочтении «без движения»
  const video = document.querySelector('.salon-scene__video');
  if (video && reduced) { video.removeAttribute('autoplay'); video.pause(); }

  // Появление блоков
  if (reduced || !('IntersectionObserver' in window)) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
});

document.addEventListener('DOMContentLoaded', () => {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const noHover = matchMedia('(hover: none), (pointer: coarse)').matches;
  const mobileMQ = matchMedia('(max-width: 900px)');

  // Появление секции
  const fadeEls = document.querySelectorAll('.fade');
  if (reduced || !('IntersectionObserver' in window)) {
    fadeEls.forEach(el => el.classList.add('visible'));
  } else {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    }), { threshold: 0.15 });
    fadeEls.forEach(el => io.observe(el));
  }

  // ===== ДАННЫЕ КАТАЛОГА =====
  const slides = [
    { image: 'assets/img/solution-scandinavia.jpg', title: 'Скандинавия', price: 'от 50 000 ₽',
      bullets: ['Тумба с ящиками и доводчиками', 'Керамическая раковина', 'Фасады из влагостойкого МДФ'] },
    { image: 'assets/img/solution-loft.jpg', title: 'Лофт', price: 'от 80 000 ₽',
      bullets: ['Унитаз с инсталляцией', 'Хромированная кнопка смыва', 'Шкаф над инсталляцией'] },
    { image: 'assets/img/solution-modern.jpg', title: 'Модерн', price: 'от 60 000 ₽',
      bullets: ['Шкаф над стиральной машиной', 'Пенал для хранения', 'Единый стиль фасадов'] },
    { image: 'assets/img/solution-scandinavia.jpg', title: 'Классика', price: 'от 150 000 ₽',
      bullets: ['Тумба с раковиной и зеркалом', 'Пенал и шкаф над инсталляцией', 'Подбор сантехники и аксессуаров'] }
  ];

  const stage = document.getElementById('stage');
  const dotsWrap = document.querySelector('.carousel__dots');
  const prev = document.querySelector('.carousel__arrow--prev');
  const next = document.querySelector('.carousel__arrow--next');
  const car = document.getElementById('solutions-carousel');
  if (!stage || !slides.length) return;

  // Все карточки одинаковые: фото сверху + информация снизу
  slides.forEach((s, i) => {
    const el = document.createElement('article');
    el.className = 'solution-slide';
    el.dataset.index = i;
    el.innerHTML = `
      <div class="solution-slide__media" style="background-image:url('${s.image}')" aria-hidden="true"></div>
      <div class="solution-slide__body">
        <h3 class="solution-slide__title">${s.title}</h3>
        <ul class="solution-slide__list">${s.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        <div class="solution-slide__footer">
          <span class="solution-slide__price">${s.price}</span>
          <a href="#contacts" data-topic="Решение «${s.title}»" class="btn">Хочу такую же</a>
        </div>
      </div>`;
    stage.appendChild(el);

    const d = document.createElement('button');
    d.className = 'carousel__dot'; d.type = 'button';
    d.setAttribute('role', 'tab');
    d.setAttribute('aria-label', `Слайд ${i + 1}: ${s.title}`);
    dotsWrap.appendChild(d);
  });

  const allSlides = Array.from(stage.children);
  const allDots = Array.from(dotsWrap.children);
  let current = 0, autoTimer = null, hovered = false;
  let lastDir = 1, first = true;

  // ===== РАСКЛАДКА: анимируется ТОЛЬКО смена позиций =====
  function render() {
    const n = slides.length;
    const w = allSlides[0].offsetWidth;
    const scale = 0.8, gap = 24;
    const offset = w / 2 + gap + (w * scale) / 2;
    const exitOff = stage.clientWidth / 2 + (w * scale) / 2 + 60;

    allSlides.forEach((el, i) => {
      const diff = ((i - current) % n + n) % n;
      el.classList.remove('solution-slide--center', 'solution-slide--side', 'solution-slide--hidden');
      let role, tx, sc, op, z;

      if (diff === 0)          { role = 'center'; tx = 0;       sc = 1;    op = 1;  z = 3; }
      else if (diff === 1)     { role = 'right';  tx = offset;  sc = scale; op = .9; z = 2; }
      else if (diff === n - 1) { role = 'left';   tx = -offset; sc = scale; op = .9; z = 2; }
      else                     { role = 'hidden'; tx = lastDir === 1 ? -exitOff : exitOff; sc = scale; op = 0; z = 1; }

      // Входящая карточка: невидимый прыжок за экран, затем плавный въезд
      const prevRole = el._role;
      if (prevRole === 'hidden' && (role === 'right' || role === 'left')) {
        const enterTx = role === 'right' ? exitOff : -exitOff;
        el.style.transition = 'none';
        el.style.opacity = '0';
        el.style.transform = `translate(-50%,-50%) translateX(${enterTx}px) scale(${scale})`;
        void el.offsetWidth;
        el.style.transition = '';
      }
      if (first) el.style.transition = 'none';

      el._role = role;
      el.style.zIndex = z;
      el.style.opacity = op;
      el.style.transform = `translate(-50%,-50%) translateX(${tx}px) scale(${sc})`;
    });

    if (first) {
      void stage.offsetWidth;
      allSlides.forEach(el => { el.style.transition = ''; });
      first = false;
    }
    allDots.forEach((d, i) => d.classList.toggle('carousel__dot--active', i === current));
  }

  function goTo(i, dir) {
    const n = slides.length;
    const nextPos = ((i % n) + n) % n;
    if (nextPos === current) return;
    if (dir === undefined) {
      const fwd = (nextPos - current + n) % n;
      dir = fwd <= n / 2 ? 1 : -1;
    }
    lastDir = dir;
    current = nextPos;
    render();
  }

  // ===== АВТОПЛЕЙ: только десктоп с hover; на тач и мобилках — нет =====
  function stopAuto() { if (autoTimer) { clearInterval(autoTimer); autoTimer = null; } }
  function startAuto() {
    stopAuto();
    if (reduced || hovered || noHover || mobileMQ.matches) return;
    autoTimer = setInterval(() => goTo(current + 1, 1), 6000);
  }

  prev.addEventListener('click', () => { goTo(current - 1, -1); startAuto(); });
  next.addEventListener('click', () => { goTo(current + 1, 1); startAuto(); });
  allDots.forEach((d, i) => d.addEventListener('click', () => { goTo(i); startAuto(); }));

  // Клик по боковой карточке = она в центр
  stage.addEventListener('click', e => {
    const s = e.target.closest('.solution-slide');
    if (!s || e.target.closest('.btn')) return;
    const idx = +s.dataset.index;
    if (idx !== current) { goTo(idx); startAuto(); }
  });

  car.addEventListener('mouseenter', () => { hovered = true; stopAuto(); });
  car.addEventListener('mouseleave', () => { hovered = false; startAuto(); });

  // Свайп
  let sx = 0, sy = 0, tr = false;
  stage.addEventListener('touchstart', e => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; tr = true; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (!tr) return;
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
      goTo(current + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      startAuto();
    }
    tr = false;
  });

  window.addEventListener('resize', () => { render(); startAuto(); });
  render();
  startAuto();
});

  // Кнопки "Читать полностью" — мгновенное переключение без анимации
  (function () {
    function setupReadMore(cardClass) {
      var card = document.querySelector('.' + cardClass);
      var btn = card.querySelector('.rev__readmore');
      if (!card || !btn) return;

      btn.addEventListener('click', function () {
        card.classList.toggle('is-expanded');
        btn.textContent = card.classList.contains('is-expanded') ? 'Свернуть' : 'Читать полностью';
      });
    }

    setupReadMore('rev_1');
    setupReadMore('rev_3');
    setupReadMore('rev_5');
    setupReadMore('rev_6');
  })();

  // Карусель отзывов
  (function () {
    var viewport = document.querySelector('.carousel__viewport');
    var track = document.querySelector('.carousel__track');
    var prev = document.querySelector('.carousel__btn--prev');
    var next = document.querySelector('.carousel__btn--next');
    if (!viewport || !track) return;

    var slides = Array.from(track.children);
    var index = 0;
    var perView = 3;
    var gap = 24;

    function updatePerView() {
      var w = window.innerWidth;
      perView = w <= 640 ? 1 : w <= 900 ? 2 : 3;
    }

    function slideWidth() {
      var wrapW = viewport.clientWidth;
      return (wrapW - gap * (perView - 1)) / perView;
    }

    function render() {
      updatePerView();
      var sw = slideWidth();
      slides.forEach(function (s) { s.style.flex = '0 0 ' + sw + 'px'; });
      var offset = index * (sw + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';
    }

    function maxIndex() {
      return Math.max(0, slides.length - perView);
    }

    function clamp() {
      if (index > maxIndex()) index = maxIndex();
      if (index < 0) index = 0;
    }

    prev.addEventListener('click', function () {
      index--;
      clamp();
      render();
    });
    next.addEventListener('click', function () {
      index++;
      clamp();
      render();
    });

    var dragging = false, startX = 0, startOffset = 0;
    viewport.addEventListener('mousedown', function (e) {
      dragging = true;
      viewport.classList.add('dragging');
      startX = e.clientX;
      startOffset = index * (slideWidth() + gap);
    });
    window.addEventListener('mousemove', function (e) {
      if (!dragging) return;
      var dx = e.clientX - startX;
      track.style.transition = 'none';
      track.style.transform = 'translateX(-' + (startOffset - dx) + 'px)';
    });
    window.addEventListener('mouseup', function (e) {
      if (!dragging) return;
      dragging = false;
      viewport.classList.remove('dragging');
      track.style.transition = '';
      var dx = e.clientX - startX;
      var threshold = slideWidth() / 4;
      if (dx < -threshold) index++;
      else if (dx > threshold) index--;
      clamp();
      render();
    });

    viewport.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
      startOffset = index * (slideWidth() + gap);
    }, { passive: true });
    viewport.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - startX;
      var threshold = slideWidth() / 4;
      if (dx < -threshold) index++;
      else if (dx > threshold) index--;
      clamp();
      render();
    });

    window.addEventListener('resize', function () {
      clamp();
      render();
    });

    render();
  })();

  // Fade-in при скролле (на сборке вынесется в общий script.js)
  (function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.fade').forEach(function(el){ el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade').forEach(function(el){ io.observe(el); });
  })();

  // Fade-in при скролле
  (function(){
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll('.fade').forEach(function(el){ el.classList.add('visible'); });
      return;
    }
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.fade').forEach(function(el){ io.observe(el); });
  })();

  // Форма: валидация на блур + позитив при вводе + ошибки после попытки отправки
  (function(){
    var form = document.querySelector('.ctaform__form');
    if (!form) return;

    var nameInput = form.querySelector('[name="name"]');
    var phoneInput = form.querySelector('[name="phone"]');
    var pdnCheckbox = document.querySelector('[name="pdn"]');
    var consentWrap = document.querySelector('.consent');
    var consentError = document.querySelector('.consent-error');

    var submitted = false;

    // --- Санитизация: защита от инъекций ---
    function sanitize(value) {
      return value
        .replace(/[<>]/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, '')
        .trim();
    }

    // --- Фильтр ввода телефона ---
    function cleanPhone(value, caretPos) {
      if (typeof caretPos !== 'number') caretPos = value.length;
      var cleaned = '';
      var newCaret = 0;
      var hasDigit = false;
      var hasPlus = false;
      for (var i = 0; i < value.length; i++) {
        var ch = value[i];
        var keep = false;
        if (/[0-9]/.test(ch)) { keep = true; hasDigit = true; }
        else if (ch === '+') { if (!hasDigit && !hasPlus) { keep = true; hasPlus = true; } }
        else if (ch === ' ' || ch === '-' || ch === '(' || ch === ')') { if (cleaned !== '') keep = true; }
        if (keep) { cleaned += ch; if (i < caretPos) newCaret++; }
      }
      return { value: cleaned, caret: newCaret };
    }

    // --- Валидаторы ---
    function validateName(value) {
      var cleaned = sanitize(value);
      if (cleaned.length === 0) return { valid: false, message: 'Введите имя' };
      if (cleaned.length < 2) return { valid: false, message: 'Минимум 2 символа' };
      if (cleaned.length > 50) return { valid: false, message: 'Максимум 50 символов' };
      if (!/^[a-zA-Zа-яА-ЯёЁёЁ\s'-]+$/.test(cleaned)) {
        return { valid: false, message: 'Только буквы, пробелы, дефисы и апострофы' };
      }
      return { valid: true, message: '' };
    }

    function validatePhone(value) {
      var cleaned = sanitize(value);
      var digits = cleaned.replace(/\D/g, '');
      if (digits.length === 0) return { valid: false, message: 'Введите номер телефона' };
      if (digits.length < 5) return { valid: false, message: 'Номер слишком короткий' };
      if (digits.length > 15) return { valid: false, message: 'Номер слишком длинный' };
      if (/^(\d)\1*$/.test(digits)) return { valid: false, message: 'Проверьте номер' };
      return { valid: true, message: '' };
    }

    // --- Отрисовка состояния поля ---
    // Позитив (галочка) — при вводе, как только валидно.
    // Ошибка — после блура для заполненных, либо после попытки отправки.
    function renderField(input, validateFn) {
      var control = input.closest('.contact__control');
      var field = input.closest('.contact__field');
      var errorEl = field ? field.querySelector('.field-error') : null;
      var result = validateFn(input.value);
      var isEmpty = input.value.trim() === '';

      if (result.valid && !isEmpty) {
        control.classList.add('is-valid');
      } else {
        control.classList.remove('is-valid');
      }

      var showError = (!result.valid) && ((control.dataset.touched === 'true' && !isEmpty) || submitted);
      if (showError) {
        control.classList.add('is-invalid');
        if (errorEl) errorEl.textContent = result.message;
      } else {
        control.classList.remove('is-invalid');
        if (errorEl) errorEl.textContent = '';
      }

      return result.valid;
    }

    // --- Ввод: позитив + фильтр телефона ---
    nameInput.addEventListener('input', function(){
      renderField(nameInput, validateName);
    });

    phoneInput.addEventListener('input', function(){
      var caret = phoneInput.selectionStart;
      var cleaned = cleanPhone(phoneInput.value, caret);
      if (cleaned.value !== phoneInput.value) {
        phoneInput.value = cleaned.value;
        phoneInput.setSelectionRange(cleaned.caret, cleaned.caret);
      }
      renderField(phoneInput, validatePhone);
    });

    // --- Блур: поле «тронуто», показываем ошибку для заполненных ---
    nameInput.addEventListener('blur', function(){
      nameInput.closest('.contact__control').dataset.touched = 'true';
      renderField(nameInput, validateName);
    });
    phoneInput.addEventListener('blur', function(){
      phoneInput.closest('.contact__control').dataset.touched = 'true';
      renderField(phoneInput, validatePhone);
    });

    // --- Чекбокс: снимаем ошибку при отметке ---
    if (pdnCheckbox) {
      pdnCheckbox.addEventListener('change', function(){
        if (pdnCheckbox.checked) {
          consentWrap.classList.remove('is-invalid');
          if (consentError) consentError.textContent = '';
        }
      });
    }

    // --- Отправка ---
    form.addEventListener('submit', function(e){
      e.preventDefault();
      submitted = true;

      var nameValid = renderField(nameInput, validateName);
      var phoneValid = renderField(phoneInput, validatePhone);

      var pdnChecked = pdnCheckbox ? pdnCheckbox.checked : false;
      if (!pdnChecked) {
        consentWrap.classList.add('is-invalid');
        if (consentError) consentError.textContent = 'Отметьте согласие на обработку данных';
      }

      if (!nameValid) { nameInput.focus(); return; }
      if (!phoneValid) { phoneInput.focus(); return; }
      if (!pdnChecked) { pdnCheckbox.focus(); return; }

      var name = sanitize(nameInput.value);
      var phone = sanitize(phoneInput.value);

      alert('Заявка отправлена!\nИмя: ' + name + '\nТелефон: ' + phone + '\n\nМенеджер OMI свяжется с вами в рабочее время.');

      form.style.display = 'none';
      document.querySelector('.consent-group').style.display = 'none';
      document.querySelector('.form-ok').style.display = 'block';
    });
  })();

/* ============================================================
COOKIE-БАННЕР
============================================================ */
(function () {
  var banner = document.getElementById('cookie');
  var acceptBtn = document.getElementById('cookieAccept');
  var rejectBtn = document.getElementById('cookieReject');
  var STORAGE_KEY = 'omi_cookie_consent'; // 'accepted' | 'rejected'

  if (!banner) return;

  function hide() {
    banner.classList.remove('is-visible');
    setTimeout(function () {
      banner.hidden = true;
    }, 500);
  }

  var hasChoice = false;
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    hasChoice = stored === 'accepted' || stored === 'rejected';
  } catch (e) {
    hasChoice = false;
  }

  if (!hasChoice) {
    banner.hidden = false;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        banner.classList.add('is-visible');
      });
    });
  }

  if (acceptBtn) {
    acceptBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'accepted'); } catch (e) {}
      hide();
    });
  }

  if (rejectBtn) {
    rejectBtn.addEventListener('click', function () {
      try { localStorage.setItem(STORAGE_KEY, 'rejected'); } catch (e) {}
      hide();
      // TODO: логика отказа (блокировка трекеров/аналитики) — доделывается отдельно
    });
  }
})();

/* Тема заявки: кнопки с data-topic подставляют выбор в форму */
(function () {
  var form = document.querySelector('.ctaform__form');
  if (!form) return;
  var hidden = form.querySelector('[name="topic"]');
  var line = form.querySelector('.ctaform__topic');
  var text = form.querySelector('.ctaform__topic-text');
  var reset = form.querySelector('.ctaform__topic-reset');
  if (!hidden || !line || !text || !reset) return;

  function setTopic(value) {
    hidden.value = value;
    text.textContent = value;
    line.hidden = !value;
  }

  document.addEventListener('click', function (e) {
    var a = e.target.closest ? e.target.closest('a[data-topic]') : null;
    if (a) setTopic(a.getAttribute('data-topic') || '');
    else {
      var plain = e.target.closest ? e.target.closest('a[href="#contacts"]') : null;
      if (plain) setTopic('');
    }
  });

  reset.addEventListener('click', function () { setTopic(''); });
})();
