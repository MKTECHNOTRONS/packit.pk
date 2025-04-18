var gfp_aff_toolbar;;
if (window.__goaffpro) {
    throw new Error('Goaffpro is already loaded. This message prevents duplicate loading of the script. Kindly ignore.')
}
window.__goaffpro = {
    "pre_checkout_ref_input_data": {
        "input_label": "Referred By?",
        "input_placeholder": "Referral Code"
    },
    "shop": "packit-pk.myshopify.com",
    "cookie_duration": 604800,
    "checkout_page_callback": true,
    "scripts": [],
    "first_touch_or_last": "last_touch",
    "identifiers": ["ref", "aff", "wpam_id", "click_id"],
    "noref_cookie_identifiers": ["noref"],
    "integration": "shopify",
    "force_callback": true,
    "partner_portal_subdomain": "packit.goaffpro.com",
    "customer_affiliate_connect_auto": false,
    "use_local_storage": true,
    "cart_level_tracking": true,
    "share_cart_clear_before_add": true,
    "autolink_ref_parameter": "ref",
    "discount_cookie": "dcode"
};
var goaffpro_identifiers = ["gfp_ref", "ref", "aff", "wpam_id", "click_id"],
    source_identifiers = ["gfp_sub_id", "sub_id"],
    gfp_additional = window.__goaffpro && window.__goaffpro.identifiers,
    isFirstTouch = window.__goaffpro && ("first_touch" === window.__goaffpro.first_touch_or_last || "first_touch_nonblocking" === window.__goaffpro.first_touch_or_last),
    gfp_setOrganic = window.__goaffpro && "first_touch" === window.__goaffpro.first_touch_or_last,
    useLocalStorage = window.__goaffpro && window.__goaffpro.use_local_storage,
    gfp_discount_code_cookie = window.__goaffpro && window.__goaffpro.discount_cookie || "dcode",
    gfp_no_ref_cookies = window.__goaffpro && window.__goaffpro.noref_cookie_identifiers || ["noref"];
gfp_additional && Array.isArray(gfp_additional) && 0 < gfp_additional.length && (goaffpro_identifiers = gfp_additional);
var gfp_api_server = "https://api2.goaffpro.com";
window.goaffproOrder && !window.goaffpro_order && (window.goaffpro_order = window.goaffproOrder);
var gfp_cookieManager = {
    getCookie: function(o) {
        if (useLocalStorage) return localStorage.getItem(o);
        const e = document.cookie.split("; ") || [];
        const r = {};
        for (var i, t = 0; t < e.length; t++) {
            var f = e[t].split("="),
                a = f.slice(1).join("=");
            try {
                var n = decodeURIComponent(f[0]);
                if (r[n] = (i = '"' === (i = a)[0] ? i.slice(1, -1) : i).replace(/(%[\dA-F]{2})+/gi, decodeURIComponent), o === n) break
            } catch (o) {}
        }
        return r[o]
    },
    deleteCookie: function(o) {
        useLocalStorage && localStorage.removeItem(o), gfp_cookieManager.setCookie(o, "", -1e3)
    },
    setCookie: function(o, e, r) {
        r = r || (window.__goaffpro && -1 < window.__goaffpro.cookie_duration ? window.__goaffpro.cookie_duration : 604800);
        useLocalStorage && localStorage.setItem(o, e), "ref" === o && r && gfpSetCookie("gfp_ref_expires", Date.now() + 1e3 * r);
        var i = ";";
        r && (i = "; expires=" + new Date((new Date).getTime() + 1e3 * r).toUTCString() + ";");
        var t = location.hostname.split(".");
        if (1 === t.length) document.cookie = o + "=" + e + i + "; path=/";
        else
            do {
                try {
                    var f = "." + t.join(".");
                    document.cookie = o + "=" + e + i + "path=/; SameSite=Lax; domain=" + f, t.shift()
                } catch (o) {}
            } while (1 < t.length)
    }
};

function gfpGetCookie(o) {
    return gfp_cookieManager.getCookie(o)
}

function gfpDeleteCookie(o) {
    return gfp_cookieManager.deleteCookie(o)
}

function gfpSetCookie(o, e) {
    return gfp_cookieManager.setCookie(o, e)
}

function getRefCode() {
    if (isFirstTouch && gfpGetCookie("ref")) return gfpGetCookie("ref");
    var o = searchInQuery(goaffpro_identifiers, document.location.search);
    return o || ((o = searchInQuery(goaffpro_identifiers, document.location.hash)) || (o = regexSearch(goaffpro_identifiers)) || (o = searchInQuery(goaffpro_identifiers, goaffproShopifyStVariableFix())) ? o : -1 < goaffpro_identifiers.indexOf("hash") ? document.location.hash && document.location.hash.substring(1) : -1 < goaffpro_identifiers.indexOf("subdomain") ? document.location.host.split(".")[0] : isFirstTouch && gfp_setOrganic ? "organic" : null)
}

