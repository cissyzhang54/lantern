var homeUrl = 'https://ft-editorial-lantern.herokuapp.com/';

var requiredUrl = 'https://ft-editorial-lantern.herokuapp.com/';
var requiredTitle = 'Lantern - Search';

module.exports = {

    'Initiate Test': function (browser) {
        console.log("===================================\n" +
            ">> Starting safari-launch.js\n" +
            "===================================");
        browser
            .url(homeUrl)
            .waitForElementVisible('#react-app h2', 6000);

        browser
            .assert.urlEquals(requiredUrl)
            .assert.title(requiredTitle);
    },

    'Check All Elements' : function (browser) {
        browser
            .click('a[href="/articles"]')
            .click('a[href="/articles/1234"]')
    },

    after : function(browser) {
        browser.end();
        console.log("===================================\n" +
            ">> Ending safari-launch.js\n" +
            "===================================")
    }
};
