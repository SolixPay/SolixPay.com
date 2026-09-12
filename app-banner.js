/**
 * SolixPay App Download Banner
 * - Only on Home (landing) and Login page
 * - Shows for 3 seconds
 * - Repeats every 10 minutes
 * - Does NOT show on dashboard/admin or during refresh flash
 */
document.addEventListener("DOMContentLoaded", function () {
  var bannerHTML =
    '<div id="appDownloadBanner" style="display:none;align-items:center;justify-content:space-between;background:#1e293b;color:#ffffff;padding:10px 15px;font-family:sans-serif;font-size:14px;position:sticky;top:0;z-index:9999;box-shadow:0 2px 5px rgba(0,0,0,0.2);">' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<span style="background:#3b82f6;color:white;padding:4px 8px;border-radius:4px;font-size:12px;font-weight:bold;">নতুন</span>' +
        '<span>SolixPay অফিশিয়াল অ্যাপটি ইনস্টল করুন!</span>' +
      '</div>' +
      '<div style="display:flex;align-items:center;gap:10px;">' +
        '<a href="SolixPay.apk" download style="background:#22c55e;color:white;padding:6px 12px;text-decoration:none;border-radius:4px;font-weight:bold;font-size:13px;">ডাউনলোড</a>' +
        '<button id="closeBannerBtn" type="button" style="background:transparent;border:none;color:#94a3b8;font-size:18px;cursor:pointer;line-height:1;">&times;</button>' +
      '</div>' +
    '</div>';

  document.body.insertAdjacentHTML("afterbegin", bannerHTML);

  var banner = document.getElementById("appDownloadBanner");
  var hideTimeout = null;
  var SHOW_MS = 3 * 1000;          // 3 seconds visible
  var INTERVAL_MS = 10 * 60 * 1000; // every 10 minutes
  var FIRST_DELAY_MS = 1200;        // slight delay so page state is stable

  function isVisible(el) {
    if (!el) return false;
    if (el.classList.contains("hidden")) return false;
    var style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    // boot-hide style during refresh
    if (document.getElementById("sp-boot-hide")) return false;
    return true;
  }

  /** Only Home page OR Login page */
  function canShowBanner() {
    var landing = document.getElementById("landing");
    var auth = document.getElementById("authSection");
    var loginView = document.getElementById("loginView");
    var dashboard = document.getElementById("dashboard");
    var admin = document.getElementById("adminPanel");

    // Never on dashboard / admin
    if (isVisible(dashboard) || isVisible(admin)) return false;

    // Home page
    if (isVisible(landing)) return true;

    // Login page only (not register / forgot)
    if (isVisible(auth) && isVisible(loginView)) return true;

    return false;
  }

  function hideBanner() {
    if (banner) banner.style.display = "none";
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }

  function showDownloadBanner() {
    if (!banner) return;
    if (!canShowBanner()) {
      hideBanner();
      return;
    }
    banner.style.display = "flex";
    if (hideTimeout) clearTimeout(hideTimeout);
    hideTimeout = setTimeout(function () {
      hideBanner();
    }, SHOW_MS);
  }

  var closeBtn = document.getElementById("closeBannerBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", function () {
      hideBanner();
    });
  }

  // If user navigates away (login → dashboard), hide immediately
  setInterval(function () {
    if (banner && banner.style.display === "flex" && !canShowBanner()) {
      hideBanner();
    }
  }, 500);

  // First show after page settles (only if still on home/login)
  setTimeout(showDownloadBanner, FIRST_DELAY_MS);

  // Every 10 minutes
  setInterval(showDownloadBanner, INTERVAL_MS);
});
