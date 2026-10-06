# Блок 1 · Хедер · index2.html + assets/css/style2.css
Роль: навигация, контакт, CTA. Статичный (не fixed) — осознанный уход от V9.

## Структура
header.topbar > .wrap.topbar__in: a.logo (omi_logo.svg 56px) · nav (ul/li: Мебель/Салоны/Проекты/Отзывы/Вопросы) · .topbar__right (a.topbar__phone, a.btn «Консультация», button.burger) · вне wrap: .floating-socials (fixed right, колонка).
.mnav: полноэкранное, ul/li, btn, телефон; inline-JS в index2 (open/close, lock scroll, close по ссылке).

## Копии
Телефон: +7 (902) 123-45-67. Кнопка: «Консультация». Пункты nav — как V9 (на сборке «Проекты» убрать, assembly.md).

## Решения (не откатывать)
Sansation Regular; телефон margin-left 20px от меню; бургер 46px = высоте кнопки.
≤1024: nav → бургер (телефон+кнопка остаются; бургер margin-left 16px). ≤640: кнопка → бургер; телефон absolute по центру (14px); лого 46px; wrap 24px.
floating-socials: fixed right 20px/bottom 120px, круги 44px графит #4f5052, иконки img filter белый → золото на hover, блик ::before без золотой заливки; ≤640 right 16/bottom 100, 40px.
Кнопка — «пластина золота» (общий компонент, см. spec-общее в memory §9).

## Заметки сборки
Якоря nav — по assembly.md; inline-JS бургера вынести в общий script.js.