const puppeteer = require('puppeteer');
const credentials = require('./config.json');
const noOfPosts = process.argv[2];

(async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com/', { waitUntil: "networkidle2" }); // to wait till fornt-end loads (standard)
    // brackets at correct places are very important

    // inspection ka khel hai
    await page.type("input[name='username']", credentials.user, { delay: 100 }); // can see credentials being typed using delay
    await page.type("input[name='password']", credentials.pwd, { delay: 100 });
    await page.click("button[type='submit']");

    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("button[type='submit']"),
    ]);

    // sign is done
    await page.type("input[placeholder='Search']", "pepper_pepcoding");
    await page.waitForSelector(".drKGC .fuqBx a", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click(".drKGC .fuqBx a"),
    ]);
    // reached desired instagram page

    await page.waitForSelector("._9AhH0", { visible: true });
    await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle2" }),
        page.click("._9AhH0"),
    ]);
    // reached the post

    let i = 0;
    do {
        await page.waitForSelector(".fr66n button");
        page.click(".fr66n button");
        await Promise.all([
            page.waitForNavigation({ waitUntil: "networkidle2" }),
            page.click("._65Bje.coreSpriteRightPaginationArrow"),
        ]);
        i++;
    }while(i < noOfPosts){ }
    // liked all posts till noOfPosts
    // liked the posts by clicking the like button

    /*
    TODO: 
    A bug -> it likes the post for which the page loads but doesn't like the other posts
    so How to wait till it likes the ith post and then moves to the next post 
    */
})();