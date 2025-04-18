(() => {
    var A = Object.create;
    var v = Object.defineProperty;
    var x = Object.getOwnPropertyDescriptor;
    var C = Object.getOwnPropertyNames;
    var J = Object.getPrototypeOf,
        K = Object.prototype.hasOwnProperty;
    var d = (t, e) => () => (t && (e = t(t = 0)), e);
    var L = (t, e) => () => (e || t((e = {
        exports: {}
    }).exports, e), e.exports);
    var R = (t, e, o, i) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let n of C(e)) !K.call(t, n) && n !== o && v(t, n, {
                get: () => e[n],
                enumerable: !(i = x(e, n)) || i.enumerable
            });
        return t
    };
    var j = (t, e, o) => (o = t != null ? A(J(t)) : {}, R(e || !t || !t.__esModule ? v(o, "default", {
        value: t,
        enumerable: !0
    }) : o, t));
    var s = (t, e, o) => new Promise((i, n) => {
        var h = c => {
                try {
                    a(o.next(c))
                } catch (r) {
                    n(r)
                }
            },
            l = c => {
                try {
                    a(o.throw(c))
                } catch (r) {
                    n(r)
                }
            },
            a = c => c.done ? i(c.value) : Promise.resolve(c.value).then(h, l);
        a((o = o.apply(t, e)).next())
    });
    var N, I = d(() => {
        N = "WebPixel::Render"
    });
    var f, S = d(() => {
        I();
        f = t => shopify.extend(N, t)
    });
    var T = d(() => {
        S()
    });
    var P = d(() => {
        T()
    });
    var O = L(u => {
        P();
        var E = t => ({
                address1: t ? t.address1 : "",
                address2: t ? t.address2 : "",
                city: t ? t.city : "",
                country: t ? t.country : "",
                country_code: t ? t.countryCode : "",
                first_name: t ? t.firstName : "",
                last_name: t ? t.lastName : "",
                phone: t ? t.phone : "",
                province: t ? t.province : "",
                province_code: t ? t.provinceCode : "",
                zip: t ? t.zip : ""
            }),
            m = (t, e) => ({
                data: {
                    email: t.email,
                    phone: t.phone,
                    buyer_accepts_email_marketing: t.buyerAcceptsEmailMarketing,
                    buyer_accepts_sms_marketing: t.buyerAcceptsSmsMarketing,
                    currency_code: t.currencyCode,
                    discounts_amount: t.discountsAmount ? t.discountsAmount.amount : 0,
                    subtotal_price: t.subtotalPrice.amount,
                    total_price: t.totalPrice.amount,
                    billing_address: E(t.billingAddress),
                    shipping_address: E(t.shippingAddress),
                    items: t.lineItems.map(o => ({
                        title: o.title,
                        quantity: o.quantity,
                        line_price: o.finalLinePrice ? o.finalLinePrice.amount : 0,
                        variant: {
                            id: o.variant.id,
                            title: o.variant.title,
                            display_name: o.variant.displayName ? o.variant.displayName : "",
                            image: {
                                src: o.variant.image.src ? o.variant.image.src.replace("_64x64", "") : null
                            },
                            product: {
                                id: o.variant.product.id,
                                title: o.variant.product.title
                            }
                        }
                    })),
                    checkout_url: e
                },
                id: t.token
            }),
            _ = h => s(u, [h], function*({
                isEmailRequired: t = !0,
                browser: e,
                eventName: o,
                payload: i,
                url: n
            }) {
                try {
                    let l = "https://in-automate.brevo.com/p",
                        a = null;
                    i.data.buyer_accepts_email_marketing && (a = i.data.email);
                    let [c, r, y] = yield Promise.all([e.localStorage.getItem("pushowl_email"), e.cookie.get("sib_cuid"), e.sessionStorage.getItem("pushowl_current_config_key")]), p = a || c, g = yield e.sessionStorage.getItem(y);
                    if (g) {
                        let b = JSON.parse(g),
                            k = b.brevo_ma_key;
                        if (!(k && b.flags.brevo_email === "enabled")) return;
                        (p && t || !t) && (!c && a && e.localStorage.setItem("pushowl_email", a), yield fetch(l, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify({
                                sib_name: o,
                                sib_type: "track",
                                key: k,
                                contact: {
                                    email_id: p
                                },
                                ma_url: n,
                                cuid: r,
                                event: i
                            })
                        }))
                    }
                } catch (l) {
                    console.log(l)
                }
            });
        f(o => s(u, [o], function*({
            analytics: t,
            browser: e
        }) {
            t.subscribe("checkout_started", i => s(u, null, function*() {
                let n = i.context.document.location.href;
                _({
                    browser: e,
                    eventName: "checkout_started",
                    payload: m(i.data.checkout, n),
                    url: n
                })
            })), t.subscribe("checkout_completed", i => s(u, null, function*() {
                let [n, h, l, a, c] = yield Promise.all([e.localStorage.getItem("pushowl_subscriber_token"), e.sessionStorage.getItem("pushowl_session_token"), e.localStorage.getItem("pushowl_visitor_token"), e.sessionStorage.getItem("pushowl_subdomain"), e.sessionStorage.getItem("pushowl_environment")]), r = i.context.document.location.href;
                _({
                    browser: e,
                    eventName: "checkout_completed",
                    payload: m(i.data.checkout, r),
                    url: r
                });
                let {
                    order: {
                        customer: {
                            id: y
                        }
                    }
                } = i.data.checkout;
                if (!n || !a) return;
                let p = c === "staging" ? "https://api-staging.pushowl.com/api" : "https://api.pushowl.com/api";
                try {
                    yield fetch(`${p}/v1/accounts/${a}/subscriber/`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            data: [{
                                key: "customer_id",
                                value: y
                            }],
                            token: n,
                            context: {
                                session_token: h,
                                visitor_token: l
                            }
                        })
                    })
                } catch (g) {
                    console.error(g)
                }
            })), t.subscribe("checkout_address_info_submitted", i => s(u, null, function*() {
                let n = i.context.document.location.href;
                _({
                    browser: e,
                    eventName: "checkout_address_info_submitted",
                    payload: m(i.data.checkout, n),
                    url: n
                })
            })), t.subscribe("checkout_contact_info_submitted", i => s(u, null, function*() {
                let n = i.context.document.location.href;
                _({
                    browser: e,
                    eventName: "checkout_contact_info_submitted",
                    payload: m(i.data.checkout, n),
                    url: n
                })
            })), t.subscribe("checkout_shipping_info_submitted", i => s(u, null, function*() {
                let n = i.context.document.location.href;
                _({
                    browser: e,
                    eventName: "checkout_shipping_info_submitted",
                    payload: m(i.data.checkout, n),
                    url: n
                })
            }))
        }))
    });
    var F = j(O());
})();