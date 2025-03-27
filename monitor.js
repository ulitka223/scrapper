const puppeteer = require('puppeteer');
const TELEGRAM_BOT_TOKEN = require('./token.json');
let subscribers = require('./subscribers.json');

const exception = "https://www.sreality.cz/hledani/pronajem/komercni/obchodni-prostory?cena-do=250&plocha-od=700&za-m2=1";

const urls = [
    // "https://www.sreality.cz/hledani/pronajem/komercni/obchodni-prostory?cena-do=250&plocha-od=700&za-m2=1",
    "https://www.maxirealitypraha.cz/pronajem/komercni-prostory/nejnovejsi/",
    "https://reality.idnes.cz/s/pronajem/komercni-nemovitosti/?s-qc%5BsubtypeCommercial%5D%5B0%5D=commercial-area&s-qc%5BsubtypeCommercial%5D%5B1%5D=storerooms&s-qc%5BsubtypeCommercial%5D%5B2%5D=restaurant&s-qc%5BsubtypeCommercial%5D%5B3%5D=other&s-qc%5BusableAreaMin%5D=700&s-qc%5BusableAreaMax%5D=2000",
	//"https://realitymix.cz/vypis-nabidek/?form%5Badresa_obec_id%5D=&form%5Badresa_stat%5D=CZ&form%5Bcena_mena%5D=&form%5Bcena_normalizovana__from%5D=&form%5Bcena_normalizovana__to%5D=&form%5Bexclusive%5D=&form%5Bfk_rk%5D=&form%5Binzerat_typ%5D=2&form%5Bkomercni_nemovitosti%5D[]=3&form%5Bkomercni_nemovitosti%5D[]=4&form%5Bnemovitost_typ%5D[]=m_9_1&form%5Bplocha__from%5D=690&form%5Bplocha__to%5D=&form%5Bpodlazi_cislo__from%5D=&form%5Bpodlazi_cislo__to%5D=&form%5Bprojekt_id%5D=&form%5Bsearch_in_city%5D=&form%5Bsearch_in_text%5D=&form%5Bstari_inzeratu%5D=&form%5Bstav_objektu%5D=&form%5Btop_nabidky%5D=",
	"https://realitymix.cz/vypis-nabidek/?form%5Badresa_obec_id%5D=&form%5Badresa_stat%5D=CZ&form%5Bcena_mena%5D=&form%5Bcena_normalizovana__from%5D=&form%5Bcena_normalizovana__to%5D=30000000&form%5Bexclusive%5D=&form%5Bfk_rk%5D=&form%5Binzerat_typ%5D=0&form%5Bkomercni_nemovitosti%5D[]=2&form%5Bkomercni_nemovitosti%5D[]=3&form%5Bkomercni_nemovitosti%5D[]=4&form%5Bnemovitost_typ%5D[]=m_9_1&form%5Bplocha__from%5D=700&form%5Bplocha__to%5D=2000&form%5Bpodlazi_cislo__from%5D=&form%5Bpodlazi_cislo__to%5D=&form%5Bprojekt_id%5D=&form%5Bsearch_in_city%5D=&form%5Bsearch_in_text%5D=&form%5Bstari_inzeratu%5D=&form%5Bstav_objektu%5D=&form%5Btop_nabidky%5D=",
	"https://www.domybytypozemky.cz/pronajem-komercni/?a=700-#google_vignette",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/stredocesky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/hlavni-mesto-praha/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/jihocesky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/plzensky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/karlovarsky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/ustecky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/liberecky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/kralovehradecky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/pardubicky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/kraj-vysocina/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/jihomoravsky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/olomoucky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/zlinsky-kraj/?plocha_od=700&plocha_do=2000",
	"https://realhit.cz/pronajem/sklady,vyroba,obchodni-prostory,restaurace/moravskoslezsky-kraj/?plocha_od=700&plocha_do=2000",
	"https://jiho.ceskereality.cz/pronajem/komercni-prostory/nejnovejsi/?vymera_od=700",
	"https://vychodo.ceskereality.cz/pronajem/komercni-prostory/nejnovejsi/?vymera_od=700",
	"https://www.realitypro.eu/pronajem/komercni/obchodni-prostory?a%5Bfua%5D=700",
	"https://www.slunecnireality.cz/komercni",
	"https://www.archa-rk.cz/search-form/",
	"https://www.rksting.cz/komercni-nemovitosti/?t%5B%5D=1&t%5B%5D=2&t%5B%5D=3&sc%5B%5D=2&sc%5B%5D=4&sc%5B%5D=64&st=D",
	"https://www.contentreality.cz/nabidky?typnemovitosti=1%2C2%2C3&velikostod=700&velikostdo=2000",
	"https://www.realcity.cz/pronajem-komercnich-objektu/obchodni-prostory?list-sort=updated-desc&sp=%7B%22transactionTypes%22%3A%5B%22rent%22%5D%2C%22propertyTypes%22%3A%5B%7B%22propertyType%22%3A%22commercial%22%2C%22propertySubTypes%22%3A%5B%22business%22%2C%22factory%22%2C%22warehouse%22%2C%22restaurant%22%5D%2C%22surfaces%22%3A%5B%7B%22from%22%3A%22700%22%2C%22to%22%3A%222000%22%2C%22unit%22%3A%22web%22%7D%5D%7D%5D%2C%22price%22%3A%7B%22to%22%3A%22300%22%2C%22unit%22%3A%22pu_msquarem%22%7D%7D"
];

