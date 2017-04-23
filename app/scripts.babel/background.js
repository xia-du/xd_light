'use strict';

var domain = 'http://xiadu.me';

var maker1 = 'https://maker.ifttt.com/trigger/',
    maker2 = '/with/key/ctV1AfljhPjHGwnnnr5XCM';

var pagesArray = [
  {
    name: 'xdwp_home',
    path: '/'
  }, {
    name: 'xdwp_work',
    path: '/work/'
  }, {
    name: 'xdwp_about',
    path: '/about/'
  }, {
    name: 'xdwp_contact',
    path: '/contact/'
  }, {
    name: 'xdwp_amazon',
    path: '/portfolio/amazon/'
  }, {
    name: 'xdwp_brillo',
    path: '/portfolio/brillo/'
  }, {
    name: 'xdwp_pandora',
    path: '/portfolio/pandora/'
  }, {
    name: 'xdwp_uniqlo',
    path: '/portfolio/uniqlo/'
  }
];

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open('GET', theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}

var lighting = function() {
  chrome
    .tabs
    .query({
      currentWindow: true,
      active: true
    }, function(tabs) {
      var url = tabs[0].url;
      var action = '';

      console.log(pagesArray[0].path);

      if (url.search(domain) !== -1) {
        for (var i = 0; i < pagesArray.length; i++) {
          if (url === domain + pagesArray[i].path) {
            console.log(url + ' | ' + pagesArray[i].path);
            action = pagesArray[i].name;
          }
        }
      } else {
        action = 'xdwp_off';
      }

      var theUrl = maker1 + action + maker2;
      var callback = function(data) {
        console.log(data);
      };

      httpGetAsync(theUrl, callback);

    });
};

chrome
  .runtime
  .onInstalled
  .addListener(details => {
    // console.log('previousVersion', details.previousVersion);
  });

chrome
  .tabs
  .onUpdated
  .addListener(tabId => {
    chrome
      .pageAction
      .show(tabId);
  });

chrome
  .tabs
  .onActivated
  .addListener(function() {
    lighting();
  });

chrome
  .tabs
  .onUpdated
  .addListener(function() {
    lighting();
  });

// console.log('\'Allo \'Allo! Event Page for Page Action');
