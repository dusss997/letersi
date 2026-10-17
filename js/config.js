/* =========================================================
   config.js — skema, vlerat default dhe ruajtja e cilësimeve
   Përdoret nga faqja (site.js) dhe paneli (admin.js).
   ========================================================= */
window.MA = (function () {
  "use strict";

  var STORAGE_KEY = "ma_site_config_v1";

  /* Fontet e disponueshme (duhet të ngarkohen edhe në index.html) */
  var FONTS = [
    "Cormorant Garamond",
    "Playfair Display",
    "EB Garamond",
    "Libre Baskerville",
    "Lora",
    "Merriweather",
    "Source Serif 4",
    "Inter",
    "Poppins",
    "Montserrat",
    "Jost",
    "Georgia",
  ];

  /* ---------------------------------------------------------
     SKEMA — çdo fushë ka: k (çelës), label, type, def
     type: text | html | textarea | image | color | select | range
     --------------------------------------------------------- */
  var SCHEMA = [
    {
      group: "Tema & Ngjyrat",
      icon: "&#127912;",
      fields: [
        { k: "theme.gold", label: "Ngjyra e artë (theksi 1)", type: "color", def: "#d9b45c" },
        { k: "theme.blue", label: "Ngjyra blu (theksi 2)", type: "color", def: "#7fb0d8" },
        { k: "theme.bg", label: "Sfondi kryesor", type: "color", def: "#0a0a0c" },
        { k: "theme.bg2", label: "Sfondi i dytë", type: "color", def: "#101013" },
        { k: "theme.ink", label: "Ngjyra e tekstit", type: "color", def: "#ece7dd" },
        { k: "theme.fontHeading", label: "Fonti i titujve", type: "select", def: "Cormorant Garamond", options: FONTS },
        { k: "theme.fontBody", label: "Fonti i tekstit", type: "select", def: "Inter", options: FONTS },
        { k: "theme.baseSize", label: "Madhësia bazë e tekstit (px)", type: "range", def: "16", min: 13, max: 22, step: 1 },
      ],
    },
    {
      group: "Sfondet (foto)",
      icon: "&#128444;",
      fields: [
        { k: "theme.bgImage", label: "Foto sfondi e tërë faqes", type: "image", def: "" },
        { k: "theme.bgOpacity", label: "Dukshmëria e sfondit", type: "range", def: "22", min: 0, max: 100, step: 1 },
        { k: "theme.heroImage", label: "Foto sfondi e hero-it", type: "image", def: "" },
        { k: "theme.heroOpacity", label: "Dukshmëria e hero-it", type: "range", def: "35", min: 0, max: 100, step: 1 },
      ],
    },
    {
      group: "Fotot e autorëve",
      icon: "&#128100;",
      fields: [
        { k: "img.migjeni", label: "Portreti i Migjenit", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzYwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlBvcnRyZXQgc3RpbGl6dWFyIGkgTWlnamVuaXQiPgogIDxkZWZzPgogICAgPHJhZGlhbEdyYWRpZW50IGlkPSJiZ00iIGN4PSI1MCUiIGN5PSIzNCUiIHI9Ijc4JSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMzYTJiMTgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1NSUiIHN0b3AtY29sb3I9IiMyMDE2MGMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMGMwODA1Ii8+CiAgICA8L3JhZGlhbEdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJnb2xkTSIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZjdlMmEzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNDUlIiBzdG9wLWNvbG9yPSIjZDliNDVjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzhmNmEyMyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYnVzdE0iIHgxPSIwIiB5MT0iMCIgeDI9IjAiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFiMTcxMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNzA2MDUiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8cGF0dGVybiBpZD0iaGF0Y2hNIiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHBhdHRlcm5UcmFuc2Zvcm09InJvdGF0ZSgzNSkiPgogICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMTAiIHN0cm9rZT0iI2Q5YjQ1YyIgc3Ryb2tlLW9wYWNpdHk9IjAuMDkiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KCiAgPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI3NjAiIGZpbGw9InVybCgjYmdNKSIvPgogIDxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNzYwIiBmaWxsPSJ1cmwoI2hhdGNoTSkiLz4KCiAgPGcgb3BhY2l0eT0iMC41IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjZ29sZE0pIiBzdHJva2Utd2lkdGg9IjEuNCI+CiAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIzMzAiIHI9IjIzMiIvPgogICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzMwIiByPSIyNDYiIHN0cm9rZS1kYXNoYXJyYXk9IjIgOSIgc3Ryb2tlLW9wYWNpdHk9IjAuNiIvPgogIDwvZz4KCiAgPHBhdGggZD0iTTMwMCAxMThjLTcyIDAtMTE4IDU2LTExOCAxMzIgMCAzMCA4IDU4IDIyIDgwLTE0IDIwLTIyIDQ2LTIyIDc0djE2OGMwIDIyIDE4IDQwIDQwIDQwaDE1NmMyMiAwIDQwLTE4IDQwLTQwVjQwNGMwLTI4LTgtNTQtMjItNzQgMTQtMjIgMjItNTAgMjItODAgMC03Ni00Ni0xMzItMTE4LTEzMnoiCiAgICAgICAgZmlsbD0idXJsKCNidXN0TSkiIHN0cm9rZT0idXJsKCNnb2xkTSkiIHN0cm9rZS13aWR0aD0iMiIvPgoKICA8cGF0aCBkPSJNMjQyIDI1MGMwLTQwIDI2LTY0IDU4LTY0czU4IDI0IDU4IDY0YzAgMzQtMTQgNjItMzQgODItNiA2LTE0IDEwLTI0IDEwcy0xOC00LTI0LTEwYy0yMC0yMC0zNC00OC0zNC04MnoiIGZpbGw9IiMyYTIzMWEiLz4KICA8cGF0aCBkPSJNMjU2IDIxNGMxNC0xOCAzNC0yOCA1NC0yNCAyMiA0IDM4IDIwIDQ0IDQyLTE2LTEyLTM0LTE4LTUyLTE4LTE4IDAtMzQgNC00NiAxMnoiIGZpbGw9IiMwZDBiMDgiLz4KICA8cGF0aCBkPSJNMjQ2IDI2OGMtMTItNC0yMCA0LTIwIDE4IDAgMTQgOCAyMiAyMCAyMHpNMzU0IDI2OGMxMi00IDIwIDQgMjAgMTggMCAxNC04IDIyLTIwIDIweiIgZmlsbD0iIzJhMjMxYSIvPgoKICA8cGF0aCBkPSJNMjEyIDM4MGMzMC0yMCA1Ni0yOCA4OC0yOHM1OCA4IDg4IDI4YzI0IDE2IDM2IDQwIDM2IDcwdjE1OGMwIDEyLTEwIDIyLTIyIDIySDE5OGMtMTIgMC0yMi0xMC0yMi0yMlY0NTBjMC0zMCAxMi01NCAzNi03MHoiIGZpbGw9IiMxNDEwMDkiIHN0cm9rZT0idXJsKCNnb2xkTSkiIHN0cm9rZS13aWR0aD0iMS40Ii8+CiAgPHBhdGggZD0iTTMwMCAzNTZsLTI2IDMwIDI2IDM0IDI2LTM0eiIgZmlsbD0idXJsKCNnb2xkTSkiIG9wYWNpdHk9IjAuOSIvPgoKICA8cGF0aCBkPSJNMzAwIDU3OGMtNDAgMC03NCAxMC05NiAyNnY0MGgxOTJ2LTQwYy0yMi0xNi01Ni0yNi05Ni0yNnoiIGZpbGw9IiMwYTA4MDYiIG9wYWNpdHk9IjAuNiIvPgoKICA8ZyBmaWxsPSJ1cmwoI2dvbGRNKSI+CiAgICA8cmVjdCB4PSIxNTAiIHk9IjY3NiIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIyLjQiIG9wYWNpdHk9IjAuODUiLz4KICAgIDx0ZXh0IHg9IjMwMCIgeT0iNzIyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjQyIiBsZXR0ZXItc3BhY2luZz0iMTAiIGZpbGw9InVybCgjZ29sZE0pIj5NSUdKRU5JPC90ZXh0PgogICAgPHRleHQgeD0iMzAwIiB5PSI3NTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBzZXJpZiIgZm9udC1zaXplPSIxNyIgbGV0dGVyLXNwYWNpbmc9IjQiIGZpbGw9IiNjOWE4NmEiIGZpbGwtb3BhY2l0eT0iMC44Ij4xOTExICYjODIxMjsgMTkzODwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=" },
        { k: "img.agolli", label: "Portreti i Dritëro Agollit", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2MDAgNzYwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IlBvcnRyZXQgc3RpbGl6dWFyIGkgRHJpdMOrcm8gQWdvbGxpdCI+CiAgPGRlZnM+CiAgICA8cmFkaWFsR3JhZGllbnQgaWQ9ImJnQSIgY3g9IjUwJSIgY3k9IjM0JSIgcj0iNzglIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzFkMzA0MCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzExMWQyOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwNzBkMTMiLz4KICAgIDwvcmFkaWFsR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImdvbGRBIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNkOWVjZjciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI0NSUiIHN0b3AtY29sb3I9IiM3OGE3YzkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjM2I2NDg2Ii8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJidXN0QSIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMTYyMDJiIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzA1MDgwYyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxwYXR0ZXJuIGlkPSJoYXRjaEEiIHdpZHRoPSIxMCIgaGVpZ2h0PSIxMCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKC0zNSkiPgogICAgICA8bGluZSB4MT0iMCIgeTE9IjAiIHgyPSIwIiB5Mj0iMTAiIHN0cm9rZT0iIzc4YTdjOSIgc3Ryb2tlLW9wYWNpdHk9IjAuMTAiIHN0cm9rZS13aWR0aD0iMyIvPgogICAgPC9wYXR0ZXJuPgogIDwvZGVmcz4KCiAgPHJlY3Qgd2lkdGg9IjYwMCIgaGVpZ2h0PSI3NjAiIGZpbGw9InVybCgjYmdBKSIvPgogIDxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNzYwIiBmaWxsPSJ1cmwoI2hhdGNoQSkiLz4KCiAgPGcgb3BhY2l0eT0iMC41IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjZ29sZEEpIiBzdHJva2Utd2lkdGg9IjEuNCI+CiAgICA8Y2lyY2xlIGN4PSIzMDAiIGN5PSIzMzAiIHI9IjIzMiIvPgogICAgPGNpcmNsZSBjeD0iMzAwIiBjeT0iMzMwIiByPSIyNDYiIHN0cm9rZS1kYXNoYXJyYXk9IjIgOSIgc3Ryb2tlLW9wYWNpdHk9IjAuNiIvPgogIDwvZz4KCiAgPHBhdGggZD0iTTMwMCAxMThjLTcyIDAtMTE4IDU2LTExOCAxMzIgMCAzMCA4IDU4IDIyIDgwLTE0IDIwLTIyIDQ2LTIyIDc0djE2OGMwIDIyIDE4IDQwIDQwIDQwaDE1NmMyMiAwIDQwLTE4IDQwLTQwVjQwNGMwLTI4LTgtNTQtMjItNzQgMTQtMjIgMjItNTAgMjItODAgMC03Ni00Ni0xMzItMTE4LTEzMnoiCiAgICAgICAgZmlsbD0idXJsKCNidXN0QSkiIHN0cm9rZT0idXJsKCNnb2xkQSkiIHN0cm9rZS13aWR0aD0iMiIvPgoKICA8cGF0aCBkPSJNMjQwIDI0NmMwLTQyIDI3LTY2IDYwLTY2czYwIDI0IDYwIDY2YzAgMzQtMTQgNjQtMzUgODQtNiA2LTE1IDEwLTI1IDEwcy0xOS00LTI1LTEwYy0yMS0yMC0zNS01MC0zNS04NHoiIGZpbGw9IiMyNjMxM2MiLz4KICA8cGF0aCBkPSJNMjUwIDIwNmMxNC0yNCAzNC0zNiA1MC0zNnMzNiAxMiA1MCAzNmMtMTYtOC0zMi0xMi01MC0xMnMtMzQgNC01MCAxMnoiIGZpbGw9IiMwYzEyMTgiLz4KICA8cGF0aCBkPSJNMjQ0IDI3MGMtMTMtNC0yMiA1LTIyIDIwIDAgMTUgOSAyNCAyMiAyMXpNMzU2IDI3MGMxMy00IDIyIDUgMjIgMjAgMCAxNS05IDI0LTIyIDIxeiIgZmlsbD0iIzI2MzEzYyIvPgogIDxwYXRoIGQ9Ik0yNjIgMzM2YzEwIDggMjQgMTIgMzggMTJzMjgtNCAzOC0xMmMtNCAxNi0yMCAyNi0zOCAyNnMtMzQtMTAtMzgtMjZ6IiBmaWxsPSIjMzk0MzRkIi8+CgogIDxwYXRoIGQ9Ik0yMTIgMzgwYzMwLTIwIDU2LTI4IDg4LTI4czU4IDggODggMjhjMjQgMTYgMzYgNDAgMzYgNzB2MTU4YzAgMTItMTAgMjItMjIgMjJIMTk4Yy0xMiAwLTIyLTEwLTIyLTIyVjQ1MGMwLTMwIDEyLTU0IDM2LTcweiIgZmlsbD0iIzEwMWEyNCIgc3Ryb2tlPSJ1cmwoI2dvbGRBKSIgc3Ryb2tlLXdpZHRoPSIxLjQiLz4KICA8cGF0aCBkPSJNMzAwIDM1NmwtMjYgMzAgMjYgMzQgMjYtMzR6IiBmaWxsPSJ1cmwoI2dvbGRBKSIgb3BhY2l0eT0iMC45Ii8+CgogIDxwYXRoIGQ9Ik0zMDAgNTc4Yy00MCAwLTc0IDEwLTk2IDI2djQwaDE5MnYtNDBjLTIyLTE2LTU2LTI2LTk2LTI2eiIgZmlsbD0iIzA1MGEwZiIgb3BhY2l0eT0iMC42Ii8+CgogIDxnIGZpbGw9InVybCgjZ29sZEEpIj4KICAgIDxyZWN0IHg9IjE1MCIgeT0iNjc2IiB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIuNCIgb3BhY2l0eT0iMC44NSIvPgogICAgPHRleHQgeD0iMzAwIiB5PSI3MTgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iMzQiIGxldHRlci1zcGFjaW5nPSI2IiBmaWxsPSJ1cmwoI2dvbGRBKSI+RFJJVMOLUk88L3RleHQ+CiAgICA8dGV4dCB4PSIzMDAiIHk9Ijc1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjMwIiBsZXR0ZXItc3BhY2luZz0iOSIgZmlsbD0idXJsKCNnb2xkQSkiPkFHT0xMSTwvdGV4dD4KICA8L2c+Cjwvc3ZnPgo=" },
      ],
    },
    {
      group: "Kopertinat e librave",
      icon: "&#128213;",
      fields: [
        { k: "img.cover.vargjet", label: "Vargjet e lira (Migjeni)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBWYXJnamV0IGUgbGlyYSI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImMxYmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzJhMWUwZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzFhMTIwNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwZDA5MDQiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImMxZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZlOWE4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZGNiNDVmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzlhNzMyNiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQyMCIgaGVpZ2h0PSI2MjAiIGZpbGw9InVybCgjYzFiZykiLz4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjYiIGhlaWdodD0iNjIwIiBmaWxsPSIjMGEwNzAzIi8+CiAgPHJlY3QgeD0iMjYiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjYyMCIgZmlsbD0idXJsKCNjMWcpIiBvcGFjaXR5PSIwLjciLz4KICA8cmVjdCB4PSI0OCIgeT0iNDAiIHdpZHRoPSIzMzAiIGhlaWdodD0iNTQwIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzFnKSIgc3Ryb2tlLXdpZHRoPSIxLjQiIG9wYWNpdHk9IjAuNzUiLz4KICA8cmVjdCB4PSI1OCIgeT0iNTAiIHdpZHRoPSIzMTAiIGhlaWdodD0iNTIwIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzFnKSIgc3Ryb2tlLXdpZHRoPSIwLjciIG9wYWNpdHk9IjAuNCIvPgoKICA8ZyBzdHJva2U9InVybCgjYzFnKSIgc3Ryb2tlLXdpZHRoPSIxLjYiIGZpbGw9Im5vbmUiIG9wYWNpdHk9IjAuODUiPgogICAgPHBhdGggZD0iTTExMCAyNTBjNDAtNjAgMTYwLTYwIDIwMCAwIiAvPgogICAgPHBhdGggZD0iTTk2IDI2OGM0OC03MCAxODAtNzAgMjI4IDAiLz4KICAgIDxwYXRoIGQ9Ik0xMjAgMjM2YzMyLTQ2IDE0OC00NiAxODAgMCIvPgogIDwvZz4KICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSIyMDAiIHI9IjM0IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzFnKSIgc3Ryb2tlLXdpZHRoPSIxLjYiLz4KICA8Y2lyY2xlIGN4PSIyMTAiIGN5PSIyMDAiIHI9IjQ2IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzFnKSIgc3Ryb2tlLXdpZHRoPSIwLjgiIHN0cm9rZS1kYXNoYXJyYXk9IjIgNyIvPgogIDxwYXRoIGQ9Ik0yMTAgMTY2bDEwIDI0IDI0LTQtMTYgMTggMTAgMjQtMjQtMTItMjQgMTIgMTAtMjQtMTYtMTggMjQgNHoiIGZpbGw9InVybCgjYzFnKSIgb3BhY2l0eT0iMC45Ii8+CgogIDx0ZXh0IHg9IjIxMCIgeT0iMzUyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjQ2IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2MxZykiPlZBUkdKRVQ8L3RleHQ+CiAgPHRleHQgeD0iMjEwIiB5PSI0MTAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iNDYiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzFnKSI+RSBMSVJBPC90ZXh0PgogIDxyZWN0IHg9IjEzMCIgeT0iNDMyIiB3aWR0aD0iMTYwIiBoZWlnaHQ9IjEuNiIgZmlsbD0idXJsKCNjMWcpIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMTAiIHk9IjQ4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iOCIgZmlsbD0idXJsKCNjMWcpIj5NSUdKRU5JPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNTQwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMTUiIGxldHRlci1zcGFjaW5nPSI2IiBmaWxsPSIjYzlhODZhIiBvcGFjaXR5PSIwLjg1Ij4xOTM2PC90ZXh0Pgo8L3N2Zz4K" },
        { k: "img.cover.novelet", label: "Novelet e vogla (Migjeni)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBOb3ZlbGV0IGUgdm9nbGEiPgogIDxkZWZzPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjMmJnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMxMjM2NDUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1NSUiIHN0b3AtY29sb3I9IiMwYjI1MzAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjMDQxNDFiIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJjMmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2Q2ZjVmMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjUwJSIgc3RvcC1jb2xvcj0iIzc5YzljMiIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMyYjdhNzgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxyZWN0IHdpZHRoPSI0MjAiIGhlaWdodD0iNjIwIiBmaWxsPSJ1cmwoI2MyYmcpIi8+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjI2IiBoZWlnaHQ9IjYyMCIgZmlsbD0iIzAzMTExNyIvPgogIDxyZWN0IHg9IjI2IiB5PSIwIiB3aWR0aD0iNCIgaGVpZ2h0PSI2MjAiIGZpbGw9InVybCgjYzJnKSIgb3BhY2l0eT0iMC43Ii8+CiAgPHJlY3QgeD0iNDgiIHk9IjQwIiB3aWR0aD0iMzMwIiBoZWlnaHQ9IjU0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2MyZykiIHN0cm9rZS13aWR0aD0iMS40IiBvcGFjaXR5PSIwLjciLz4KCiAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSJ1cmwoI2MyZykiIHN0cm9rZS13aWR0aD0iMS41IiBvcGFjaXR5PSIwLjg1Ij4KICAgIDxwYXRoIGQ9Ik0xNTAgMzAwYzAtNDAgMjctNzIgNjAtNzJzNjAgMzIgNjAgNzItMjcgNzItNjAgNzItNjAtMzItNjAtNzJ6Ii8+CiAgICA8cGF0aCBkPSJNMTUwIDMwMGgxMjBNMjEwIDIyOHYxNDQiLz4KICA8L2c+CiAgPGcgZmlsbD0idXJsKCNjMmcpIiBvcGFjaXR5PSIwLjkiPgogICAgPGNpcmNsZSBjeD0iMjEwIiBjeT0iMzAwIiByPSI4Ii8+CiAgICA8cmVjdCB4PSIxMjAiIHk9IjE3NiIgd2lkdGg9IjMiIGhlaWdodD0iMTgiLz4KICAgIDxyZWN0IHg9IjMwMCIgeT0iMTc2IiB3aWR0aD0iMyIgaGVpZ2h0PSIxOCIvPgogIDwvZz4KCiAgPHRleHQgeD0iMjEwIiB5PSI0MzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iNDIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzJnKSI+Tk9WRUxFVDwvdGV4dD4KICA8dGV4dCB4PSIyMTAiIHk9IjQ4MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC1zaXplPSIzMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNjMmcpIj5FIFZPR0xBPC90ZXh0PgogIDxyZWN0IHg9IjE0MCIgeT0iNDk4IiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEuNiIgZmlsbD0idXJsKCNjMmcpIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMTAiIHk9IjU0MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE4IiBsZXR0ZXItc3BhY2luZz0iNyIgZmlsbD0idXJsKCNjMmcpIj5NSUdKRU5JPC90ZXh0Pgo8L3N2Zz4K" },
        { k: "img.cover.luli", label: "Luli i vocërr (Migjeni)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBMdWxpIGkgdm9jw6tyciI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImM3YmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzI0MTczMyIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzE3MGYyNCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMwYTA2MTAiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImM3ZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZlNmE2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZTZiOTVmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iI2EyNzkyYyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQyMCIgaGVpZ2h0PSI2MjAiIGZpbGw9InVybCgjYzdiZykiLz4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjYiIGhlaWdodD0iNjIwIiBmaWxsPSIjMDYwNDBhIi8+CiAgPHJlY3QgeD0iMjYiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjYyMCIgZmlsbD0idXJsKCNjN2cpIiBvcGFjaXR5PSIwLjciLz4KICA8cmVjdCB4PSI0OCIgeT0iNDAiIHdpZHRoPSIzMzAiIGhlaWdodD0iNTQwIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzdnKSIgc3Ryb2tlLXdpZHRoPSIxLjQiIG9wYWNpdHk9IjAuNyIvPgoKICA8ZyBmaWxsPSJ1cmwoI2M3ZykiIG9wYWNpdHk9IjAuODUiPgogICAgPGNpcmNsZSBjeD0iMTQwIiBjeT0iMTYwIiByPSIzLjQiLz4KICAgIDxjaXJjbGUgY3g9IjI3MCIgY3k9IjEzMCIgcj0iMi42Ii8+CiAgICA8Y2lyY2xlIGN4PSIzMjAiIGN5PSIxOTYiIHI9IjIuMiIvPgogICAgPGNpcmNsZSBjeD0iMTEwIiBjeT0iMjUwIiByPSIyIi8+CiAgPC9nPgogIDxwYXRoIGQ9Ik0yOTIgMTUwbDcgMTkgMjAgMS0xNiAxMiA2IDIwLTE3LTExLTE3IDExIDYtMjAtMTYtMTIgMjAtMXoiIGZpbGw9InVybCgjYzdnKSIvPgoKICA8ZyBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzdnKSIgc3Ryb2tlLXdpZHRoPSIxLjYiIG9wYWNpdHk9IjAuOSI+CiAgICA8Y2lyY2xlIGN4PSIxODUiIGN5PSIyNTAiIHI9IjI0Ii8+CiAgICA8cGF0aCBkPSJNMTg1IDI3NGMtMjYgMC00NCAyMC00NCA0NnY0MGg4OHYtNDBjMC0yNi0xOC00Ni00NC00NnoiLz4KICAgIDxwYXRoIGQ9Ik0xNzAgMjUwYzAtOSA3LTE1IDE1LTE1czE1IDYgMTUgMTUiLz4KICA8L2c+CiAgPHBhdGggZD0iTTE1MCAzMjBoNzBNMTg1IDI3NHY0NiIgc3Ryb2tlPSJ1cmwoI2M3ZykiIHN0cm9rZS13aWR0aD0iMS4yIiBvcGFjaXR5PSIwLjYiLz4KCiAgPHRleHQgeD0iMjEwIiB5PSI0MzIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iMzAiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzdnKSI+TFVMSSBJPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNDcyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjQyIiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2M3ZykiPlZPQyYjMjAzO1JSPC90ZXh0PgogIDxyZWN0IHg9IjE1MCIgeT0iNDkyIiB3aWR0aD0iMTIwIiBoZWlnaHQ9IjEuNiIgZmlsbD0idXJsKCNjN2cpIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMTAiIHk9IjUzNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjIwIiBsZXR0ZXItc3BhY2luZz0iNyIgZmlsbD0idXJsKCNjN2cpIj5NSUdKRU5JPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNTY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGxldHRlci1zcGFjaW5nPSI0IiBmaWxsPSIjYTI3OTJjIj5UUkVHSU08L3RleHQ+Cjwvc3ZnPgo=" },
        { k: "img.cover.memo", label: "Komisari Memo (Agolli)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBLb21pc2FyaSBNZW1vIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYzViZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMjQzMzE4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTUlIiBzdG9wLWNvbG9yPSIjMTYyMTBlIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBhMTEwNiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYzVnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmMGY1ZDYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNiOWQwN2EiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjNmY4YTNhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjYyMCIgZmlsbD0idXJsKCNjNWJnKSIvPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSI2MjAiIGZpbGw9IiMwNzBkMDQiLz4KICA8cmVjdCB4PSIyNiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNjIwIiBmaWxsPSJ1cmwoI2M1ZykiIG9wYWNpdHk9IjAuNyIvPgogIDxyZWN0IHg9IjQ4IiB5PSI0MCIgd2lkdGg9IjMzMCIgaGVpZ2h0PSI1NDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjNWcpIiBzdHJva2Utd2lkdGg9IjEuNCIgb3BhY2l0eT0iMC43Ii8+CgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjNWcpIiBzdHJva2Utd2lkdGg9IjEuNiIgb3BhY2l0eT0iMC44NSI+CiAgICA8cGF0aCBkPSJNMTcwIDMwMGw0MC03MCA0MCA3MCIvPgogICAgPHJlY3QgeD0iMTU4IiB5PSIzMDAiIHdpZHRoPSIxMDQiIGhlaWdodD0iNzAiIHJ4PSI2Ii8+CiAgICA8cGF0aCBkPSJNMTg2IDMzNGg0OCIvPgogIDwvZz4KICA8cGF0aCBkPSJNMjEwIDIxNGw2IDE2IDE3IDEtMTQgMTAgNSAxNi0xNC05LTE0IDkgNS0xNi0xNC0xMCAxNy0xeiIgZmlsbD0idXJsKCNjNWcpIiBvcGFjaXR5PSIwLjkiLz4KCiAgPHRleHQgeD0iMjEwIiB5PSI0NDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iNDQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzVnKSI+S09NSVNBUkk8L3RleHQ+CiAgPHRleHQgeD0iMjEwIiB5PSI0OTIiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iNTIiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzVnKSI+TUVNTzwvdGV4dD4KICA8cmVjdCB4PSIxNDAiIHk9IjUxMCIgd2lkdGg9IjE0MCIgaGVpZ2h0PSIxLjYiIGZpbGw9InVybCgjYzVnKSIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iMjEwIiB5PSI1NDgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBzZXJpZiIgZm9udC1zaXplPSIxNiIgbGV0dGVyLXNwYWNpbmc9IjQiIGZpbGw9InVybCgjYzVnKSI+RFJJVCYjMjAzO1JPIEFHT0xMSTwvdGV4dD4KPC9zdmc+Cg==" },
        { k: "img.cover.zylo", label: "Shkëlqimi dhe rënia e shokut Zylo (Agolli)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBTaGvDq2xxaW1pIGRoZSByw6tuaWEgZSBzaG9rdXQgWnlsbyI+CiAgPGRlZnM+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImM5YmciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iIzRhMTIyMCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjU1JSIgc3RvcC1jb2xvcj0iIzJlMGExNCIvPgogICAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiMxNTAzMDgiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9ImM5ZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjZmZlM2QwIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTAlIiBzdG9wLWNvbG9yPSIjZTBhMDdhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzljNTMzNCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjQyMCIgaGVpZ2h0PSI2MjAiIGZpbGw9InVybCgjYzliZykiLz4KICA8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMjYiIGhlaWdodD0iNjIwIiBmaWxsPSIjMGQwMjA2Ii8+CiAgPHJlY3QgeD0iMjYiIHk9IjAiIHdpZHRoPSI0IiBoZWlnaHQ9IjYyMCIgZmlsbD0idXJsKCNjOWcpIiBvcGFjaXR5PSIwLjciLz4KICA8cmVjdCB4PSI0OCIgeT0iNDAiIHdpZHRoPSIzMzAiIGhlaWdodD0iNTQwIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzlnKSIgc3Ryb2tlLXdpZHRoPSIxLjQiIG9wYWNpdHk9IjAuNyIvPgoKICA8ZyBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzlnKSIgc3Ryb2tlLXdpZHRoPSIxLjgiIG9wYWNpdHk9IjAuOSI+CiAgICA8cGF0aCBkPSJNMTUwIDI1MGw2MC0zNCA2MCAzNC0xMiA0MC00OCAyMi00OC0yMnoiLz4KICAgIDxwYXRoIGQ9Ik0xNTAgMjUwbDYwIDIyIDYwLTIyTTIxMCAyNzJ2NDAiLz4KICA8L2c+CiAgPHBhdGggZD0iTTIxMCAxODBsOSAyNCAyNiAyLTIwIDE2IDggMjUtMjMtMTUtMjMgMTUgOC0yNS0yMC0xNiAyNi0yeiIgZmlsbD0idXJsKCNjOWcpIiBvcGFjaXR5PSIwLjkiLz4KICA8cGF0aCBkPSJNMTUwIDM2MGMyMC0xMiA2MC0xMiA2MC0xMnM0MCAwIDYwIDEyIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjYzlnKSIgc3Ryb2tlLXdpZHRoPSIxLjQiIG9wYWNpdHk9IjAuNSIvPgoKICA8dGV4dCB4PSIyMTAiIHk9IjQyNCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC1zaXplPSIyNiIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNjOWcpIj5TSEsmIzIwMztMUUlNSTwvdGV4dD4KICA8dGV4dCB4PSIyMTAiIHk9IjQ1MiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsICdUaW1lcyBOZXcgUm9tYW4nLCBzZXJpZiIgZm9udC1zaXplPSIyMCIgZm9udC13ZWlnaHQ9IjcwMCIgZmlsbD0idXJsKCNjOWcpIj5ESEUgUiYjMjAzO05JQSBFPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNDgyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjI2IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2M5ZykiPlNIT0tVVCBaWUxPPC90ZXh0PgogIDxyZWN0IHg9IjE0MCIgeT0iNTAwIiB3aWR0aD0iMTQwIiBoZWlnaHQ9IjEuNiIgZmlsbD0idXJsKCNjOWcpIiBvcGFjaXR5PSIwLjgiLz4KICA8dGV4dCB4PSIyMTAiIHk9IjUzOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjE2IiBsZXR0ZXItc3BhY2luZz0iNCIgZmlsbD0idXJsKCNjOWcpIj5EUklUJiMyMDM7Uk8gQUdPTExJPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNTY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgc2VyaWYiIGZvbnQtc2l6ZT0iMTMiIGxldHRlci1zcGFjaW5nPSI2IiBmaWxsPSIjOWM1MzM0Ij4xOTczPC90ZXh0Pgo8L3N2Zz4K" },
        { k: "img.cover.top", label: "Njeriu me top (Agolli)", type: "image", def: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0MjAgNjIwIiByb2xlPSJpbWciIGFyaWEtbGFiZWw9IktvcGVydGluYSBOamVyaXUgbWUgdG9wIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYzhiZyIgeDE9IjAiIHkxPSIwIiB4Mj0iMSIgeTI9IjEiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAlIiBzdG9wLWNvbG9yPSIjMmIzMTM4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iNTUlIiBzdG9wLWNvbG9yPSIjMWIyMDI2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMTAwJSIgc3RvcC1jb2xvcj0iIzBjMTAxMyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iYzhnIiB4MT0iMCIgeTE9IjAiIHgyPSIxIiB5Mj0iMSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiNmNmU3YzYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSI1MCUiIHN0b3AtY29sb3I9IiNjYmIwNzIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxMDAlIiBzdG9wLWNvbG9yPSIjOGE3NDQzIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cmVjdCB3aWR0aD0iNDIwIiBoZWlnaHQ9IjYyMCIgZmlsbD0idXJsKCNjOGJnKSIvPgogIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIyNiIgaGVpZ2h0PSI2MjAiIGZpbGw9IiMwNzBhMGMiLz4KICA8cmVjdCB4PSIyNiIgeT0iMCIgd2lkdGg9IjQiIGhlaWdodD0iNjIwIiBmaWxsPSJ1cmwoI2M4ZykiIG9wYWNpdHk9IjAuNyIvPgogIDxyZWN0IHg9IjQ4IiB5PSI0MCIgd2lkdGg9IjMzMCIgaGVpZ2h0PSI1NDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjOGcpIiBzdHJva2Utd2lkdGg9IjEuNCIgb3BhY2l0eT0iMC43Ii8+CgogIDxnIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjOGcpIiBzdHJva2Utd2lkdGg9IjIiIG9wYWNpdHk9IjAuOTIiPgogICAgPHBhdGggZD0iTTExMCAzMDBoMTUwIi8+CiAgICA8cGF0aCBkPSJNMjYwIDMwMGw0MC0yMnY0NHoiIGZpbGw9InVybCgjYzhnKSIgc3Ryb2tlPSJub25lIi8+CiAgICA8Y2lyY2xlIGN4PSIyNzAiIGN5PSIzMDAiIHI9IjMwIiBvcGFjaXR5PSIwLjUiLz4KICAgIDxwYXRoIGQ9Ik0xNTAgMzAwdi0xNE0xODYgMzAwdi0xNE0yMjIgMzAwdi0xNCIvPgogICAgPHBhdGggZD0iTTEwMCAzMDBsLTE2IDMwTTEwMCAzMDBsLTE2LTMwIi8+CiAgPC9nPgogIDxjaXJjbGUgY3g9IjEwNCIgY3k9IjMwMCIgcj0iMzAiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNjOGcpIiBzdHJva2Utd2lkdGg9IjIiLz4KICA8Y2lyY2xlIGN4PSIxMDQiIGN5PSIzMDAiIHI9IjEwIiBmaWxsPSJ1cmwoI2M4ZykiIG9wYWNpdHk9IjAuOCIvPgoKICA8ZyBmaWxsPSJ1cmwoI2M4ZykiIG9wYWNpdHk9IjAuOSI+CiAgICA8cGF0aCBkPSJNMjEwIDE3NmwxMCAyNiAyOCAyLTIyIDE3IDggMjctMjQtMTYtMjQgMTYgOC0yNy0yMi0xNyAyOC0yeiIvPgogIDwvZz4KCiAgPHRleHQgeD0iMjEwIiB5PSI0NDAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCAnVGltZXMgTmV3IFJvbWFuJywgc2VyaWYiIGZvbnQtc2l6ZT0iMzQiIGZvbnQtd2VpZ2h0PSI3MDAiIGZpbGw9InVybCgjYzhnKSI+TkpFUklVPC90ZXh0PgogIDx0ZXh0IHg9IjIxMCIgeT0iNDgyIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iR2VvcmdpYSwgJ1RpbWVzIE5ldyBSb21hbicsIHNlcmlmIiBmb250LXNpemU9IjM0IiBmb250LXdlaWdodD0iNzAwIiBmaWxsPSJ1cmwoI2M4ZykiPk1FIFRPUDwvdGV4dD4KICA8cmVjdCB4PSIxNTAiIHk9IjUwMCIgd2lkdGg9IjEyMCIgaGVpZ2h0PSIxLjYiIGZpbGw9InVybCgjYzhnKSIgb3BhY2l0eT0iMC44Ii8+CiAgPHRleHQgeD0iMjEwIiB5PSI1MzgiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZvbnQtZmFtaWx5PSJHZW9yZ2lhLCBzZXJpZiIgZm9udC1zaXplPSIxNiIgbGV0dGVyLXNwYWNpbmc9IjQiIGZpbGw9InVybCgjYzhnKSI+RFJJVCYjMjAzO1JPIEFHT0xMSTwvdGV4dD4KICA8dGV4dCB4PSIyMTAiIHk9IjU2NiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9Ikdlb3JnaWEsIHNlcmlmIiBmb250LXNpemU9IjEzIiBsZXR0ZXItc3BhY2luZz0iNiIgZmlsbD0iIzhhNzQ0MyI+MTk3NTwvdGV4dD4KPC9zdmc+Cg==" },
      ],
    },
    {
      group: "Seksioni Hero",
      icon: "&#10024;",
      fields: [
        { k: "hero.eyebrow", label: "Nën-titulli i sipërm", type: "text", def: "1936 — 1970 · Dy breza, një zë" },
        { k: "hero.name1", label: "Emri 1", type: "text", def: "Migjeni" },
        { k: "hero.name2", label: "Emri 2", type: "text", def: "Dritëro Agolli" },
        { k: "hero.lead", label: "Paragrafi kryesor", type: "textarea", def: "Nga vargu i lirë që thyen heshtjen e viteve ’30, deri te poezia e Nënë Shqipërisë dhe proza e Komisarit Memo — dy shkrimtarë që formësuan ndërgjegjen e një kombi." },
        { k: "hero.cta1", label: "Butoni 1", type: "text", def: "Zbulo Migjenin" },
        { k: "hero.cta2", label: "Butoni 2", type: "text", def: "Zbulo Agollin" },
      ],
    },
    {
      group: "Statistikat",
      icon: "&#128202;",
      fields: [
        { k: "stat.1.num", label: "Numri 1", type: "text", def: "2" },
        { k: "stat.1.label", label: "Etiketa 1", type: "text", def: "Shkrimtarë" },
        { k: "stat.2.num", label: "Numri 2", type: "text", def: "106" },
        { k: "stat.2.label", label: "Etiketa 2", type: "text", def: "Vjet trashëgimi" },
        { k: "stat.3.num", label: "Numri 3", type: "text", def: "6" },
        { k: "stat.3.label", label: "Etiketa 3", type: "text", def: "Vepra të zgjedhura" },
        { k: "stat.4.num", label: "Numri 4", type: "text", def: "2" },
        { k: "stat.4.label", label: "Etiketa 4", type: "text", def: "Gjini letrare" },
      ],
    },
    {
      group: "Migjeni",
      icon: "&#128220;",
      fields: [
        { k: "m.eyebrow", label: "Nën-titulli", type: "text", def: "Kapitulli I" },
        { k: "m.title", label: "Titulli", type: "text", def: "Migjeni" },
        { k: "m.subtitle", label: "Nën-titulli i vogël", type: "text", def: "Poeti i mjerimit dhe i shpresës" },
        { k: "m.p1", label: "Paragrafi 1", type: "html", rows: 4, def: "<strong>Migjeni</strong> — pseudonimi i <strong>Millosh Gjergj Nikollës</strong> — lindi në Shkodër më 13 tetor 1911 dhe vdiq vetëm 26 vjeç nga tuberkulozi. Në kaq pak vite krijoi një ndryshim të thellë në letërsinë shqipe: solli <em>vargun e lirë</em>, gjuhën e thjeshtë të njerëzve të rrugës dhe një shikim të pashmangshëm ndaj varfërisë, padrejtësisë dhe hidhërimit të njeriut të thjeshtë." },
        { k: "m.p2", label: "Paragrafi 2", type: "html", rows: 4, def: "Shkroi poezi, novela të shkurtra (noveleta) dhe ese, duke u frymëzuar nga jeta e qytetit të tij dhe nga shpirti i revoltës. Vepra e tij e vetme e botuar gjatë jetës, <em>Vargjet e lira</em> (1936), u ndalua menjëherë nga censura e kohës — shenjë e qartë e guximit të tij." },
        { k: "m.quote", label: "Citati", type: "textarea", def: "Jam djali i kohës së turpit dhe i vetëdijes së plagëve të saj." },
        { k: "m.fact.1.k", label: "Fakti 1 · Etiketa", type: "text", def: "Pseudonimi" },
        { k: "m.fact.1.v", label: "Fakti 1 · Vlera", type: "text", def: "Migjeni" },
        { k: "m.fact.2.k", label: "Fakti 2 · Etiketa", type: "text", def: "Zhanri" },
        { k: "m.fact.2.v", label: "Fakti 2 · Vlera", type: "text", def: "Poezi, prozë e shkurtër" },
        { k: "m.fact.3.k", label: "Fakti 3 · Etiketa", type: "text", def: "Vepra kryesore" },
        { k: "m.fact.3.v", label: "Fakti 3 · Vlera", type: "text", def: "Vargjet e lira (1936)" },
        { k: "m.fact.4.k", label: "Fakti 4 · Etiketa", type: "text", def: "Rëndësia" },
        { k: "m.fact.4.v", label: "Fakti 4 · Vlera", type: "text", def: "Themeluesi i vargut të lirë shqip" },
        { k: "m.worksTitle", label: "Titulli i veprave", type: "text", def: "Veprat e Migjenit" },
        { k: "m.worksSub", label: "Nën-titulli i veprave", type: "text", def: "Tri kopertina që përfaqësojnë shpirtin e tij krijues." },
        { k: "m.cover.1.year", label: "Vepra 1 · Viti", type: "text", def: "1936" },
        { k: "m.cover.1.title", label: "Vepra 1 · Titulli", type: "text", def: "Vargjet e lira" },
        { k: "m.cover.1.desc", label: "Vepra 1 · Përshkrimi", type: "textarea", def: "Përmbledhja e vetme e botuar në jetën e autorit. Solli në letërsinë shqipe vargun e lirë dhe zërin e njeriut të thjeshtë që vuan e shpreson." },
        { k: "m.cover.2.year", label: "Vepra 2 · Viti", type: "text", def: "Prozë" },
        { k: "m.cover.2.title", label: "Vepra 2 · Titulli", type: "text", def: "Novelet e vogla" },
        { k: "m.cover.2.desc", label: "Vepra 2 · Përshkrimi", type: "textarea", def: "Tregoj të shkurtër e të prerë për jetën e qyteteve shqiptare: fëmijë, lypësa, nëna të lodhura dhe ëndrra të thyera." },
        { k: "m.cover.3.year", label: "Vepra 3 · Viti", type: "text", def: "Tregim" },
        { k: "m.cover.3.title", label: "Vepra 3 · Titulli", type: "text", def: "Luli i vocërr" },
        { k: "m.cover.3.desc", label: "Vepra 3 · Përshkrimi", type: "textarea", def: "Tregimi më prekës i Migjenit: fati i një djali të vogël e të varfër në rrugët e Shkodrës, mes urisë, ëndrrës dhe hidhërimit." },
      ],
    },
    {
      group: "Dritëro Agolli",
      icon: "&#128221;",
      fields: [
        { k: "a.eyebrow", label: "Nën-titulli", type: "text", def: "Kapitulli II" },
        { k: "a.title", label: "Titulli", type: "text", def: "Dritëro Agolli" },
        { k: "a.subtitle", label: "Nën-titulli i vogël", type: "text", def: "Poeti i tokës, i njerëzve dhe i kohës" },
        { k: "a.p1", label: "Paragrafi 1", type: "html", rows: 4, def: "<strong>Dritëro Agolli</strong> lindi më 13 tetor 1931 në fshatin Menkulas të Devollit. Për më shumë se gjysmë shekulli ishte një nga zërat më të njohur të letërsisë shqipe — poet, prozator, dramaturg dhe publicist." },
        { k: "a.p2", label: "Paragrafi 2", type: "html", rows: 4, def: "Poezia e tij, e ngrohtë e njerëzore, ktheu në këngë tokën, punën, nënën dhe dashurinë. Në prozë krijoi figura të paharrueshme si <em>Komisari Memo</em> dhe <em>Njeriu me top</em>, duke ecur mes realizmit dhe ironisë së hollë për shoqërinë dhe pushtetin." },
        { k: "a.quote", label: "Citati", type: "textarea", def: "Nënë Shqipëri, më jep dritë, më jep forcë, se kam nevojë t’ të këndoj." },
        { k: "a.fact.1.k", label: "Fakti 1 · Etiketa", type: "text", def: "Lindja" },
        { k: "a.fact.1.v", label: "Fakti 1 · Vlera", type: "text", def: "Menkulas, Devoll, 1931" },
        { k: "a.fact.2.k", label: "Fakti 2 · Etiketa", type: "text", def: "Zhanri" },
        { k: "a.fact.2.v", label: "Fakti 2 · Vlera", type: "text", def: "Poezi, roman, dramë" },
        { k: "a.fact.3.k", label: "Fakti 3 · Etiketa", type: "text", def: "Vepra kryesore" },
        { k: "a.fact.3.v", label: "Fakti 3 · Vlera", type: "text", def: "Nënë Shqipëri · Komisari Memo" },
        { k: "a.fact.4.k", label: "Fakti 4 · Etiketa", type: "text", def: "Rëndësia" },
        { k: "a.fact.4.v", label: "Fakti 4 · Vlera", type: "text", def: "Zë i madh i letërsisë së shek. XX" },
        { k: "a.worksTitle", label: "Titulli i veprave", type: "text", def: "Veprat e Dritëro Agollit" },
        { k: "a.worksSub", label: "Nën-titulli i veprave", type: "text", def: "Tri kopertina ikonike nga krijimtaria e tij." },
        { k: "a.cover.1.year", label: "Vepra 1 · Viti", type: "text", def: "1970" },
        { k: "a.cover.1.title", label: "Vepra 1 · Titulli", type: "text", def: "Komisari Memo" },
        { k: "a.cover.1.desc", label: "Vepra 1 · Përshkrimi", type: "textarea", def: "Romani i parë dhe më i njohur i Agollit (përkthyer si “The bronze bust”): portret i thellë e njerëzor i komisarit Memo, mes përkushtimit, ironisë dhe zhgënjimit." },
        { k: "a.cover.2.year", label: "Vepra 2 · Viti", type: "text", def: "1973" },
        { k: "a.cover.2.title", label: "Vepra 2 · Titulli", type: "text", def: "Shkëlqimi dhe rënia e shokut Zylo" },
        { k: "a.cover.2.desc", label: "Vepra 2 · Përshkrimi", type: "textarea", def: "Romani satirik më i famshëm i Agollit: karriera e një nëpunësi ambicioz, që me humor të hidhur zbërthen hipokrizinë dhe arrogancën e pushtetit." },
        { k: "a.cover.3.year", label: "Vepra 3 · Viti", type: "text", def: "1975" },
        { k: "a.cover.3.title", label: "Vepra 3 · Titulli", type: "text", def: "Njeriu me top" },
        { k: "a.cover.3.desc", label: "Vepra 3 · Përshkrimi", type: "textarea", def: "Romani i dytë i Agollit (përkthyer si “The man with the cannon”): tema partizane trajtohet nga një këndvështrim më i hollë, me ironi dhe humanizëm." },
      ],
    },
    {
      group: "Krahasim",
      icon: "&#9878;",
      fields: [
        { k: "cmp.eyebrow", label: "Nën-titulli", type: "text", def: "Dy krahë të së njëjtës zog" },
        { k: "cmp.title", label: "Titulli", type: "text", def: "Migjeni dhe Agolli përballë" },
        { k: "cmp.m.title", label: "Kolona Migjeni · Titulli", type: "text", def: "Migjeni" },
        { k: "cmp.m.r1.k", label: "Migjeni R1 · Etiketa", type: "text", def: "Periudha" },
        { k: "cmp.m.r1.v", label: "Migjeni R1 · Vlera", type: "text", def: "1911 — 1938" },
        { k: "cmp.m.r2.k", label: "Migjeni R2 · Etiketa", type: "text", def: "Zëri" },
        { k: "cmp.m.r2.v", label: "Migjeni R2 · Vlera", type: "text", def: "Revoltë, dhimbje, përditshmëri" },
        { k: "cmp.m.r3.k", label: "Migjeni R3 · Etiketa", type: "text", def: "Forma" },
        { k: "cmp.m.r3.v", label: "Migjeni R3 · Vlera", type: "text", def: "Varg i lirë, novela të shkurtra" },
        { k: "cmp.m.r4.k", label: "Migjeni R4 · Etiketa", type: "text", def: "Tema" },
        { k: "cmp.m.r4.v", label: "Migjeni R4 · Vlera", type: "text", def: "Varfëria, mjerimi, shpresa" },
        { k: "cmp.m.r5.k", label: "Migjeni R5 · Etiketa", type: "text", def: "Fjala kyçe" },
        { k: "cmp.m.r5.v", label: "Migjeni R5 · Vlera", type: "text", def: "Hidhërim" },
        { k: "cmp.a.title", label: "Kolona Agolli · Titulli", type: "text", def: "Dritëro Agolli" },
        { k: "cmp.a.r1.k", label: "Agolli R1 · Etiketa", type: "text", def: "Periudha" },
        { k: "cmp.a.r1.v", label: "Agolli R1 · Vlera", type: "text", def: "1931 — 2017" },
        { k: "cmp.a.r2.k", label: "Agolli R2 · Etiketa", type: "text", def: "Zëri" },
        { k: "cmp.a.r2.v", label: "Agolli R2 · Vlera", type: "text", def: "Ngrohtësi, humor, humanizëm" },
        { k: "cmp.a.r3.k", label: "Agolli R3 · Etiketa", type: "text", def: "Forma" },
        { k: "cmp.a.r3.v", label: "Agolli R3 · Vlera", type: "text", def: "Poezi, roman, dramë" },
        { k: "cmp.a.r4.k", label: "Agolli R4 · Etiketa", type: "text", def: "Tema" },
        { k: "cmp.a.r4.v", label: "Agolli R4 · Vlera", type: "text", def: "Toka, njeriu, koha, dashuria" },
        { k: "cmp.a.r5.k", label: "Agolli R5 · Etiketa", type: "text", def: "Fjala kyçe" },
        { k: "cmp.a.r5.v", label: "Agolli R5 · Vlera", type: "text", def: "Jetë" },
      ],
    },
    {
      group: "Citate",
      icon: "&#8220;",
      fields: [
        { k: "q.eyebrow", label: "Nën-titulli", type: "text", def: "Fjalë që mbeten" },
        { k: "q.title", label: "Titulli", type: "text", def: "Citate të paharrueshme" },
        { k: "q.1.text", label: "Citati 1 · Teksti", type: "textarea", def: "Kur të më shikosh në sy, mos kërko mëshirë — kërko të vërtetën." },
        { k: "q.1.cite", label: "Citati 1 · Autori", type: "text", def: "Migjeni" },
        { k: "q.2.text", label: "Citati 2 · Teksti", type: "textarea", def: "Nënë Shqipëri, ti m’i dhe dritën dhe e bëre jetën këngë." },
        { k: "q.2.cite", label: "Citati 2 · Autori", type: "text", def: "Dritëro Agolli" },
        { k: "q.3.text", label: "Citati 3 · Teksti", type: "textarea", def: "E bukura e jetës qëndron në gjërat e vogla të përditshme." },
        { k: "q.3.cite", label: "Citati 3 · Autori", type: "text", def: "Migjeni" },
        { k: "q.4.text", label: "Citati 4 · Teksti", type: "textarea", def: "Atdheu nuk është vetëm tokë — është njeriu që e do atë." },
        { k: "q.4.cite", label: "Citati 4 · Autori", type: "text", def: "Dritëro Agolli" },
      ],
    },
    {
      group: "Mbyllja & Fundi",
      icon: "&#127775;",
      fields: [
        { k: "close.title", label: "Titulli i mbylljes", type: "text", def: "Dy jetë, një letërsi" },
        { k: "close.text", label: "Teksti i mbylljes", type: "textarea", def: "Migjeni hapi derën drejt lirisë së fjalës; Agolli e mbajti atë hapur për gjysmë shekulli. Së bashku, ata përbëjnë shtyllat e letërsisë moderne shqipe — një testament që lexohet ende sot." },
        { k: "footer.title", label: "Titulli i fundit", type: "text", def: "Migjeni & Dritëro Agolli" },
        { k: "footer.note", label: "Shënimi i fundit", type: "text", def: "Një faqe homazhe për dy gjigantët e letërsisë shqipe." },
      ],
    },
  ];

  /* Fusha të rrjedhshme nga skema */
  var FIELDS = [];
  SCHEMA.forEach(function (g) {
    g.fields.forEach(function (f) {
      FIELDS.push(f);
    });
  });

  var FIELD_MAP = {};
  FIELDS.forEach(function (f) {
    FIELD_MAP[f.k] = f;
  });

  function defaults() {
    var out = {};
    FIELDS.forEach(function (f) {
      out[f.k] = f.def;
    });
    if (window.MA_SEED && typeof window.MA_SEED === "object") {
      Object.keys(window.MA_SEED).forEach(function (k) {
        if (out.hasOwnProperty(k)) out[k] = window.MA_SEED[k];
      });
    }
    return out;
  }

  function getSaved() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function save(patch) {
    var merged = Object.assign(defaults(), getSaved(), patch || {});
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
      return true;
    } catch (e) {
      return false;
    }
  }

  function saveRaw(obj) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(obj || {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function reset() {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (e) {
      return false;
    }
  }

  /* Vlera efektive për një çelës (default ose e ruajtur) */
  function value(k) {
    var f = FIELD_MAP[k];
    var d = f ? f.def : "";
    var saved = getSaved();
    return saved[k] !== undefined ? saved[k] : d;
  }

  /* Konfigurimi i plotë efektiv */
  function effective() {
    return Object.assign(defaults(), getSaved());
  }

  function changedCount() {
    var saved = getSaved();
    var d = defaults();
    var n = 0;
    Object.keys(saved).forEach(function (k) {
      if (d[k] !== saved[k]) n++;
    });
    return n;
  }

  return {
    STORAGE_KEY: STORAGE_KEY,
    FONTS: FONTS,
    SCHEMA: SCHEMA,
    FIELDS: FIELDS,
    FIELD_MAP: FIELD_MAP,
    defaults: defaults,
    getSaved: getSaved,
    save: save,
    saveRaw: saveRaw,
    reset: reset,
    value: value,
    effective: effective,
    changedCount: changedCount,
  };
})();