function regexSearch(o) {
    for (var e = o.filter(function(o) {
            return o.startsWith("regexp:")
        }).map(function(o) {
            return o.substr(7)
        }), r = 0; r < e.length; r++) {
        var i = e[r],
            i = document.location.href.match(new RegExp(i, "i"));
        if (i && 0 < i.length) return i[1]
    }
}

function getSourceId() {
    return isFirstTouch && gfpGetCookie("source") ? gfpGetCookie("source") : searchInQuery(source_identifiers, document.location.search)
}

function searchInQuery(o, e) {
    if (o && 0 !== o.length) {
        e = e || document.location.search;
        if (0 < e.length) {
            const f = new URLSearchParams(e),
                a = {};
            for (var [r, i] of f.entries()) a[r.toLowerCase()] = i;
            for (var t of o)
                if (a[t.toLowerCase()]) return a[t.toLowerCase()]
        }
    }
}

function getShop() {
    var e = void 0;
    return Object.keys(document.scripts).forEach(function(o) {
        o = document.scripts[o];
        o.src && o.src.startsWith("https://static.goaffpro.com/reftracker.js") && (e = o.src.replace("https://static.goaffpro.com/reftracker.js?shop=", ""))
    }), e || window.__goaffpro && window.__goaffpro.shop || document.location.host
}

function trackVisit() {
    var r = gfpGetCookie("ref"),
        i = gfpGetCookie(gfp_discount_code_cookie) || gfpGetCookie("discount_code"),
        o = gfpGetCookie("source"),
        e = gfpGetCookie("gfp_v_id");
    if (r || i) {
        if (window.gfp_visit_tracked) return;
        window.gfp_visit_tracked = !0;
        const t = new URL(gfp_api_server + "/shop"),
            f = {
                sub_id: o,
                ref: r,
                shop: getShop(),
                location: document.location.href,
                navigator: navigator.userAgent,
                referrer: document.referrer,
                discount_code: i,
                visit_id: e
            };
        return Object.keys(f).forEach(function(o) {
            void 0 !== f[o] && t.searchParams.append(o, f[o])
        }), fetch(t.href).then(function(o) {
            return 420 === o.status ? (gfp_remove_cookies(), {}) : o.json()
        }).then(function(o) {
            var e;
            o.discount_code && i !== o.discount_code && (gfpGetCookie(gfp_discount_code_cookie) !== o.discount_code && gfpSetCookie(gfp_discount_code_cookie, o.discount_code), "woocommerce" === window.__goaffpro.integration ? gfp_cookieManager.setCookie(gfp_discount_code_cookie, o.discount_code) : (e = new XMLHttpRequest, o.apply_discount_on_myshopify ? e.open("GET", "https://" + o.website + "/discount/" + encodeURIComponent(o.discount_code)) : e.open("GET", "/discount/" + encodeURIComponent(o.discount_code)), e.send())), o.visit_id && gfp_cookieManager.setCookie("gfp_v_id", "" + o.visit_id), o.cookie_duration && (r && gfp_cookieManager.setCookie("ref", r, o.cookie_duration), i && gfp_cookieManager.setCookie(gfp_discount_code_cookie, i, o.cookie_duration), source && gfp_cookieManager.setCookie("source", "" + source, o.cookie_duration), o.visit_id && gfp_cookieManager.setCookie("gfp_v_id", "" + o.visit_id, o.cookie_duration))
        }).catch(function(o) {})
    }
    return Promise.resolve()
}

function checkoutPageCallback() {
    if (window.__goaffpro) {
        var o = window.__goaffpro.integration;
        if ("undefined" != typeof Shopify && (Shopify.checkout || Shopify.Checkout) && window.__goaffpro.checkout_page_callback) {
            var e = Shopify.checkout ? Shopify.checkout.order_id || Shopify.checkout.id : null;
            !(e = e || new URL(document.location.href).searchParams.get("gid")) && window.goaffpro_order && goaffproTrackConversion(window.goaffpro_order), e && doCallback(e, Shopify.checkout || Shopify.Checkout)
        } else if (void 0 !== window.__big) doCallback(window.__big.order_id, window.__big);
        else if (void 0 !== window.Goaffpro && window.Goaffpro.data) doCallback(window.Goaffpro.data.order_id, window.Goaffpro.data);
        else if ("bigcommerce" === o) {
            e = document.body.innerHTML.split(" ").join(""), e = /orderId:'(.*?)'/gm.exec(e);
            e && 0 < e.length && doCallback(e[1], {})
        } else if ("squarespace" === o) {
            var r = searchInQuery(["oid"]);
            if (r || window.goaffpro_order) return doCallback(r || window.goaffpro_order.id, window.goaffpro_order)
        } else if ("webflow" === o) {
            r = searchInQuery(["orderid"]);
            r && doCallback(r, {
                id: r
            })
        } else if ("woocommerce" === o && window.order) {
            var i = window.order;
            i && doCallback(i.id, i)
        } else {
            if (window.goaffpro_order && (window.goaffpro_order.id || window.goaffpro_order.number)) return doCallback(window.goaffpro_order.id || window.goaffpro_order.number, window.goaffpro_order);
            document.getElementById("goaffpro_order_elem") && (i = (o = document.getElementById("goaffpro_order_elem")).getAttribute("data-order-id"), o = o.getAttribute("data-increment-id"), i && doCallback(i, {
                id: i,
                increment_id: o
            }))
        }
    }
}

