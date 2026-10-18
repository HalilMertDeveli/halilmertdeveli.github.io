/*
 * MOTOR static prototype: answers Smartstore's AJAX calls from pre-captured files,
 * so menus, mini cart and add-to-cart feedback work without a backend.
 * Loaded right after jQuery; window.MOTOR_ROOT is the relative path to the site root.
 */
(function ($) {
    'use strict';
    if (!$) return;

    var root = window.MOTOR_ROOT || './';

    // Per-visitor demo cart state: empty until something is added, cleared after the order.
    var cartKey = 'motor-demo-cart';
    var store = { get: function () { try { return sessionStorage.getItem(cartKey) === '1'; } catch (e) { return false; } },
                  set: function (v) { try { v ? sessionStorage.setItem(cartKey, '1') : sessionStorage.removeItem(cartKey); } catch (e) { } } };
    if (/\/(cart|checkout\/(billingaddress|shippingmethod|paymentmethod|confirm))\/$/.test(location.pathname)) store.set(true);
    if (/\/checkout\/completed\/$/.test(location.pathname)) store.set(false);
    var routes = [
        [/\/shoppingcart\/cartsummary/i, 'static-ajax/cartsummary.json', 'json'],
        [/\/shoppingcart\/offcanvasshoppingcart/i, 'static-ajax/offcanvas-cart.html', 'html'],
        [/\/shoppingcart\/offcanvaswishlist/i, 'static-ajax/offcanvas-empty.html', 'html'],
        [/\/catalog\/offcanvascompare/i, 'static-ajax/offcanvas-empty.html', 'html'],
        [/\/cart\/addproduct|\/shoppingcart\/addproduct/i, 'static-ajax/add-to-cart.json', 'json'],
        [/instantsearch/i, 'static-ajax/instasearch.html', 'html'],
        [/\/newsletter\/subscribe/i, 'static-ajax/newsletter.json', 'json']
    ];

    // Mobile menu layers captured per node id (filled in at build time)
    var ocmIds = [0,46,47,48,49,50,51,52,53,54,55,56,57,66,62,63,64,65,58,59,60,61];

    $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
        var url = options.url || '';
        // Static files of the prototype itself pass through unchanged.
        if (/static-ajax\//.test(url) || /\.(css|js|json|html?|png|jpe?g|webp|svg|woff2?)(\?|$)/i.test(url)) return;

        // Live price/variant refresh needs the server: keep the page as rendered.
        if (/updateproductdetails|\/product\/details|productdetails/i.test(url)) { jqXHR.abort(); return; }

        var target = 'static-ajax/empty.json', type = 'json';
        if (/\/menu\/offcanvas/i.test(url)) {
            var m = /targetNodeId=(\d+)/.exec(typeof options.data === 'string' ? options.data : $.param(originalOptions.data || {}));
            target = m && ocmIds.indexOf(+m[1]) > -1 ? 'static-ajax/ocm-' + m[1] + '.html' : 'static-ajax/ocm-home.html';
            type = 'html';
        }
        else for (var i = 0; i < routes.length; i++) {
            if (routes[i][0].test(url)) { target = routes[i][1]; type = routes[i][2]; break; }
        }

        if (/add-to-cart/.test(target)) store.set(true);
        if (!store.get()) target = target.replace('cartsummary.json', 'cartsummary-empty.json').replace('offcanvas-cart.html', 'offcanvas-cart-empty.html');

        // Captured fragments carry __MOTOR_ROOT__ in links and images (see fix-static.mjs).
        options.dataFilter = function (data) { return typeof data === 'string' ? data.split('__MOTOR_ROOT__').join(root) : data; };
        options.url = root + target;
        options.type = 'GET';
        options.method = 'GET';
        options.data = null;
        options.processData = false;
        options.contentType = false;
        options.cache = true;
        if (!options.dataType) options.dataType = type;
    });

    // Forms are rewritten to GET navigations at build time; nothing else may post.
    $(document).on('submit', 'form[data-motor-inert]', function (e) { e.preventDefault(); });

    // Checkout steps: "next"/"confirm" buttons go straight to the next captured step page.
    if (window.MOTOR_NEXT) {
        document.addEventListener('click', function (e) {
            var btn = e.target.closest('[class*="next-step"], #nextstep, .btn-buy, .select-billing-address-button, .select-shipping-address-button');
            if (!btn) return;
            e.preventDefault();
            e.stopImmediatePropagation();
            window.location.href = window.MOTOR_NEXT;
        }, true);
    }
})(window.jQuery);
