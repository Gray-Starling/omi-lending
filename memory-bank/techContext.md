# Tech Context — OMI Lending

## Технологии
- **HTML5** — семантическая разметка, Open Graph, доступность (aria-*, rel).
- **CSS3** — кастомные свойства (`:root`), @font-face, Flexbox, анимации (keyframes), адаптивная вёрстка (media), `scroll-behavior`.
- **JavaScript (ES5+)** — IntersectionObserver API, localStorage, манипуляции DOM, валидация.
- **Шрифты:** локальные TTF — Mulish (4 начертания), Sansation (6), Tenor Sans (1).

## Фреймворки / библиотеки: отсутствуют.

## Инструменты
- **Git** — три ветки: `main`, `dev` (текущая), `pre-prod`. Ориджин — Github.
- **Cline / .clinerules** — память агента; правила в `.clinerules/memory-bank.md`.
- **.clineignore** — исключает `node_modules/`, `*.min.*`, `.git/`, `.vscode/`, `fonts/`, `images/archive/`, `*.log`.
- **Скриншоты** — в `screenshots/` (не в git), full-page desktop/mobile.
- **Аудит** — папка `audit/` (пустая, готовится к наполнению: `context/`, `instructions/`, `reports/`).

## Модели и роли (07.10.2026)
- **Act Mode:** `deepseek/deepseek-v4-flash-0731`, провайдер StreamLake (подтверждён). Кэш-чтение 0.17 ₽/M, вход 5.39 ₽/M, выход 16 ₽/M. Оптимален для правок HTML/CSS/JS.
- **Plan Mode:** `deepseek/deepseek-v4-pro-0813`. Вход 98 ₽/M. Для планирования и анализа.
- **Браузер:** Claude Sonnet 5.5 (бесплатно). Для маркетинговых суждений.
- **Vision:** GPT-6 Luna (только при необходимости работы с изображениями).
- **Не использовать в API:** GPT-6 Luna/PRO, Sol, Astra, Haiku, Flash V4.1 — дороже Flash 0731 без преимуществ.

## Среда запуска
1. Открыть `index.html` прямо в браузере (локальные пути `assets/...`).
2. Или обслужить корень любым статическим сервером:
   ```bash
   python3 -m http.server 8000
   # или
   npx serve .
   ```

## Тестирование
- Автоматические тесты отсутствуют.
- Проверка — вручную: визуальный осмотр, скролл, отправка формы, карусели, адаптив (≈390px / 1440px).

## Ограничения
- Нет сборки, линтеров, пре-коммит-хуков.
- Нет бэкенда — форма использует `action="#"`, данные не отправляются никуда.
- Правовые страницы пусты.
- JS содержит дублирующиеся блоки IntersectionObserver (возможно, артефакты рефакторинга).

## Настройки инструментов
- История команд git: `export GIT_PAGER=cat`.
- Формат коммитов на ветке `dev`: префикс `A1`–`A5` для аудита, далее `Bn`, `Cn`.