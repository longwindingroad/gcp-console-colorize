function getCurrentProjectId() {
  var queryString = window.location.search.substring(1);
  var queries = queryString.split('&');

  var projectId = null;
  queries.forEach(function (query) {
    var keyAndValue = query.split('=');
    if (keyAndValue[0] === 'project') {
      projectId = keyAndValue[1];
    }
  });

  return projectId;
}

function getCurrentHeader() {
  return document.querySelector('[md-theme=platform-bar]') || document.querySelector('.cfc-platform-bar-blue') || document.querySelector('.cfc-platform-bar-white.gm2-platform-bar') || document.querySelector('.cfc-platform-bar-container');
}

function getLeftHeader() {
  return document.querySelector('.cfc-platform-bar-left');
}

function getRightHeader() {
  return document.querySelector('.cfc-platform-bar-right');
}

function getCurrentLogo() {
  return document.querySelector('img[alt="Console Logo"]');
}

function getSearchBar() {
  return document.querySelector('.pcc-search-bar-container');
}

function getProjectSwitcher() {
  return document.querySelector('button.cfc-switcher-button.cm-button.gm2-switcher-button');
}

function changeHeaderColor() {
  var defaultSetting = {
    conditions: []
  };
  chrome.storage.sync.get(defaultSetting, function (setting) {
    var header = getCurrentHeader();
    header.style.backgroundColor = 'rgb(66, 133, 244)';

    var logo = getCurrentLogo();
    logo.src = chrome.runtime.getURL('icon/google-cloud-brand.svg');

    var headerIcons = header.querySelectorAll('svg');
    headerIcons.forEach(function (icon) {
      icon.style.fill = 'white';
      icon.style.color = 'white';
    });

    // var leftHeader = getLeftHeader();
    // var leftIcons = leftHeader.querySelectorAll('svg');
    // leftIcons.forEach(function (icon) {
    //   icon.style.fill = 'white';
    //   icon.style.color = 'white';
    // });

    // var rightHeader = getRightHeader();
    // var rightIcons = rightHeader.querySelectorAll('svg');
    // rightIcons.forEach(function (icon) {
    //   icon.style.fill = 'white';
    //   icon.style.color = 'white';
    // });
    // var rightCMIcons = rightHeader.querySelectorAll('cm-icon svg');
    // rightCMIcons.forEach(function (icon) {
    //   icon.style.fill = 'white';
    //   icon.style.color = 'white';
    // });

    var searchBar = getSearchBar();
    searchBar.style.backgroundColor = 'white';
    searchBar.style.borderRadius = '3px';

    var projectSwitcher = getProjectSwitcher();
    var projectSwitcherIcons = projectSwitcher.querySelectorAll('cm-icon svg');
    projectSwitcherIcons.forEach(function (icon) {
      icon.style.fill = 'white';
      icon.style.color = 'white';
    });
    projectSwitcher.querySelectorAll('span.cfc-switcher-button-label').forEach(function (span) {
      span.style.color = 'white';
    });
    projectSwitcher.style.border = 'none';


    var header = getCurrentHeader();
    if (!header) {
      console.error("can't get valid header");
      return;
    }

    var projectId = getCurrentProjectId();
    if (!projectId) {
      console.error("can't get projectId");
      return;
    }

    var conditions = setting.conditions;
    for (var i = 0; i < conditions.length; i++) {
      var condition = conditions[i];
      if (projectId.match(condition.pattern)) {
        var colorRgb = 'rgb(' + condition.color.r + ', '
          + condition.color.g + ', '
          + condition.color.b + ')';
        header.style.backgroundColor = colorRgb;
        return;
      }
    }

    // No patterns matched, so back to original color
    header.style.backgroundColor = 'rgb(66, 133, 244)';
  });
}

(function () {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    changeHeaderColor();
  });
  changeHeaderColor();
}());