function goaffproTrackConversion(o) {
    doCallback("string" == typeof o ? void 0 : o.id, o)
}

function goaffproTrackConversionSync(o) {
    doCallback("string" == typeof o ? void 0 : o.id, o, !0)
}

function respondToOpeningPageForMembershipPlans(o) {
    try {
        window.opener && window.opener.postMessage(JSON.stringify({
            id: o,
            type: "goaffpro"
        }), "*")
    } catch (o) {}
}
var gfpCallbackMade = !1;

function doCallback(o, e, r = !1) {
    var i = gfpGetCookie("ref"),
        t = gfpGetCookie(gfp_discount_code_cookie),
        f = gfpGetCookie("source"),
        a = gfpGetCookie("gfp_v_id");
    if (i || t || window.__goaffpro.force_callback) {
        if (gfpCallbackMade) return;
        gfpCallbackMade = !0;
        e = JSON.stringify({
            sub_id: f,
            ref: i,
            shop: getShop(),
            location: document.location,
            navigator: navigator.userAgent,
            referrer: document.referrer,
            discount_code: t,
            order_id: o,
            visit_id: a,
            data: e
        });
        if (r) navigator.sendBeacon("https://beacon.goaffpro.workers.dev/", e);
        else {
            const n = new XMLHttpRequest;
            n.open("POST", gfp_api_server + "/order_complete"), n.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), n.send(e)
        }
        gfp_cookieManager.deleteCookie("gfp_v_id")
    }
    window.__goaffpro && window.__goaffpro.remove_tracking_post_order && gfp_remove_cookies(), respondToOpeningPageForMembershipPlans(o)
}

function gfp_remove_cookies(o = ["ref", "source", gfp_discount_code_cookie, "discount_code", "sitestripe", "gfp_v_id", "gfp_ref_expires"]) {
    o.forEach(gfp_cookieManager.deleteCookie), window.__goaffpro && "shopify" === window.__goaffpro.integration && window.__goaffpro.cart_level_tracking && removeRefFromCart()
}
var refcode = getRefCode();

function testForExpiration() {
    var o = gfp_cookieManager.getCookie("gfp_ref_expires");
    o && 0 < Date.now() - new Date(Number(o)) && gfp_remove_cookies()
}

function gfpSetSource() {
    var o = getSourceId();
    o && gfp_cookieManager.setCookie("source", o)
}

function addRefToCart() {
    var o = gfpGetCookie("ref");
    if (o) {
        const r = new URLSearchParams;
        var e = gfpGetCookie("gfp_v_id");
        r.append("attributes[__ref]", o), e && r.append("attributes[__visit_id]", e);
        e = gfpGetCookie("source");
        return e && r.append("attributes[__sub_id]", e), fetch("/cart/update.js", {
            method: "POST",
            body: r
        }).then(() => {})
    }
}

function removeRefFromCart() {
    const o = new URLSearchParams;
    return o.append("attributes[__ref]", ""), o.append("attributes[__visit_id]", ""), fetch("/cart/update.js", {
        method: "POST",
        body: o
    }).then(() => {})
}

function gfpLoadScript(o, e) {
    const r = document.createElement("script");
    r.src = o, r.async = !0, e && (r.type = e), document.head.appendChild(r)
}

function showSiteStripeToolbar() {
    var o;
    window.gfp_aff_toolbar || !window.__goaffpro || !window.__goaffpro.aff_bar_config || (o = searchInQuery(["toolbar"], document.location.search) || gfpGetCookie("sitestripe")) && (window.gfp_aff_toolbar = window.__goaffpro.aff_bar_config, window.gfp_aff_toolbar.affiliate_portal_link = "https://" + window.__goaffpro.partner_portal_subdomain, window.gfp_aff_toolbar.ref_code = o, gfpLoadScript("https://static.goaffpro.com/sitestripe2.js"), gfp_cookieManager.setCookie("sitestripe", o))
}