const CSS_MAP = {
    "sreality.cz": "a.MuiTypography-root.MuiLink-root",
    "maxirealitypraha.cz": "div.estateContent a[href]",
    "reality.idnes.cz": "a.c-products__link",
    "realitymix.cz": "div.mb-3 a.flex.text-secondary",
	"domybytypozemky.cz": "div.estate_summary_text h2 a",
	"realhit.cz": "div.list a.property-box",
	"jiho.ceskereality.cz": "div.i-estate__content a.i-estate__title-link",
	"vychodo.ceskereality.cz": "div.i-estate__content a.i-estate__title-link",
	"realitypro.eu": "div.d-flex.flex-column a.stretched-link",
	"slunecnireality.cz": "div.items a.overlay-click",
	"archa-rk.cz": "div.list-items__item__content a.js-simulate-link-target",
	"rksting.cz": "div.result-row > a",
	"contentreality.cz": "div.dvetretiny.flex-start.mb-10.vrseknabidky a.velkytitulek.mb-10.w100.loading-text.animovany",
	"realcity.cz": "div.title > a"
};

// async function sendTelegramMessage(message) {
// 	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
	
// 	try {
// 	  const response = await fetch(url, {
// 		method: "POST",
// 		headers: { "Content-Type": "application/json" },
// 		body: JSON.stringify({
// 		  chat_id: CHAT_ID,
// 		  text: message
// 		})
// 	  });
  
// 	  const data = await response.json();
// 	//   console.log("Telegram response:", data);
  
// 	  if (!response.ok) {
// 		throw new Error(data.description || "Failed to send message");
// 	  }
// 	} catch (error) {
// 	  console.error("Error sending Telegram message:", error.message);
// 	}
// }

async function sendTelegramMessage(chatId, message) {
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN.TELEGRAM_BOT_TOKEN}/sendMessage`;
	
	try {
	  const response = await fetch(url, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ chat_id: chatId, text: message }),
	  });
  
	  if (!response.ok) {
		const data = await response.json();
		throw new Error(data.description || "Failed to send message");
	  }
	} catch (error) {
	  console.error("Error sending Telegram message:", error.message);
	}
  }
  
async function broadcastMessage(message) {
	for (const chatId of subscribers) {
	  await sendTelegramMessage(chatId, message);
	}
  }

async function setWebhook() {
	const webhookUrl = 'https://1239-82-100-47-194.ngrok-free.app/telegram-webhook';
	const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN.TELEGRAM_BOT_TOKEN}/setWebhook?url=${webhookUrl}`;
  
	const response = await fetch(url);
	const data = await response.json();
	console.log("Webhook set:", data);
  }
  
  setWebhook();

