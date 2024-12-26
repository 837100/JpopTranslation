// ad-container.js

function loadCoupangAd() {
    const adContainer = document.getElementById('ad-container');
    if (!adContainer) return;

    const script = document.createElement('script');
    script.src = "https://ads-partners.coupang.com/g.js";
    script.onload = () => {
        new PartnersCoupang.G({
            id: 784952,
            trackingCode: "AF1315244",
            subId: null,
            template: "carousel",
            width: "100%", // 너비를 100%로 설정
            height: "auto" // 높이를 자동으로 설정
        });
    };
    adContainer.appendChild(script);

    // 추가 설명 텍스트
    const text = document.createElement('p');
    text.className = 'mt5';
    text.textContent = `"이 링크는 쿠팡 파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다."`;
    adContainer.appendChild(text);
}