function gfpConnectCustomer() {
    var o, e, r;
    window && window.GFPConnect && window.GFPConnect.customer && window.__goaffpro.customer_affiliate_connect_auto && (o = gfpGetCookie("ref"), e = gfpGetCookie(gfp_discount_code_cookie), (o || e) && ((r = new XMLHttpRequest).open("POST", gfp_api_server + "/connect_customer"), r.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), r.send(JSON.stringify({
        ref: o,
        shop: getShop(),
        discount_code: e,
        customer: window.GFPConnect.customer
    }))))
}

function goaffproShopifyStVariableFix() {
    if (window.__goaffpro && window.__goaffpro.shopify_use_st_variable && window.__st && window.__st.pageurl && !gfpGetCookie("ref")) return new URL(`https://${window.__st.pageurl}`).search
}
refcode && refcode !== gfpGetCookie("ref") && (gfp_cookieManager.setCookie("ref", refcode), gfp_remove_cookies(["source", gfp_discount_code_cookie, "discount_code", "gfp_v_id"])), getRefCode() && getSourceId() !== gfpGetCookie("source") && (getSourceId() ? gfpSetCookie("source", getSourceId()) : gfp_cookieManager.deleteCookie("source")), gfpSetSource(), testForExpiration(), -1 < gfp_no_ref_cookies.indexOf(refcode) || "shareasale" === gfpGetCookie("source") ? gfp_remove_cookies() : (trackVisit(), window.__goaffpro && "shopify" === window.__goaffpro.integration && window.__goaffpro.cart_level_tracking && addRefToCart(), checkoutPageCallback()), refcode = gfpGetCookie("ref"), window.__goaffpro && window.__goaffpro.scripts && Array.isArray(window.__goaffpro.scripts) && window.__goaffpro.scripts.forEach(function({
    src: o,
    type: e
}) {
    gfpLoadScript(o, e)
}), showSiteStripeToolbar(), gfpConnectCustomer(), window.addEventListener("message", function(o) {
    o.data && o.data.goaffproOrder ? goaffproTrackConversion(o.data.goaffproOrder) : o.data && o.data.ref && gfpGetCookie("ref") !== o.data.ref && (gfpSetCookie("ref", o.data.ref), trackVisit().then(() => {
        checkoutPageCallback()
    }))
}), window.addEventListener("goaffproTrackConversion", o => {
    o && o.detail && goaffproTrackConversion(o.detail)
}), window.addEventListener("goaffproReferralCode", o => {
    o && o.detail && void 0 !== o.detail.ref && gfpGetCookie("ref") !== o.detail.ref && (null === o.detail.ref || -1 < gfp_no_ref_cookies.indexOf(o.detail.ref) ? gfp_remove_cookies() : (gfpSetCookie("ref", o.detail.ref), trackVisit().then(() => {
        checkoutPageCallback()
    })))
});
! function() {
    let a;

    function t() {
        if (a = gfpGetCookie("ref"), a && "organic" !== a) {
            const n = window.__goaffpro.autolink_ref_parameter;
            let r = "sub_id";
            if (window.__goaffpro.source_identifiers && Array.isArray(window.__goaffpro.source_identifiers) && (window.__goaffpro.source_identifiers.includes("sub_id") || (r = window.__goaffpro.source_identifiers[0])), n) {
                var t = [];
                if (document.querySelectorAll("a").forEach(function(e) {
                        t.push(e)
                    }), t && 0 !== t.length) {
                    const i = /fb|messenger|twitter|instagram|musical_ly|bytedance/gim.test(navigator.userAgent);
                    t.forEach(function(e) {
                        const t = e.href;
                        if (t && "string" == typeof t && t.startsWith("http")) {
                            const o = new URL(e.href);
                            !i && o.hostname === document.location.hostname || o.searchParams.get(n) === encodeURIComponent(a) || (o.searchParams.set(n, a), o.searchParams.set(r, gfpGetCookie("source")), e.href = o.href)
                        }
                    })
                }
            }
        }
    }
    var e;
    e = function() {
        t();
        const e = new MutationObserver(() => function(o, r) {
            let n = 0;
            return (...e) => {
                var t = (new Date).getTime();
                if (t - n > r) return n = t, o(...e)
            }
        }(t, 2e3));
        e.observe(document.body, {
            attributes: !0,
            childList: !0,
            subtree: !0
        })
    }, "loading" !== document.readyState ? e() : document.addEventListener("DOMContentLoaded", e), window.addEventListener("goaffproReferralCode", e => {
        e && e.detail && void 0 !== e.detail.ref && a !== e.detail.ref && t(e.detail.ref)
    })
}();

undefined