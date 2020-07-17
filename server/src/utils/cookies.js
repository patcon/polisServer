const _ = require('underscore');
const PolisUser = require('../user');
const Session = require('../session');

const COOKIES = {
  COOKIE_TEST: 'ct',
  HAS_EMAIL: 'e',
  TOKEN: 'token2',
  UID: 'uid2',
  REFERRER: 'ref',
  PARENT_REFERRER: 'referrer',
  PARENT_URL: 'parent_url',
  USER_CREATED_TIMESTAMP: 'uc',
  PERMANENT_COOKIE: 'pc',
  TRY_COOKIE: 'tryCookie',
  PLAN_NUMBER: 'plan', // not set if trial user
};

const COOKIES_TO_CLEAR = {
  e: true,
  token2: true,
  uid2: true,
  uc: true,
  plan: true,
  referrer: true,
  parent_url: true,
};

const oneYear = 1000 * 60 * 60 * 24 * 365;

function setCookie(req, res, name, value, options) {
  let o = _.clone(options || {});
  o.path = _.isUndefined(o.path) ? '/' : o.path;
  o.maxAge = _.isUndefined(o.maxAge) ? oneYear : o.maxAge;
  res.cookie(name, value, o);
}

function setParentReferrerCookie(req, res, referrer) {
  setCookie(req, res, COOKIES.PARENT_REFERRER, referrer, {
    httpOnly: true,
  });
}

function setParentUrlCookie(req, res, parent_url) {
  setCookie(req, res, COOKIES.PARENT_URL, parent_url, {
    httpOnly: true,
  });
}

function setPlanCookie(req, res, planNumber) {
  if (planNumber > 0) {
    setCookie(req, res, COOKIES.PLAN_NUMBER, planNumber, {
      // not httpOnly - needed by JS
    });
  }
  // else falsy

}

function setHasEmailCookie(req, res, email) {
  if (email) {
    setCookie(req, res, COOKIES.HAS_EMAIL, 1, {
      // not httpOnly - needed by JS
    });
  }
  // else falsy
}

function setUserCreatedTimestampCookie(req, res, timestamp) {
  setCookie(req, res, COOKIES.USER_CREATED_TIMESTAMP, timestamp, {
    // not httpOnly - needed by JS
  });
}

function setTokenCookie(req, res, token) {
  setCookie(req, res, COOKIES.TOKEN, token, {
    httpOnly: true,
  });
}

function setUidCookie(req, res, uid) {
  setCookie(req, res, COOKIES.UID, uid, {
    // not httpOnly - needed by JS
  });
}

function setPermanentCookie(req, res, token) {
  setCookie(req, res, COOKIES.PERMANENT_COOKIE, token, {
    httpOnly: true,
  });
}

function setCookieTestCookie(req, res) {
  setCookie(req, res, COOKIES.COOKIE_TEST, 1, {
    // not httpOnly - needed by JS
  });
}

function addCookies(req, res, token, uid) {
  return PolisUser.getUserInfoForUid2(uid).then(function(o) {
    let email = o.email;
    let created = o.created;
    let plan = o.plan;

    setTokenCookie(req, res, token);
    setUidCookie(req, res, uid);
    setPlanCookie(req, res, plan);
    setHasEmailCookie(req, res, email);
    setUserCreatedTimestampCookie(req, res, created);
    if (!req.cookies[COOKIES.PERMANENT_COOKIE]) {
      setPermanentCookie(req, res, Session.makeSessionToken());
    }
    res.header("x-polis", token);
  });
}

function getPermanentCookieAndEnsureItIsSet(req, res) {
  if (!req.cookies[COOKIES.PERMANENT_COOKIE]) {
    let token = Session.makeSessionToken();
    setPermanentCookie(req, res, token);
    return token;
  } else {
    return req.cookies[COOKIES.PERMANENT_COOKIE];
  }
}

module.exports = {
  COOKIES,
  COOKIES_TO_CLEAR,
  setCookie,
  setParentReferrerCookie,
  setParentUrlCookie,
  setPlanCookie,
  setPermanentCookie,
  setCookieTestCookie,
  addCookies,
  getPermanentCookieAndEnsureItIsSet
};