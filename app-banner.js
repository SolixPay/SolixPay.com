document.addEventListener("DOMContentLoaded", function() {
    let bannerHTML = `
    <div id="appDownloadBanner" style="display: none; align-items: center; justify-content: space-between; background: #1e293b; color: #ffffff; padding: 10px 15px; font-family: sans-serif; font-size: 14px; position: sticky; top: 0; z-index: 9999; box-shadow: 0 2px 5px rgba(0,0,0,0.2);">
        <div style="display: flex; align-items: center; gap: 10px;">
            <span style="background: #3b82f6; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold;">নতুন</span>
            <span>SolixPay অফিশিয়াল অ্যাপটি ইনস্টল করুন!</span>
        </div>
        <div style="display: flex; align-items: center; gap: 10px;">
            <a href="SolixPay.apk" download style="background: #22c55e; color: white; padding: 6px 12px; text-decoration: none; border-radius: 4px; font-weight: bold; font-size: 13px;">ডাউনলোড</a>
            <button id="closeBannerBtn" style="background: transparent; border: none; color: #94a3b8; font-size: 18px; cursor: pointer;">&times;</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('afterbegin', bannerHTML);

    let banner = document.getElementById('appDownloadBanner');
    let hideTimeout;

    function showDownloadBanner() {
        if (banner) {
            banner.style.display = 'flex';
            
            // ১০ সেকেন্ড পর অটোমেটিক অফ হয়ে যাবে
            hideTimeout = setTimeout(function() {
                banner.style.display = 'none';
            }, 10000); // ১০ সেকেন্ড
        }
    }

    // ক্লোজ বাটনে ক্লিক করলে ইনস্ট্যান্ট বন্ধ হবে
    document.getElementById('closeBannerBtn').addEventListener('click', function() {
        banner.style.display = 'none';
        clearTimeout(hideTimeout); // টাইমার ক্লিয়ার করে দেওয়া হলো যাতে ঠিক ৫ মিনিট পর আবার রান হতে পারে
    });

    // পেজে ঢোকার ১ সেকেন্ড পর প্রথমবার ১০ সেকেন্ডের জন্য দেখাবে
    setTimeout(showDownloadBanner, 1000);

    // প্রতি ৫ মিনিট পরপর মাত্র ১০ সেকেন্ডের জন্য ব্যানারটি ট্রিগার হবে
    setInterval(showDownloadBanner, 5 * 60 * 1000);
});