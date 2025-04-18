(function() {
    var baseURL = "https://cdn.shopify.com/shopifycloud/checkout-web/assets/";
    var scripts = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/polyfills.CPIGHvSH.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/app.DE5MNd1X.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/page-OnePage.DIA9tXLr.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/DeliveryMethodSelectorSection.Bf0boBSi.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/useEditorShopPayNavigation.BHYSzY_s.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/VaultedPayment.DjeCn0w1.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/LocalizationExtensionField.Blky6-zm.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/ShopPayOptInDisclaimer.C8W8ge3q.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/ShipmentBreakdown.C8p1PNSi.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/MerchandiseModal.D3hfMTdE.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/StackedMerchandisePreview.78Hq_seI.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/PayButtonSection.B3Bp1GAh.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/component-ShopPayVerificationSwitch.C8hkarT_.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/useSubscribeMessenger.BEwr_2dv.js", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/index.CUKmY-Xx.js"];
    var styles = ["https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/app.CXL-GAUL.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/OnePage.PMX4OSBO.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/DeliveryMethodSelectorSection.DmqjTkNB.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/useEditorShopPayNavigation.DCOTvxC3.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/VaultedPayment.OxMVm7u-.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/StackedMerchandisePreview.CKAakmU8.css", "https://cdn.shopify.com/shopifycloud/checkout-web/assets/c1.en/assets/ShopPayVerificationSwitch.DW7NMDXG.css"];
    var fontPreconnectUrls = [];
    var fontPrefetchUrls = [];
    var imgPrefetchUrls = ["https://cdn.shopify.com/s/files/1/0355/2395/2685/files/PACKIT.PK-Pakistans-best-packaging-home-kitchen-essentials-brand_x320.png?v=1712675298"];

    function preconnect(url, callback) {
        var link = document.createElement('link');
        link.rel = 'dns-prefetch preconnect';
        link.href = url;
        link.crossOrigin = '';
        link.onload = link.onerror = callback;
        document.head.appendChild(link);
    }

    function preconnectAssets() {
        var resources = [baseURL].concat(fontPreconnectUrls);
        var index = 0;
        (function next() {
            var res = resources[index++];
            if (res) preconnect(res, next);
        })();
    }

    function prefetch(url, as, callback) {
        var link = document.createElement('link');
        if (link.relList.supports('prefetch')) {
            link.rel = 'prefetch';
            link.fetchPriority = 'low';
            link.as = as;
            if (as === 'font') link.type = 'font/woff2';
            link.href = url;
            link.crossOrigin = '';
            link.onload = link.onerror = callback;
            document.head.appendChild(link);
        } else {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onloadend = callback;
            xhr.send();
        }
    }

    function prefetchAssets() {
        var resources = [].concat(
            scripts.map(function(url) {
                return [url, 'script'];
            }),
            styles.map(function(url) {
                return [url, 'style'];
            }),
            fontPrefetchUrls.map(function(url) {
                return [url, 'font'];
            }),
            imgPrefetchUrls.map(function(url) {
                return [url, 'image'];
            })
        );
        var index = 0;

        function run() {
            var res = resources[index++];
            if (res) prefetch(res[0], res[1], next);
        }
        var next = (self.requestIdleCallback || setTimeout).bind(self, run);
        next();
    }

    function onLoaded() {
        try {
            if (parseFloat(navigator.connection.effectiveType) > 2 && !navigator.connection.saveData) {
                preconnectAssets();
                prefetchAssets();
            }
        } catch (e) {}
    }

    if (document.readyState === 'complete') {
        onLoaded();
    } else {
        addEventListener('load', onLoaded);
    }
})();