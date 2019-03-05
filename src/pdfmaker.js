const phantom = require('phantom');

const formatDate = function (date) {
    // const hours = date.getHours();
    // let minutes = date.getMinutes();
    // const secondes = date.getSeconds();
    // minutes = minutes < 10 ? '0' + minutes : minutes;
    // const strTime = hours + ':' + minutes + ':' + secondes;

    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();

    return date.getFullYear() + "-" + month + "-" + day; // + ' ' + strTime;
};

(async function() {
    const instance = await phantom.create();
    const page = await instance.createPage();
    await page.on('onResourceRequested', function(requestData) {
        console.info('Requesting', requestData.url);
    });

    // const status = await page.open('https://ingin.fr');
    const status = await page.open('http://localhost:8082');
    // const content = await page.property('content');
    console.log('status', status);

    await page.render(`./reports/${formatDate(new Date())}-ingin.pdf`).then(function() {
        console.log('Page Rendered');
    });

    await instance.exit();
})();
