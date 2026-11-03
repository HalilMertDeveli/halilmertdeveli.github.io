# MOTOR – Storefront UI Prototype

A static, clickable UI prototype of a motorcycle parts store with a dark theme.
All products, prices and customer details are placeholders. There is no backend:
no orders, payments, accounts or newsletter sign-ups are processed.

- GitHub Pages: https://halilmertdeveli.github.io/ (redirects to `/motor/`)
- Also deployed at: https://motor-vitrin.vercel.app

## Overview

This repository holds the generated static output of a storefront theme ("motordark").
The pages were captured from a server-rendered e-commerce storefront and turned into plain HTML.
A small script, `motor/motor-static.js`, answers the storefront's AJAX requests from pre-captured
files in `motor/static-ajax/`, so menus, the mini cart and add-to-cart feedback work without a server.

The real store code (theme source, backend and build scripts) lives in a separate private repository.
This repo only contains the static prototype.

## Features

What you can click through (UI text is Turkish, prices are placeholder amounts in TRY):

- Home page with hero image, category navigation and product lists
- Category pages (helmets and riding gear, brakes, lighting, tyres and wheels, chains and sprockets,
  suspension, exhaust, oil and maintenance and more) and brand filter pages
- 11 placeholder product pages with image galleries and zoom
- Add to cart, off-canvas mini cart and cart page (demo cart state kept in `sessionStorage`)
- Checkout steps: billing address, shipping method, payment method, confirmation and "order completed"
- Mobile off-canvas menu, pre-captured instant search results, compare and wishlist pages,
  login and register pages, and information pages (about, contact, shipping, privacy and so on)

## Tech Stack

- Static HTML, CSS and JavaScript; nothing to build to serve it
- Storefront markup and scripts from Smartstore 6.4, with Bootstrap, jQuery 3.7.1, Slick, PhotoSwipe,
  Drift, AOS, Select2, Moment and Font Awesome Free
- Custom theme in `motor/themes/motordark/` (`theme.css`, `motor.js`, Barlow Semi Condensed font)
- `motor/motor-static.js`: a jQuery `ajaxPrefilter` that routes AJAX calls to static files and makes forms inert
- Hosting: GitHub Pages from the `main` branch root (`.nojekyll`), plus a Vercel deployment

## Getting Started

Serve the repository root with any static file server. Opening the files directly (`file://`)
breaks the AJAX-driven parts.

```bash
git clone https://github.com/HalilMertDeveli/halilmertdeveli.github.io.git
cd halilmertdeveli.github.io
python -m http.server 8080
# then open http://localhost:8080/motor/
```

Merging into `main` redeploys GitHub Pages.

## Project Status

UI prototype from October 2026, published for previewing the design. The content is a fixed snapshot;
changing products or pages means regenerating it from the private source.

## Limitations

- No backend: forms do not submit data, and live price or variant updates on product pages are disabled.
- Demo content only: search results, menus and cart contents are pre-captured.
- Pages carry `noindex`, so search engines are asked not to index them.

## Credits and Licenses

- Photos: [Unsplash License](https://unsplash.com/license) – Rohan Krishnan, Jusdevoyage, Brock Wegner, Rob King,
  Anthony Massaro, Ronnzy Moto, LouisMoto, Fridi Antrack, Justin B, Dmitry Lothbrok.
- Font: Barlow Semi Condensed, SIL Open Font License 1.1.
- Icons: Font Awesome Free (license details in the CSS header).
- Storefront markup and scripts are derived from [Smartstore](https://github.com/smartstore/Smartstore) (AGPL-3.0).
