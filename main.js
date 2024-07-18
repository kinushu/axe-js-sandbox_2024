const puppeteer = require('puppeteer');
const fs = require('fs');
const { AxePuppeteer } = require('@axe-core/puppeteer');

(async () => {
    // ブラウザを起動
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const url = process.env.TGT_URL;
    // 特定のWebサイトを開く
    await page.goto(url);

    // axe-coreをインジェクトしてアクセシビリティ検査を実行
    const results = await new AxePuppeteer(page).analyze();

    // 検査結果をファイルに保存
    fs.writeFileSync('accessibility-report.json', JSON.stringify(results, null, 2));

    // ブラウザを閉じる
    await browser.close();

    console.log('アクセシビリティ検査が完了しました。結果はaccessibility-report.jsonに保存されました。');
})();
