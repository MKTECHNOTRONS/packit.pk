(() => {
    var W = Object.create;
    var N = Object.defineProperty;
    var X = Object.getOwnPropertyDescriptor;
    var J = Object.getOwnPropertyNames;
    var Q = Object.getPrototypeOf,
        z = Object.prototype.hasOwnProperty;
    var S = (o, e) => () => (o && (e = o(o = 0)), e);
    var B = (o, e) => () => (e || o((e = {
        exports: {}
    }).exports, e), e.exports);
    var G = (o, e, r, i) => {
        if (e && typeof e == "object" || typeof e == "function")
            for (let c of J(e)) !z.call(o, c) && c !== r && N(o, c, {
                get: () => e[c],
                enumerable: !(i = X(e, c)) || i.enumerable
            });
        return o
    };
    var H = (o, e, r) => (r = o != null ? W(Q(o)) : {}, G(e || !o || !o.__esModule ? N(r, "default", {
        value: o,
        enumerable: !0
    }) : r, o));
    var f = (o, e, r) => new Promise((i, c) => {
        var d = _ => {
                try {
                    u(r.next(_))
                } catch (l) {
                    c(l)
                }
            },
            C = _ => {
                try {
                    u(r.throw(_))
                } catch (l) {
                    c(l)
                }
            },
            u = _ => _.done ? i(_.value) : Promise.resolve(_.value).then(d, C);
        u((r = r.apply(o, e)).next())
    });
    var A, D = S(() => {
        A = "WebPixel::Render"
    });
    var E, L = S(() => {
        D();
        E = o => shopify.extend(A, o)
    });
    var R = S(() => {
        L()
    });
    var U = S(() => {
        R()
    });
    var j = B(s => {
        U();
        var k = ["gfp_ref", "ref", "aff", "wpam_id", "click_id"],
            O = "dcode";
        E(i => f(s, [i], function*({
            analytics: o,
            browser: e,
            settings: r
        }) {
            let c = (r == null ? void 0 : r.first_touch_or_last) === "first_touch" || (r == null ? void 0 : r.first_touch_or_last) === "first_touch_nonblocking",
                d = (r == null ? void 0 : r.first_touch_or_last) === "first_touch",
                C = r == null ? void 0 : r.use_local_storage,
                u = (r == null ? void 0 : r.cookie_duration) > -1 ? r == null ? void 0 : r.cookie_duration : 7 * 24 * 60 * 60,
                _ = (r == null ? void 0 : r.noref_cookie_identifiers) || ["noref"],
                l = r.shop,
                m = {
                    get: a => f(s, null, function*() {
                        let t = yield e.localStorage.getItem(a);
                        return t || e.cookie.get(a)
                    }),
                    set: (a, t) => f(s, null, function*() {
                        yield Promise.all([e.localStorage.setItem(a, t), e.cookie.set(a, t)])
                    })
                },
                I = (yield m.get("gfp_api_server")) || (r == null ? void 0 : r.api_server) || "https://api.goaffpro.com",
                y = () => f(s, null, function*() {
                    let a = ["ref", "source", O, "discount_code", "sitestripe", "gfp_v_id", "gfp_ref_expires"];
                    yield Promise.all(a.map(t => m.set(t, "")))
                });

            function p(a) {
                return f(this, null, function*() {
                    if (u) {
                        let t = yield m.get("gfp_ref_expires");
                        if (t && new Date(t).getTime() < Date.now()) return yield y(), ""
                    }
                    return yield m.get(a)
                })
            }

            function b(a, t) {
                return f(this, null, function*() {
                    if (a === "ref" && _.indexOf(t) > -1) return yield y();
                    a === "ref" && u && (yield m.set("gfp_ref_expires", String(Date.now() + u * 1e3))), yield m.set(a, t)
                })
            }
            o.subscribe("page_viewed", a => f(s, null, function*() {
                let t = a.context.document.location.href,
                    h = K(t),
                    g = yield p("ref");
                h ? h !== g && !c && (yield b("ref", h)) : !g && d && (yield b("ref", "organic"));
                let [v, w, T, x] = yield Promise.all([p("sub_id"), p("ref"), p("gfp_v_id"), p(O)]);
                if (!w && !x) return;
                let n = new URL(I + "/shop");
                return v && n.searchParams.append("sub_id", v), w && n.searchParams.append("ref", w), x && n.searchParams.append("discount_code", x), n.searchParams.append("shop", l), n.searchParams.append("location", t), n.searchParams.append("navigator", a.context.navigator.userAgent), n.searchParams.append("referrer", a.context.document.referrer), T && n.searchParams.append("visit_id", T), n.searchParams.append("from_shopify_pixel", "1"), fetch(n.href).then(P => (P.status === 420 && y(), P.json())).then(({
                    visit_id: P
                }) => {
                    if (P) return b("gfp_v_id", String(P))
                })
            })), o.subscribe("checkout_completed", a => f(s, null, function*() {
                let t = a.data,
                    h = a.context,
                    g = {
                        id: t.checkout.order.id
                    },
                    [v, w, T, x] = yield Promise.all([p("sub_id"), p("ref"), p("gfp_v_id"), p(O)]);
                fetch(I + "/order_complete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        sub_id: v,
                        from_shopify_pixel: !0,
                        ref: w,
                        discount_code: x,
                        visit_id: T,
                        shop: l,
                        location: h.document.location.href,
                        navigator: h.navigator.userAgent,
                        referrer: h.document.referrer,
                        order_id: g.id,
                        data: g
                    })
                }).then(n => f(s, null, function*() {
                    if (n.status === 420) return y();
                    yield b("gfp_v_id", "")
                }))
            }))
        }));

        function K(o) {
            let e = new URL(o);
            return F(k, e.search) || F(k, e.hash.substring(1)) || M(k, e.href) || k.indexOf("hash") > -1 && e.hash.substring(1) || k.indexOf("subdomain") > -1 && e.host.split(".")[0]
        }

        function F(o, e) {
            if (!(!o || o.length === 0) && e.length > 0) {
                let r = new URLSearchParams(e.toLowerCase());
                for (let i of o)
                    if (r.get(i)) return r.get(i).trim()
            }
        }

        function M(o, e) {
            let r = o.filter(function(i) {
                return i.startsWith("regexp:")
            }).map(function(i) {
                return i.substring(7)
            });
            for (let i = 0; i < r.length; i++) {
                let c = r[i],
                    d = e.match(new RegExp(c, "i"));
                if (d && d.length > 0) return d[1]
            }
        }
    });
    var cr = H(j());
})();