async function getLatestPost(page, url) {
	try {
        await page.goto(url, { waitUntil: 'networkidle2' });
		if (url === "https://www.sreality.cz/hledani/pronajem/komercni/obchodni-prostory?cena-do=250&plocha-od=700&za-m2=1")
		{
			const shadowHostSelector = '.szn-cmp-dialog-container';
			try
			{	await page.waitForSelector(shadowHostSelector, { timeout: 10000 });

				const shadowHost = await page.$(shadowHostSelector);
				const shadowRoot = await shadowHost.evaluateHandle(el => el.shadowRoot);

				const buttonSelector = '[data-testid="cw-button-agree-with-ads"]';
				const agreeButton = await shadowRoot.$(buttonSelector);

				if (agreeButton) {
					await agreeButton.click();
					console.log('✅ Successfully clicked the ads agreement button.');
					} else {
				console.log('⚠️ Button not found in shadow DOM.');}
			}
			catch(error)
			{
				console.log("\x1b[35m The button was already clocked, proceeding\x1b[0m");
			}
		}
        const cssSelector = Object.entries(CSS_MAP).find(([key]) => url.includes(key))?.[1];
        if (!cssSelector) {
            console.log(`❌ No matching CSS selector for ${url}`);
            return null;
        }

        await page.waitForSelector(cssSelector, { timeout: 100000 });
        const element = await page.$(cssSelector);    
        const href = await page.evaluate(el => el.href, element);

        console.log(`✅ Latest post found on \x1b[34m${url}\x1b[0m:`);
        console.log(`   Link: \x1b[34m${href}\x1b[0m`);
        return { href };

    } catch (error) {
        console.log(`❌ Error fetching latest post from \x1b[34m${url}\x1b[0m: ${error}`);
        return null;
    }
}

async function monitorPage(page, url) {
    console.log(`🔍 Monitoring \x1b[34m${url}\x1b[0m...`);
    let previousPost = await getLatestPost(page, url);

    while (true) {
        await new Promise(resolve => setTimeout(resolve, 10000));
        const currentPost = await getLatestPost(page, url);
        if (currentPost && previousPost && currentPost.href !== previousPost.href) {
            console.log(`🚨 New post detected on \x1b[34m${url}\x1b[0m!`);
            console.log(`📌 New Post: ${JSON.stringify(currentPost)}, and link is \x1b[34m${currentPost.href}\x1b[0m`);
			broadcastMessage(`Привет, вot ссылка: ${currentPost.href}`);
			previousPost = currentPost;
        } else {
            console.log(`⏳ No new post on \x1b[34m${url}\x1b[0m. Checking again...`);
        }
   }
}

async function main() {
    const browser = await puppeteer.launch({ headless: true });
	const specialBrowser = await puppeteer.launch({ headless: false});
	const pages = await Promise.all(urls.map(() => browser.newPage()));
	const special = (await specialBrowser.newPage());
	// await special.goto(exception);
	const allPages = [...pages, special];
	const allUrls = [... urls, exception];

    try {
        await Promise.all(allPages.map((page, index) => monitorPage(page, allUrls[index])));
    } catch (error) {
        console.error(`❌ Error: ${error}`);
    } finally {
        await browser.close();
    }
}

// async function checkUrl(page, url) {
//     const currentPost = await getLatestPost(page, url);
//     if (currentPost) {
//         // Compare with previousPost (store this in a persistent way, e.g., a file/database)
//         console.log(`Checked ${url}: ${currentPost.href}`);
//     }
//     return currentPost;
// }

// async function main() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const delayBetweenUrls = 5000; // 5 seconds between URLs
//     const delayBetweenCycles = 30000; // 30 seconds between full cycles

//     try {
//         while (true) { // Outer loop for continuous monitoring
//             for (const url of urls) {
//                 await checkUrl(page, url);
//                 await new Promise(resolve => setTimeout(resolve, delayBetweenUrls));
//             }
//             // Wait before restarting the cycle
//             await new Promise(resolve => setTimeout(resolve, delayBetweenCycles));
//         }
//     } finally {
//         await browser.close();
//     }
// }

main();
