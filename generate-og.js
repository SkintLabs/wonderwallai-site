const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

// Embed fonts as base64
const kenjaku = fs.readFileSync(path.join(__dirname, 'assets/fonts/Kenjaku DEMO.otf')).toString('base64');
const neonFuture = fs.readFileSync(path.join(__dirname, 'assets/NeonFuture.ttf')).toString('base64');
const retroByte = fs.readFileSync(path.join(__dirname, 'assets/fonts/RetroByte.ttf')).toString('base64');
const logoImg = fs.readFileSync(path.join(__dirname, 'assets/wonderwallai-logo.png')).toString('base64');

const html = `<!DOCTYPE html>
<html>
<head>
<style>
@font-face { font-family: 'Kenjaku'; src: url(data:font/opentype;base64,${kenjaku}) format('opentype'); }
@font-face { font-family: 'NeonFuture'; src: url(data:font/truetype;base64,${neonFuture}) format('truetype'); }
@font-face { font-family: 'RetroByte'; src: url(data:font/truetype;base64,${retroByte}) format('truetype'); }

* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    width: 2400px; height: 1260px;
    background: #0c0b0a;
    font-family: 'Inter', sans-serif;
    color: #ede8e0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}

/* Top border gradient */
body::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 6px;
    background: linear-gradient(90deg, #2a9d8f, #3eb8c8, #4a9eff);
}

/* Background glow */
body::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 1200px; height: 800px;
    background: radial-gradient(ellipse, rgba(42,157,143,0.12) 0%, rgba(255,210,0,0.04) 40%, transparent 70%);
    pointer-events: none;
}

.content { position: relative; z-index: 1; text-align: center; }

.logo-row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 30px;
    margin-bottom: 40px;
}

.logo-img { width: 200px; height: 200px; object-fit: contain; }

.wordmark {
    font-family: 'Kenjaku', sans-serif;
    font-size: 9rem;
    letter-spacing: 0.04em;
    color: #ede8e0;
}
.wordmark .ww-a { color: #4a9eff; }
.wordmark .ww-i { color: #e9c46a; }

.tagline {
    font-family: 'NeonFuture', sans-serif;
    font-size: 5.2rem;
    letter-spacing: 0.04em;
    background: linear-gradient(135deg, #e76f51, #f4a261, #e9c46a);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 50px;
    line-height: 1.15;
}

.desc {
    font-family: 'RetroByte', sans-serif;
    font-size: 3.2rem;
    color: #ddd2bd;
    letter-spacing: 0.05em;
    margin-bottom: 80px;
    line-height: 1.4;
    max-width: 2000px;
}

.pills {
    display: flex;
    gap: 24px;
    justify-content: center;
    margin-bottom: 60px;
    flex-wrap: wrap;
    max-width: 2200px;
}
.pill {
    font-family: 'RetroByte', sans-serif;
    font-size: 2.4rem;
    padding: 22px 42px;
    border: 2px solid #4a4035;
    border-radius: 14px;
    color: #ede8e0;
    letter-spacing: 0.04em;
}
.pill.green { border-color: #10b981; color: #2dd4a8; }
.pill.teal  { border-color: #2a9d8f; color: #4cc4b3; }

.footer {
    position: absolute;
    bottom: 50px;
    left: 80px;
    right: 80px;
    display: flex;
    justify-content: space-between;
    font-family: 'RetroByte', sans-serif;
    font-size: 2.1rem;
    color: #b8ad96;
    letter-spacing: 0.06em;
    text-transform: uppercase;
}
</style>
</head>
<body>
<div class="content">
    <div class="logo-row">
        <img class="logo-img" src="data:image/png;base64,${logoImg}">
        <div class="wordmark">Wonderwall<span class="ww-a">A</span><span class="ww-i">i</span></div>
    </div>
    <div class="tagline">Stop Prompt Injection. Protect Your LLM.</div>
    <div class="desc">Open-source AI firewall SDK. Catches 90% of threats locally in under 2ms. Zero API calls on the fast path.</div>
    <div class="pills">
        <div class="pill">Prompt Injection</div>
        <div class="pill">PII Filtering</div>
        <div class="pill">Canary Tokens</div>
        <div class="pill green">MIT Licensed</div>
        <div class="pill teal">pip install wonderwallai</div>
    </div>
</div>
<div class="footer">
    <span>A Skint Labs Product</span>
    <span>wonderwallai.skintlabs.ai</span>
</div>
</body>
</html>`;

(async () => {
    const browser = await puppeteer.launch({ headless: 'new' });
    const page = await browser.newPage();
    await page.setViewport({ width: 2400, height: 1260 });
    await page.setContent(html, { waitUntil: 'networkidle0' });
    await page.screenshot({ path: path.join(__dirname, 'og-image.png'), type: 'png' });
    await browser.close();
    console.log('OG image generated.');
})();
