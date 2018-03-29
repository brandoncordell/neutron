/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/packs/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/*!***********************************************!*\
  !*** ./node_modules/bunnyjs/src/file/file.js ***!
  \***********************************************/
/*! exports provided: BunnyFile */
/*! exports used: BunnyFile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const BunnyFile = {

    /**
     * Download file from URL via AJAX and make Blob object or return base64 string if 2nd argument is false
     * Only files from CORS-enabled domains can be downloaded or AJAX will get security error
     *
     * @param {String} URL
     * @param {Boolean} convert_to_blob = true
     * @returns {Promise}: success(Blob object | base64 string), fail(response XHR object)
     */
    download(URL, convert_to_blob = true) {
        var request = new XMLHttpRequest();
        const p = new Promise( (success, fail) => {
            request.onload = () => {
                if (request.status === 200) {
                    const blob = request.response;
                    success(blob);
                } else {
                    fail(request);
                }
            };
        });

        request.open('GET', URL, true);
        if (convert_to_blob) {
            request.responseType = 'blob';
        }
        request.send();

        return p;
    },

    /**
     * Get File/Blob header (signature) to parse for MIME-type or any magic numbers
     * @param {File|Blob} blob
     * @returns {Promise} callback(str:signature)
     */
    getSignature(blob) {
        return new Promise(callback => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const arr = (new Uint8Array(reader.result)).subarray(0, 4);
                let signature = '';
                for (let i = 0; i < arr.length; i++) {
                    signature += arr[i].toString(16);
                }
                callback(signature);
            };
            reader.readAsArrayBuffer(blob);
        });
    },

    /**
     * Check if string is a valid signature for image/jpeg
     * @param {String} signature
     * @returns {boolean}
     */
    isJpeg(signature) {
        const signatures = ['ffd8ffe0', 'ffd8ffe1', 'ffd8ffe2'];
        return signatures.indexOf(signature) > -1;
    },

    /**
     * Check if string is a valid signature for image/png
     * @param {String} signature
     * @returns {boolean}
     */
    isPng(signature) {
        return signature === '89504e47';
    },

    /**
     * Convert base64 string to Blob object
     * @param {String} base64
     * @returns {Blob}
     */
    base64ToBlob(base64) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(base64.split(',')[1]);

        // separate out the mime component
        var mimeString = base64.split(',')[0].split(':')[1].split(';')[0];

        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }

        // write the ArrayBuffer to a blob, and you're done
        return new Blob([ab], {type: mimeString});
    },

    /**
     * Convert Blob object to base64string
     * @param {Blob} blob
     * @returns {Promise} success(base64 string), fail(error)
     */
    blobToBase64(blob) {
        const reader = new FileReader;
        const p = new Promise( (success, fail) => {
            reader.onloadend = () => {
                let base64 = reader.result;
                success(base64);
            };
            reader.onerror = (e) => {
                fail(e);
            }
        });

        reader.readAsDataURL(blob);

        return p;
    },

    /**
     * Get local browser object URL which can be used in img.src for example
     * @param {Blob} blob
     * @returns {String}
     */
    getBlobLocalURL(blob) {
        if (!(blob instanceof Blob || blob instanceof File)) {
            throw new TypeError('Argument in BunnyFile.getBlobLocalURL() is not a Blob or File object');
        }
        return URL.createObjectURL(blob);
    }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = BunnyFile;



/***/ }),
/* 2 */,
/* 3 */
/*!*********************************************!*\
  !*** ./app/javascript/packs/application.js ***!
  \*********************************************/
/*! no exports provided */
/*! all exports used */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rails_ujs__ = __webpack_require__(/*! rails-ujs */ 4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_rails_ujs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_rails_ujs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_turbolinks__ = __webpack_require__(/*! turbolinks */ 5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_turbolinks___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_turbolinks__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_application_css__ = __webpack_require__(/*! ../css/application.css */ 7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__css_application_css___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__css_application_css__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__sessions_new__ = __webpack_require__(/*! ../sessions/new */ 8);
/* eslint no-console:0 */
// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.
//
// To reference this file, add <%= javascript_pack_tag 'application' %> to the appropriate
// layout file, like app/views/layouts/application.html.erb




__WEBPACK_IMPORTED_MODULE_0_rails_ujs___default.a.start();
__WEBPACK_IMPORTED_MODULE_1_turbolinks___default.a.start();





/***/ }),
/* 4 */
/*!*****************************************************************!*\
  !*** ./node_modules/rails-ujs/lib/assets/compiled/rails-ujs.js ***!
  \*****************************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Unobtrusive JavaScript
https://github.com/rails/rails/blob/master/actionview/app/assets/javascripts
Released under the MIT license
 */

(function() {
  var context = this;

  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(context);

  var Rails = context.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (!(typeof options.beforeSend === "function" ? options.beforeSend(xhr, options) : void 0)) {
          return false;
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        }
      };

      prepareOptions = function(options) {
        options.url = options.url || location.href;
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (error) {}
          } else if (type.match(/\b(?:java|ecma)script\b/)) {
            script = document.createElement('script');
            script.text = response;
            document.head.appendChild(script).parentNode.removeChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (error) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name || input.disabled) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (error) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.handleDisabledElement = function(e) {
        var element;
        element = this;
        if (element.disabled) {
          return stopEverything(e);
        }
      };

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return false;
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && (jQuery.ajax != null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleDisabledElement);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleDisabledElement);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleDisabledElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (true) {
    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (Rails),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  }
}).call(this);


/***/ }),
/* 5 */
/*!****************************************************!*\
  !*** ./node_modules/turbolinks/dist/turbolinks.js ***!
  \****************************************************/
/*! dynamic exports provided */
/*! exports used: default */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*
Turbolinks 5.1.1
Copyright © 2018 Basecamp, LLC
 */
(function(){var t=this;(function(){(function(){this.Turbolinks={supported:function(){return null!=window.history.pushState&&null!=window.requestAnimationFrame&&null!=window.addEventListener}(),visit:function(t,r){return e.controller.visit(t,r)},clearCache:function(){return e.controller.clearCache()},setProgressBarDelay:function(t){return e.controller.setProgressBarDelay(t)}}}).call(this)}).call(t);var e=t.Turbolinks;(function(){(function(){var t,r,n,o=[].slice;e.copyObject=function(t){var e,r,n;r={};for(e in t)n=t[e],r[e]=n;return r},e.closest=function(e,r){return t.call(e,r)},t=function(){var t,e;return t=document.documentElement,null!=(e=t.closest)?e:function(t){var e;for(e=this;e;){if(e.nodeType===Node.ELEMENT_NODE&&r.call(e,t))return e;e=e.parentNode}}}(),e.defer=function(t){return setTimeout(t,1)},e.throttle=function(t){var e;return e=null,function(){var r;return r=1<=arguments.length?o.call(arguments,0):[],null!=e?e:e=requestAnimationFrame(function(n){return function(){return e=null,t.apply(n,r)}}(this))}},e.dispatch=function(t,e){var r,o,i,s,a,u;return a=null!=e?e:{},u=a.target,r=a.cancelable,o=a.data,i=document.createEvent("Events"),i.initEvent(t,!0,r===!0),i.data=null!=o?o:{},i.cancelable&&!n&&(s=i.preventDefault,i.preventDefault=function(){return this.defaultPrevented||Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s.call(this)}),(null!=u?u:document).dispatchEvent(i),i},n=function(){var t;return t=document.createEvent("Events"),t.initEvent("test",!0,!0),t.preventDefault(),t.defaultPrevented}(),e.match=function(t,e){return r.call(t,e)},r=function(){var t,e,r,n;return t=document.documentElement,null!=(e=null!=(r=null!=(n=t.matchesSelector)?n:t.webkitMatchesSelector)?r:t.msMatchesSelector)?e:t.mozMatchesSelector}(),e.uuid=function(){var t,e,r;for(r="",t=e=1;36>=e;t=++e)r+=9===t||14===t||19===t||24===t?"-":15===t?"4":20===t?(Math.floor(4*Math.random())+8).toString(16):Math.floor(15*Math.random()).toString(16);return r}}).call(this),function(){e.Location=function(){function t(t){var e,r;null==t&&(t=""),r=document.createElement("a"),r.href=t.toString(),this.absoluteURL=r.href,e=r.hash.length,2>e?this.requestURL=this.absoluteURL:(this.requestURL=this.absoluteURL.slice(0,-e),this.anchor=r.hash.slice(1))}var e,r,n,o;return t.wrap=function(t){return t instanceof this?t:new this(t)},t.prototype.getOrigin=function(){return this.absoluteURL.split("/",3).join("/")},t.prototype.getPath=function(){var t,e;return null!=(t=null!=(e=this.requestURL.match(/\/\/[^\/]*(\/[^?;]*)/))?e[1]:void 0)?t:"/"},t.prototype.getPathComponents=function(){return this.getPath().split("/").slice(1)},t.prototype.getLastPathComponent=function(){return this.getPathComponents().slice(-1)[0]},t.prototype.getExtension=function(){var t,e;return null!=(t=null!=(e=this.getLastPathComponent().match(/\.[^.]*$/))?e[0]:void 0)?t:""},t.prototype.isHTML=function(){return this.getExtension().match(/^(?:|\.(?:htm|html|xhtml))$/)},t.prototype.isPrefixedBy=function(t){var e;return e=r(t),this.isEqualTo(t)||o(this.absoluteURL,e)},t.prototype.isEqualTo=function(t){return this.absoluteURL===(null!=t?t.absoluteURL:void 0)},t.prototype.toCacheKey=function(){return this.requestURL},t.prototype.toJSON=function(){return this.absoluteURL},t.prototype.toString=function(){return this.absoluteURL},t.prototype.valueOf=function(){return this.absoluteURL},r=function(t){return e(t.getOrigin()+t.getPath())},e=function(t){return n(t,"/")?t:t+"/"},o=function(t,e){return t.slice(0,e.length)===e},n=function(t,e){return t.slice(-e.length)===e},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.HttpRequest=function(){function r(r,n,o){this.delegate=r,this.requestCanceled=t(this.requestCanceled,this),this.requestTimedOut=t(this.requestTimedOut,this),this.requestFailed=t(this.requestFailed,this),this.requestLoaded=t(this.requestLoaded,this),this.requestProgressed=t(this.requestProgressed,this),this.url=e.Location.wrap(n).requestURL,this.referrer=e.Location.wrap(o).absoluteURL,this.createXHR()}return r.NETWORK_FAILURE=0,r.TIMEOUT_FAILURE=-1,r.timeout=60,r.prototype.send=function(){var t;return this.xhr&&!this.sent?(this.notifyApplicationBeforeRequestStart(),this.setProgress(0),this.xhr.send(),this.sent=!0,"function"==typeof(t=this.delegate).requestStarted?t.requestStarted():void 0):void 0},r.prototype.cancel=function(){return this.xhr&&this.sent?this.xhr.abort():void 0},r.prototype.requestProgressed=function(t){return t.lengthComputable?this.setProgress(t.loaded/t.total):void 0},r.prototype.requestLoaded=function(){return this.endRequest(function(t){return function(){var e;return 200<=(e=t.xhr.status)&&300>e?t.delegate.requestCompletedWithResponse(t.xhr.responseText,t.xhr.getResponseHeader("Turbolinks-Location")):(t.failed=!0,t.delegate.requestFailedWithStatusCode(t.xhr.status,t.xhr.responseText))}}(this))},r.prototype.requestFailed=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.NETWORK_FAILURE)}}(this))},r.prototype.requestTimedOut=function(){return this.endRequest(function(t){return function(){return t.failed=!0,t.delegate.requestFailedWithStatusCode(t.constructor.TIMEOUT_FAILURE)}}(this))},r.prototype.requestCanceled=function(){return this.endRequest()},r.prototype.notifyApplicationBeforeRequestStart=function(){return e.dispatch("turbolinks:request-start",{data:{url:this.url,xhr:this.xhr}})},r.prototype.notifyApplicationAfterRequestEnd=function(){return e.dispatch("turbolinks:request-end",{data:{url:this.url,xhr:this.xhr}})},r.prototype.createXHR=function(){return this.xhr=new XMLHttpRequest,this.xhr.open("GET",this.url,!0),this.xhr.timeout=1e3*this.constructor.timeout,this.xhr.setRequestHeader("Accept","text/html, application/xhtml+xml"),this.xhr.setRequestHeader("Turbolinks-Referrer",this.referrer),this.xhr.onprogress=this.requestProgressed,this.xhr.onload=this.requestLoaded,this.xhr.onerror=this.requestFailed,this.xhr.ontimeout=this.requestTimedOut,this.xhr.onabort=this.requestCanceled},r.prototype.endRequest=function(t){return this.xhr?(this.notifyApplicationAfterRequestEnd(),null!=t&&t.call(this),this.destroy()):void 0},r.prototype.setProgress=function(t){var e;return this.progress=t,"function"==typeof(e=this.delegate).requestProgressed?e.requestProgressed(this.progress):void 0},r.prototype.destroy=function(){var t;return this.setProgress(1),"function"==typeof(t=this.delegate).requestFinished&&t.requestFinished(),this.delegate=null,this.xhr=null},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ProgressBar=function(){function e(){this.trickle=t(this.trickle,this),this.stylesheetElement=this.createStylesheetElement(),this.progressElement=this.createProgressElement()}var r;return r=300,e.defaultCSS=".turbolinks-progress-bar {\n  position: fixed;\n  display: block;\n  top: 0;\n  left: 0;\n  height: 3px;\n  background: #0076ff;\n  z-index: 9999;\n  transition: width "+r+"ms ease-out, opacity "+r/2+"ms "+r/2+"ms ease-in;\n  transform: translate3d(0, 0, 0);\n}",e.prototype.show=function(){return this.visible?void 0:(this.visible=!0,this.installStylesheetElement(),this.installProgressElement(),this.startTrickling())},e.prototype.hide=function(){return this.visible&&!this.hiding?(this.hiding=!0,this.fadeProgressElement(function(t){return function(){return t.uninstallProgressElement(),t.stopTrickling(),t.visible=!1,t.hiding=!1}}(this))):void 0},e.prototype.setValue=function(t){return this.value=t,this.refresh()},e.prototype.installStylesheetElement=function(){return document.head.insertBefore(this.stylesheetElement,document.head.firstChild)},e.prototype.installProgressElement=function(){return this.progressElement.style.width=0,this.progressElement.style.opacity=1,document.documentElement.insertBefore(this.progressElement,document.body),this.refresh()},e.prototype.fadeProgressElement=function(t){return this.progressElement.style.opacity=0,setTimeout(t,1.5*r)},e.prototype.uninstallProgressElement=function(){return this.progressElement.parentNode?document.documentElement.removeChild(this.progressElement):void 0},e.prototype.startTrickling=function(){return null!=this.trickleInterval?this.trickleInterval:this.trickleInterval=setInterval(this.trickle,r)},e.prototype.stopTrickling=function(){return clearInterval(this.trickleInterval),this.trickleInterval=null},e.prototype.trickle=function(){return this.setValue(this.value+Math.random()/100)},e.prototype.refresh=function(){return requestAnimationFrame(function(t){return function(){return t.progressElement.style.width=10+90*t.value+"%"}}(this))},e.prototype.createStylesheetElement=function(){var t;return t=document.createElement("style"),t.type="text/css",t.textContent=this.constructor.defaultCSS,t},e.prototype.createProgressElement=function(){var t;return t=document.createElement("div"),t.className="turbolinks-progress-bar",t},e}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.BrowserAdapter=function(){function r(r){this.controller=r,this.showProgressBar=t(this.showProgressBar,this),this.progressBar=new e.ProgressBar}var n,o,i;return i=e.HttpRequest,n=i.NETWORK_FAILURE,o=i.TIMEOUT_FAILURE,r.prototype.visitProposedToLocationWithAction=function(t,e){return this.controller.startVisitToLocationWithAction(t,e)},r.prototype.visitStarted=function(t){return t.issueRequest(),t.changeHistory(),t.loadCachedSnapshot()},r.prototype.visitRequestStarted=function(t){return this.progressBar.setValue(0),t.hasCachedSnapshot()||"restore"!==t.action?this.showProgressBarAfterDelay():this.showProgressBar()},r.prototype.visitRequestProgressed=function(t){return this.progressBar.setValue(t.progress)},r.prototype.visitRequestCompleted=function(t){return t.loadResponse()},r.prototype.visitRequestFailedWithStatusCode=function(t,e){switch(e){case n:case o:return this.reload();default:return t.loadResponse()}},r.prototype.visitRequestFinished=function(t){return this.hideProgressBar()},r.prototype.visitCompleted=function(t){return t.followRedirect()},r.prototype.pageInvalidated=function(){return this.reload()},r.prototype.showProgressBarAfterDelay=function(){return this.progressBarTimeout=setTimeout(this.showProgressBar,this.controller.progressBarDelay)},r.prototype.showProgressBar=function(){return this.progressBar.show()},r.prototype.hideProgressBar=function(){return this.progressBar.hide(),clearTimeout(this.progressBarTimeout)},r.prototype.reload=function(){return window.location.reload()},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.History=function(){function r(e){this.delegate=e,this.onPageLoad=t(this.onPageLoad,this),this.onPopState=t(this.onPopState,this)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("popstate",this.onPopState,!1),addEventListener("load",this.onPageLoad,!1),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("popstate",this.onPopState,!1),removeEventListener("load",this.onPageLoad,!1),this.started=!1):void 0},r.prototype.push=function(t,r){return t=e.Location.wrap(t),this.update("push",t,r)},r.prototype.replace=function(t,r){return t=e.Location.wrap(t),this.update("replace",t,r)},r.prototype.onPopState=function(t){var r,n,o,i;return this.shouldHandlePopState()&&(i=null!=(n=t.state)?n.turbolinks:void 0)?(r=e.Location.wrap(window.location),o=i.restorationIdentifier,this.delegate.historyPoppedToLocationWithRestorationIdentifier(r,o)):void 0},r.prototype.onPageLoad=function(t){return e.defer(function(t){return function(){return t.pageLoaded=!0}}(this))},r.prototype.shouldHandlePopState=function(){return this.pageIsLoaded()},r.prototype.pageIsLoaded=function(){return this.pageLoaded||"complete"===document.readyState},r.prototype.update=function(t,e,r){var n;return n={turbolinks:{restorationIdentifier:r}},history[t+"State"](n,null,e)},r}()}.call(this),function(){e.Snapshot=function(){function t(t){var e,r;r=t.head,e=t.body,this.head=null!=r?r:document.createElement("head"),this.body=null!=e?e:document.createElement("body")}return t.wrap=function(t){return t instanceof this?t:this.fromHTML(t)},t.fromHTML=function(t){var e;return e=document.createElement("html"),e.innerHTML=t,this.fromElement(e)},t.fromElement=function(t){return new this({head:t.querySelector("head"),body:t.querySelector("body")})},t.prototype.clone=function(){return new t({head:this.head.cloneNode(!0),body:this.body.cloneNode(!0)})},t.prototype.getRootLocation=function(){var t,r;return r=null!=(t=this.getSetting("root"))?t:"/",new e.Location(r)},t.prototype.getCacheControlValue=function(){return this.getSetting("cache-control")},t.prototype.getElementForAnchor=function(t){try{return this.body.querySelector("[id='"+t+"'], a[name='"+t+"']")}catch(e){}},t.prototype.hasAnchor=function(t){return null!=this.getElementForAnchor(t)},t.prototype.isPreviewable=function(){return"no-preview"!==this.getCacheControlValue()},t.prototype.isCacheable=function(){return"no-cache"!==this.getCacheControlValue()},t.prototype.isVisitable=function(){return"reload"!==this.getSetting("visit-control")},t.prototype.getSetting=function(t){var e,r;return r=this.head.querySelectorAll("meta[name='turbolinks-"+t+"']"),e=r[r.length-1],null!=e?e.getAttribute("content"):void 0},t}()}.call(this),function(){var t=[].slice;e.Renderer=function(){function e(){}var r;return e.render=function(){var e,r,n,o;return n=arguments[0],r=arguments[1],e=3<=arguments.length?t.call(arguments,2):[],o=function(t,e,r){r.prototype=t.prototype;var n=new r,o=t.apply(n,e);return Object(o)===o?o:n}(this,e,function(){}),o.delegate=n,o.render(r),o},e.prototype.renderView=function(t){return this.delegate.viewWillRender(this.newBody),t(),this.delegate.viewRendered(this.newBody)},e.prototype.invalidateView=function(){return this.delegate.viewInvalidated()},e.prototype.createScriptElement=function(t){var e;return"false"===t.getAttribute("data-turbolinks-eval")?t:(e=document.createElement("script"),e.textContent=t.textContent,e.async=!1,r(e,t),e)},r=function(t,e){var r,n,o,i,s,a,u;for(i=e.attributes,a=[],r=0,n=i.length;n>r;r++)s=i[r],o=s.name,u=s.value,a.push(t.setAttribute(o,u));return a},e}()}.call(this),function(){e.HeadDetails=function(){function t(t){var e,r,i,s,a,u,l;for(this.element=t,this.elements={},l=this.element.childNodes,s=0,u=l.length;u>s;s++)i=l[s],i.nodeType===Node.ELEMENT_NODE&&(a=i.outerHTML,r=null!=(e=this.elements)[a]?e[a]:e[a]={type:o(i),tracked:n(i),elements:[]},r.elements.push(i))}var e,r,n,o;return t.prototype.hasElementWithKey=function(t){return t in this.elements},t.prototype.getTrackedElementSignature=function(){var t,e;return function(){var r,n;r=this.elements,n=[];for(t in r)e=r[t].tracked,e&&n.push(t);return n}.call(this).join("")},t.prototype.getScriptElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("script",t)},t.prototype.getStylesheetElementsNotInDetails=function(t){return this.getElementsMatchingTypeNotInDetails("stylesheet",t)},t.prototype.getElementsMatchingTypeNotInDetails=function(t,e){var r,n,o,i,s,a;o=this.elements,s=[];for(n in o)i=o[n],a=i.type,r=i.elements,a!==t||e.hasElementWithKey(n)||s.push(r[0]);return s},t.prototype.getProvisionalElements=function(){var t,e,r,n,o,i,s;r=[],n=this.elements;for(e in n)o=n[e],s=o.type,i=o.tracked,t=o.elements,null!=s||i?t.length>1&&r.push.apply(r,t.slice(1)):r.push.apply(r,t);return r},o=function(t){return e(t)?"script":r(t)?"stylesheet":void 0},n=function(t){return"reload"===t.getAttribute("data-turbolinks-track")},e=function(t){var e;return e=t.tagName.toLowerCase(),"script"===e},r=function(t){var e;return e=t.tagName.toLowerCase(),"style"===e||"link"===e&&"stylesheet"===t.getAttribute("rel")},t}()}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.SnapshotRenderer=function(r){function n(t,r,n){this.currentSnapshot=t,this.newSnapshot=r,this.isPreview=n,this.currentHeadDetails=new e.HeadDetails(this.currentSnapshot.head),this.newHeadDetails=new e.HeadDetails(this.newSnapshot.head),this.newBody=this.newSnapshot.body}return t(n,r),n.prototype.render=function(t){return this.shouldRender()?(this.mergeHead(),this.renderView(function(e){return function(){return e.replaceBody(),e.isPreview||e.focusFirstAutofocusableElement(),t()}}(this))):this.invalidateView()},n.prototype.mergeHead=function(){return this.copyNewHeadStylesheetElements(),this.copyNewHeadScriptElements(),this.removeCurrentHeadProvisionalElements(),this.copyNewHeadProvisionalElements()},n.prototype.replaceBody=function(){return this.activateBodyScriptElements(),this.importBodyPermanentElements(),this.assignNewBody()},n.prototype.shouldRender=function(){return this.newSnapshot.isVisitable()&&this.trackedElementsAreIdentical()},n.prototype.trackedElementsAreIdentical=function(){return this.currentHeadDetails.getTrackedElementSignature()===this.newHeadDetails.getTrackedElementSignature()},n.prototype.copyNewHeadStylesheetElements=function(){var t,e,r,n,o;for(n=this.getNewHeadStylesheetElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.copyNewHeadScriptElements=function(){var t,e,r,n,o;for(n=this.getNewHeadScriptElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(this.createScriptElement(t)));return o},n.prototype.removeCurrentHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getCurrentHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.removeChild(t));return o},n.prototype.copyNewHeadProvisionalElements=function(){var t,e,r,n,o;for(n=this.getNewHeadProvisionalElements(),o=[],e=0,r=n.length;r>e;e++)t=n[e],o.push(document.head.appendChild(t));return o},n.prototype.importBodyPermanentElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyPermanentElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],(t=this.findCurrentBodyPermanentElement(o))?i.push(o.parentNode.replaceChild(t,o)):i.push(void 0);return i},n.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getNewBodyScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},n.prototype.assignNewBody=function(){return document.body=this.newBody},n.prototype.focusFirstAutofocusableElement=function(){var t;return null!=(t=this.findFirstAutofocusableElement())?t.focus():void 0},n.prototype.getNewHeadStylesheetElements=function(){return this.newHeadDetails.getStylesheetElementsNotInDetails(this.currentHeadDetails)},n.prototype.getNewHeadScriptElements=function(){return this.newHeadDetails.getScriptElementsNotInDetails(this.currentHeadDetails)},n.prototype.getCurrentHeadProvisionalElements=function(){return this.currentHeadDetails.getProvisionalElements()},n.prototype.getNewHeadProvisionalElements=function(){return this.newHeadDetails.getProvisionalElements()},n.prototype.getNewBodyPermanentElements=function(){return this.newBody.querySelectorAll("[id][data-turbolinks-permanent]")},n.prototype.findCurrentBodyPermanentElement=function(t){return document.body.querySelector("#"+t.id+"[data-turbolinks-permanent]")},n.prototype.getNewBodyScriptElements=function(){return this.newBody.querySelectorAll("script")},n.prototype.findFirstAutofocusableElement=function(){return document.body.querySelector("[autofocus]")},n}(e.Renderer)}.call(this),function(){var t=function(t,e){function n(){this.constructor=t}for(var o in e)r.call(e,o)&&(t[o]=e[o]);return n.prototype=e.prototype,t.prototype=new n,t.__super__=e.prototype,t},r={}.hasOwnProperty;e.ErrorRenderer=function(e){function r(t){this.html=t}return t(r,e),r.prototype.render=function(t){return this.renderView(function(e){return function(){return e.replaceDocumentHTML(),e.activateBodyScriptElements(),t()}}(this))},r.prototype.replaceDocumentHTML=function(){return document.documentElement.innerHTML=this.html},r.prototype.activateBodyScriptElements=function(){var t,e,r,n,o,i;for(n=this.getScriptElements(),i=[],e=0,r=n.length;r>e;e++)o=n[e],t=this.createScriptElement(o),i.push(o.parentNode.replaceChild(t,o));return i},r.prototype.getScriptElements=function(){return document.documentElement.querySelectorAll("script")},r}(e.Renderer)}.call(this),function(){e.View=function(){function t(t){this.delegate=t,this.element=document.documentElement}return t.prototype.getRootLocation=function(){return this.getSnapshot().getRootLocation()},t.prototype.getElementForAnchor=function(t){return this.getSnapshot().getElementForAnchor(t)},t.prototype.getSnapshot=function(){return e.Snapshot.fromElement(this.element)},t.prototype.render=function(t,e){var r,n,o;return o=t.snapshot,r=t.error,n=t.isPreview,this.markAsPreview(n),null!=o?this.renderSnapshot(o,n,e):this.renderError(r,e)},t.prototype.markAsPreview=function(t){return t?this.element.setAttribute("data-turbolinks-preview",""):this.element.removeAttribute("data-turbolinks-preview")},t.prototype.renderSnapshot=function(t,r,n){return e.SnapshotRenderer.render(this.delegate,n,this.getSnapshot(),e.Snapshot.wrap(t),r)},t.prototype.renderError=function(t,r){return e.ErrorRenderer.render(this.delegate,r,t)},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.ScrollManager=function(){function r(r){this.delegate=r,this.onScroll=t(this.onScroll,this),this.onScroll=e.throttle(this.onScroll)}return r.prototype.start=function(){return this.started?void 0:(addEventListener("scroll",this.onScroll,!1),this.onScroll(),this.started=!0)},r.prototype.stop=function(){return this.started?(removeEventListener("scroll",this.onScroll,!1),this.started=!1):void 0},r.prototype.scrollToElement=function(t){return t.scrollIntoView()},r.prototype.scrollToPosition=function(t){var e,r;return e=t.x,r=t.y,window.scrollTo(e,r)},r.prototype.onScroll=function(t){return this.updatePosition({x:window.pageXOffset,y:window.pageYOffset})},r.prototype.updatePosition=function(t){var e;return this.position=t,null!=(e=this.delegate)?e.scrollPositionChanged(this.position):void 0},r}()}.call(this),function(){e.SnapshotCache=function(){function t(t){this.size=t,this.keys=[],this.snapshots={}}var r;return t.prototype.has=function(t){var e;return e=r(t),e in this.snapshots},t.prototype.get=function(t){var e;if(this.has(t))return e=this.read(t),this.touch(t),e},t.prototype.put=function(t,e){return this.write(t,e),this.touch(t),e},t.prototype.read=function(t){var e;return e=r(t),this.snapshots[e]},t.prototype.write=function(t,e){var n;return n=r(t),this.snapshots[n]=e},t.prototype.touch=function(t){var e,n;return n=r(t),e=this.keys.indexOf(n),e>-1&&this.keys.splice(e,1),this.keys.unshift(n),this.trim()},t.prototype.trim=function(){var t,e,r,n,o;for(n=this.keys.splice(this.size),o=[],t=0,r=n.length;r>t;t++)e=n[t],o.push(delete this.snapshots[e]);return o},r=function(t){return e.Location.wrap(t).toCacheKey()},t}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Visit=function(){function r(r,n,o){this.controller=r,this.action=o,this.performScroll=t(this.performScroll,this),this.identifier=e.uuid(),this.location=e.Location.wrap(n),this.adapter=this.controller.adapter,this.state="initialized",this.timingMetrics={}}var n;return r.prototype.start=function(){return"initialized"===this.state?(this.recordTimingMetric("visitStart"),this.state="started",this.adapter.visitStarted(this)):void 0},r.prototype.cancel=function(){var t;return"started"===this.state?(null!=(t=this.request)&&t.cancel(),this.cancelRender(),this.state="canceled"):void 0},r.prototype.complete=function(){var t;return"started"===this.state?(this.recordTimingMetric("visitEnd"),this.state="completed","function"==typeof(t=this.adapter).visitCompleted&&t.visitCompleted(this),this.controller.visitCompleted(this)):void 0},r.prototype.fail=function(){var t;return"started"===this.state?(this.state="failed","function"==typeof(t=this.adapter).visitFailed?t.visitFailed(this):void 0):void 0},r.prototype.changeHistory=function(){var t,e;return this.historyChanged?void 0:(t=this.location.isEqualTo(this.referrer)?"replace":this.action,e=n(t),this.controller[e](this.location,this.restorationIdentifier),this.historyChanged=!0)},r.prototype.issueRequest=function(){return this.shouldIssueRequest()&&null==this.request?(this.progress=0,this.request=new e.HttpRequest(this,this.location,this.referrer),this.request.send()):void 0},r.prototype.getCachedSnapshot=function(){var t;return!(t=this.controller.getCachedSnapshotForLocation(this.location))||null!=this.location.anchor&&!t.hasAnchor(this.location.anchor)||"restore"!==this.action&&!t.isPreviewable()?void 0:t},r.prototype.hasCachedSnapshot=function(){return null!=this.getCachedSnapshot()},r.prototype.loadCachedSnapshot=function(){var t,e;return(e=this.getCachedSnapshot())?(t=this.shouldIssueRequest(),this.render(function(){var r;return this.cacheSnapshot(),this.controller.render({snapshot:e,isPreview:t},this.performScroll),"function"==typeof(r=this.adapter).visitRendered&&r.visitRendered(this),t?void 0:this.complete()})):void 0},r.prototype.loadResponse=function(){return null!=this.response?this.render(function(){var t,e;return this.cacheSnapshot(),this.request.failed?(this.controller.render({error:this.response},this.performScroll),"function"==typeof(t=this.adapter).visitRendered&&t.visitRendered(this),this.fail()):(this.controller.render({snapshot:this.response},this.performScroll),"function"==typeof(e=this.adapter).visitRendered&&e.visitRendered(this),this.complete())}):void 0},r.prototype.followRedirect=function(){return this.redirectedToLocation&&!this.followedRedirect?(this.location=this.redirectedToLocation,this.controller.replaceHistoryWithLocationAndRestorationIdentifier(this.redirectedToLocation,this.restorationIdentifier),this.followedRedirect=!0):void 0},r.prototype.requestStarted=function(){var t;return this.recordTimingMetric("requestStart"),"function"==typeof(t=this.adapter).visitRequestStarted?t.visitRequestStarted(this):void 0},r.prototype.requestProgressed=function(t){var e;return this.progress=t,"function"==typeof(e=this.adapter).visitRequestProgressed?e.visitRequestProgressed(this):void 0},r.prototype.requestCompletedWithResponse=function(t,r){return this.response=t,null!=r&&(this.redirectedToLocation=e.Location.wrap(r)),this.adapter.visitRequestCompleted(this)},r.prototype.requestFailedWithStatusCode=function(t,e){return this.response=e,this.adapter.visitRequestFailedWithStatusCode(this,t)},r.prototype.requestFinished=function(){var t;return this.recordTimingMetric("requestEnd"),"function"==typeof(t=this.adapter).visitRequestFinished?t.visitRequestFinished(this):void 0},r.prototype.performScroll=function(){return this.scrolled?void 0:("restore"===this.action?this.scrollToRestoredPosition()||this.scrollToTop():this.scrollToAnchor()||this.scrollToTop(),this.scrolled=!0)},r.prototype.scrollToRestoredPosition=function(){var t,e;return t=null!=(e=this.restorationData)?e.scrollPosition:void 0,null!=t?(this.controller.scrollToPosition(t),!0):void 0},r.prototype.scrollToAnchor=function(){return null!=this.location.anchor?(this.controller.scrollToAnchor(this.location.anchor),!0):void 0},r.prototype.scrollToTop=function(){return this.controller.scrollToPosition({x:0,y:0})},r.prototype.recordTimingMetric=function(t){var e;return null!=(e=this.timingMetrics)[t]?e[t]:e[t]=(new Date).getTime()},r.prototype.getTimingMetrics=function(){return e.copyObject(this.timingMetrics)},n=function(t){switch(t){case"replace":return"replaceHistoryWithLocationAndRestorationIdentifier";case"advance":case"restore":return"pushHistoryWithLocationAndRestorationIdentifier"}},r.prototype.shouldIssueRequest=function(){return"restore"===this.action?!this.hasCachedSnapshot():!0},r.prototype.cacheSnapshot=function(){return this.snapshotCached?void 0:(this.controller.cacheSnapshot(),this.snapshotCached=!0)},r.prototype.render=function(t){return this.cancelRender(),this.frame=requestAnimationFrame(function(e){return function(){return e.frame=null,t.call(e)}}(this))},r.prototype.cancelRender=function(){return this.frame?cancelAnimationFrame(this.frame):void 0},r}()}.call(this),function(){var t=function(t,e){return function(){return t.apply(e,arguments)}};e.Controller=function(){function r(){this.clickBubbled=t(this.clickBubbled,this),this.clickCaptured=t(this.clickCaptured,this),this.pageLoaded=t(this.pageLoaded,this),this.history=new e.History(this),this.view=new e.View(this),this.scrollManager=new e.ScrollManager(this),this.restorationData={},this.clearCache(),this.setProgressBarDelay(500)}return r.prototype.start=function(){return e.supported&&!this.started?(addEventListener("click",this.clickCaptured,!0),addEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.start(),this.startHistory(),this.started=!0,this.enabled=!0):void 0},r.prototype.disable=function(){return this.enabled=!1},r.prototype.stop=function(){return this.started?(removeEventListener("click",this.clickCaptured,!0),removeEventListener("DOMContentLoaded",this.pageLoaded,!1),this.scrollManager.stop(),this.stopHistory(),this.started=!1):void 0},r.prototype.clearCache=function(){return this.cache=new e.SnapshotCache(10)},r.prototype.visit=function(t,r){var n,o;return null==r&&(r={}),t=e.Location.wrap(t),this.applicationAllowsVisitingLocation(t)?this.locationIsVisitable(t)?(n=null!=(o=r.action)?o:"advance",this.adapter.visitProposedToLocationWithAction(t,n)):window.location=t:void 0},r.prototype.startVisitToLocationWithAction=function(t,r,n){var o;return e.supported?(o=this.getRestorationDataForIdentifier(n),this.startVisit(t,r,{restorationData:o})):window.location=t},r.prototype.setProgressBarDelay=function(t){return this.progressBarDelay=t},r.prototype.startHistory=function(){return this.location=e.Location.wrap(window.location),this.restorationIdentifier=e.uuid(),this.history.start(),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.stopHistory=function(){return this.history.stop()},r.prototype.pushHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.push(this.location,this.restorationIdentifier)},r.prototype.replaceHistoryWithLocationAndRestorationIdentifier=function(t,r){return this.restorationIdentifier=r,this.location=e.Location.wrap(t),this.history.replace(this.location,this.restorationIdentifier)},r.prototype.historyPoppedToLocationWithRestorationIdentifier=function(t,r){var n;return this.restorationIdentifier=r,this.enabled?(n=this.getRestorationDataForIdentifier(this.restorationIdentifier),this.startVisit(t,"restore",{restorationIdentifier:this.restorationIdentifier,restorationData:n,historyChanged:!0}),this.location=e.Location.wrap(t)):this.adapter.pageInvalidated()},r.prototype.getCachedSnapshotForLocation=function(t){var e;return e=this.cache.get(t),e?e.clone():void 0},r.prototype.shouldCacheSnapshot=function(){return this.view.getSnapshot().isCacheable()},r.prototype.cacheSnapshot=function(){var t;return this.shouldCacheSnapshot()?(this.notifyApplicationBeforeCachingSnapshot(),t=this.view.getSnapshot(),this.cache.put(this.lastRenderedLocation,t.clone())):void 0},r.prototype.scrollToAnchor=function(t){var e;return(e=this.view.getElementForAnchor(t))?this.scrollToElement(e):this.scrollToPosition({x:0,y:0})},r.prototype.scrollToElement=function(t){return this.scrollManager.scrollToElement(t)},r.prototype.scrollToPosition=function(t){return this.scrollManager.scrollToPosition(t)},r.prototype.scrollPositionChanged=function(t){var e;return e=this.getCurrentRestorationData(),e.scrollPosition=t},r.prototype.render=function(t,e){return this.view.render(t,e)},r.prototype.viewInvalidated=function(){return this.adapter.pageInvalidated()},r.prototype.viewWillRender=function(t){return this.notifyApplicationBeforeRender(t)},r.prototype.viewRendered=function(){return this.lastRenderedLocation=this.currentVisit.location,this.notifyApplicationAfterRender()},r.prototype.pageLoaded=function(){return this.lastRenderedLocation=this.location,this.notifyApplicationAfterPageLoad()},r.prototype.clickCaptured=function(){return removeEventListener("click",this.clickBubbled,!1),addEventListener("click",this.clickBubbled,!1)},r.prototype.clickBubbled=function(t){var e,r,n;return this.enabled&&this.clickEventIsSignificant(t)&&(r=this.getVisitableLinkForNode(t.target))&&(n=this.getVisitableLocationForLink(r))&&this.applicationAllowsFollowingLinkToLocation(r,n)?(t.preventDefault(),e=this.getActionForLink(r),
this.visit(n,{action:e})):void 0},r.prototype.applicationAllowsFollowingLinkToLocation=function(t,e){var r;return r=this.notifyApplicationAfterClickingLinkToLocation(t,e),!r.defaultPrevented},r.prototype.applicationAllowsVisitingLocation=function(t){var e;return e=this.notifyApplicationBeforeVisitingLocation(t),!e.defaultPrevented},r.prototype.notifyApplicationAfterClickingLinkToLocation=function(t,r){return e.dispatch("turbolinks:click",{target:t,data:{url:r.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationBeforeVisitingLocation=function(t){return e.dispatch("turbolinks:before-visit",{data:{url:t.absoluteURL},cancelable:!0})},r.prototype.notifyApplicationAfterVisitingLocation=function(t){return e.dispatch("turbolinks:visit",{data:{url:t.absoluteURL}})},r.prototype.notifyApplicationBeforeCachingSnapshot=function(){return e.dispatch("turbolinks:before-cache")},r.prototype.notifyApplicationBeforeRender=function(t){return e.dispatch("turbolinks:before-render",{data:{newBody:t}})},r.prototype.notifyApplicationAfterRender=function(){return e.dispatch("turbolinks:render")},r.prototype.notifyApplicationAfterPageLoad=function(t){return null==t&&(t={}),e.dispatch("turbolinks:load",{data:{url:this.location.absoluteURL,timing:t}})},r.prototype.startVisit=function(t,e,r){var n;return null!=(n=this.currentVisit)&&n.cancel(),this.currentVisit=this.createVisit(t,e,r),this.currentVisit.start(),this.notifyApplicationAfterVisitingLocation(t)},r.prototype.createVisit=function(t,r,n){var o,i,s,a,u;return i=null!=n?n:{},a=i.restorationIdentifier,s=i.restorationData,o=i.historyChanged,u=new e.Visit(this,t,r),u.restorationIdentifier=null!=a?a:e.uuid(),u.restorationData=e.copyObject(s),u.historyChanged=o,u.referrer=this.location,u},r.prototype.visitCompleted=function(t){return this.notifyApplicationAfterPageLoad(t.getTimingMetrics())},r.prototype.clickEventIsSignificant=function(t){return!(t.defaultPrevented||t.target.isContentEditable||t.which>1||t.altKey||t.ctrlKey||t.metaKey||t.shiftKey)},r.prototype.getVisitableLinkForNode=function(t){return this.nodeIsVisitable(t)?e.closest(t,"a[href]:not([target]):not([download])"):void 0},r.prototype.getVisitableLocationForLink=function(t){var r;return r=new e.Location(t.getAttribute("href")),this.locationIsVisitable(r)?r:void 0},r.prototype.getActionForLink=function(t){var e;return null!=(e=t.getAttribute("data-turbolinks-action"))?e:"advance"},r.prototype.nodeIsVisitable=function(t){var r;return(r=e.closest(t,"[data-turbolinks]"))?"false"!==r.getAttribute("data-turbolinks"):!0},r.prototype.locationIsVisitable=function(t){return t.isPrefixedBy(this.view.getRootLocation())&&t.isHTML()},r.prototype.getCurrentRestorationData=function(){return this.getRestorationDataForIdentifier(this.restorationIdentifier)},r.prototype.getRestorationDataForIdentifier=function(t){var e;return null!=(e=this.restorationData)[t]?e[t]:e[t]={}},r}()}.call(this),function(){!function(){var t,e;if((t=e=document.currentScript)&&!e.hasAttribute("data-turbolinks-suppress-warning"))for(;t=t.parentNode;)if(t===document.body)return console.warn("You are loading Turbolinks from a <script> element inside the <body> element. This is probably not what you meant to do!\n\nLoad your application\u2019s JavaScript bundle inside the <head> element instead. <script> elements in <body> are evaluated with each page change.\n\nFor more information, see: https://github.com/turbolinks/turbolinks#working-with-script-elements\n\n\u2014\u2014\nSuppress this warning by adding a `data-turbolinks-suppress-warning` attribute to: %s",e.outerHTML)}()}.call(this),function(){var t,r,n;e.start=function(){return r()?(null==e.controller&&(e.controller=t()),e.controller.start()):void 0},r=function(){return null==window.Turbolinks&&(window.Turbolinks=e),n()},t=function(){var t;return t=new e.Controller,t.adapter=new e.BrowserAdapter(t),t},n=function(){return window.Turbolinks===e},n()&&e.start()}.call(this)}).call(this),"object"==typeof module&&module.exports?module.exports=e:"function"=="function"&&__webpack_require__(/*! !webpack amd options */ 6)&&!(__WEBPACK_AMD_DEFINE_FACTORY__ = (e),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}).call(this);

/***/ }),
/* 6 */
/*!****************************************!*\
  !*** (webpack)/buildin/amd-options.js ***!
  \****************************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }),
/* 7 */
/*!********************************************!*\
  !*** ./app/javascript/css/application.css ***!
  \********************************************/
/*! dynamic exports provided */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/*!****************************************!*\
  !*** ./app/javascript/sessions/new.js ***!
  \****************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_bunnyjs_src_Validation__ = __webpack_require__(/*! bunnyjs/src/Validation */ 9);


window.App = window.App || {};

window.App.Sessions = {
  form: null,

  init: function init() {
    this.form = document.getElementById('new-session-form');

    this.form.addEventListener('ajax-error', function (event) {
      console.log('got error');
    });

    __WEBPACK_IMPORTED_MODULE_0_bunnyjs_src_Validation__["a" /* Validation */].init(this.form, true);
  }
};

document.addEventListener('turbolinks:load', function () {
  return window.App.Sessions.init();
});

/***/ }),
/* 9 */
/*!************************************************!*\
  !*** ./node_modules/bunnyjs/src/Validation.js ***!
  \************************************************/
/*! exports provided: ValidationConfig, ValidationLang, ValidationValidators, ValidationUI, Validation */
/*! exports used: Validation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file_file__ = __webpack_require__(/*! ./file/file */ 1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__file_image__ = __webpack_require__(/*! ./file/image */ 10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bunny_ajax__ = __webpack_require__(/*! ./bunny.ajax */ 11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BunnyElement__ = __webpack_require__(/*! ./BunnyElement */ 12);






const ValidationConfig = {

    // div/node class name selector which contains one label, one input, one help text etc.
    classInputGroup: 'form-group',
    // class to be applied on input group node if it has invalid input
    classInputGroupError: 'has-danger',
    // class to be applied on input group node if it input passed validation (is valid)
    classInputGroupSuccess: 'has-success',

    // label to pick textContent from to insert field name into error message
    classLabel: 'form-control-label',

    // error message tag name
    tagNameError: 'small',
    // error message class
    classError: 'text-help',

    // query selector to search inputs within input groups to validate
    selectorInput: '[name]'

};
/* unused harmony export ValidationConfig */


/**
 * Bunny Form Validation default Translations (EN)
 *
 * object key = validator method name
 * may use additional parameters in rejected (invalid) Promise
 * each invalid input will receive {label} parameter anyway
 * ajax error message should be received from server via JSON response in "message" key
 */
const ValidationLang = {

    required: "'{label}' is required",
    email: "'{label}' should be a valid e-mail address",
    url: "{label} should be a valid website URL",
    tel: "'{label}' is not a valid telephone number",
    maxLength: "'{label}' length must be < '{maxLength}'",
    minLength: "'{label}' length must be > '{minLength}'",
    maxFileSize: "Max file size must be < {maxFileSize}MB, uploaded {fileSize}MB",
    image: "'{label}' should be an image (JPG or PNG)",
    minImageDimensions: "'{label}' must be > {minWidth}x{minHeight}, uploaded {width}x{height}",
    maxImageDimensions: "'{label}' must be < {maxWidth}x{maxHeight}, uploaded {width}x{height}",
    requiredFromList: "Select '{label}' from list",
    confirmation: "'{label}' is not equal to '{originalLabel}'",
    minOptions: "Please select at least {minOptionsCount} options"

};
/* unused harmony export ValidationLang */


/**
 * Bunny Validation helper - get file to validate
 * @param {HTMLInputElement} input
 * @returns {File|Blob|boolean} - If no file uploaded - returns false
 * @private
 */
const _bn_getFile = (input) => {
    // if there is custom file upload logic, for example, images are resized client-side
    // generated Blobs should be assigned to fileInput._file
    // and can be sent via ajax with FormData

    // if file was deleted, custom field can be set to an empty string

    // Bunny Validation detects if there is custom Blob assigned to file input
    // and uses this file for validation instead of original read-only input.files[]
    if (input._file !== undefined && input._file !== '') {
        if (input._file instanceof Blob === false) {
            console.error(`Custom file for input ${input.name} is not an instance of Blob`);
            return false;
        }
        return input._file;
    }
    return input.files[0] || false;
};

/**
 * Bunny Form Validation Validators
 *
 * Each validator is a separate method
 * Each validator return Promise
 * Each Promise has valid and invalid callbacks
 * Invalid callback may contain argument - string of error message or object of additional params for lang error message
 */
const ValidationValidators = {

    required(input){
        return new Promise((valid, invalid) => {
            if (input.hasAttribute('required')) {
                // input is required, check value
                if (
                    input.getAttribute('type') !== 'file' && input.value === ''
                    || ((input.type === 'radio' || input.type === 'checkbox') && input.validity.valueMissing)
                    || input.getAttribute('type') === 'file' && _bn_getFile(input) === false) {
                    // input is empty or file is not uploaded
                    invalid();
                } else {
                    valid();
                }
            } else {
                valid();
            }
        });
    },

    email(input) {
        return new Promise((valid, invalid) => {
            if (input.value.length > 0 && input.getAttribute('type') === 'email') {
                // input is email, parse string to match email regexp
                const Regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i;
                if (Regex.test(input.value)) {
                    valid();
                } else {
                    invalid();
                }
            } else {
                valid();
            }
        });
    },

    url(input){
        return new Promise((valid, invalid) => {
            if (input.value.length > 0 && input.getAttribute('type') === 'url') {
                // input is URL, parse string to match website URL regexp
                const Regex = /(^|\s)((https?:\/\/)?[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi;
                if (Regex.test(input.value)) {
                    valid();
                } else {
                    invalid();
                }
            } else {
                valid();
            }
        });
    },

    tel(input){
        return new Promise((valid, invalid) => {
            if (input.value.length > 0 && input.getAttribute('type') === 'tel') {
                // input is tel, parse string to match tel regexp
                const Regex = /^[0-9\-\+\(\)\#\ \*]{6,20}$/;
                if (Regex.test(input.value)) {
                    valid();
                } else {
                    invalid();
                }
            } else {
                valid();
            }
        });
    },

    maxLength(input) {
        return new Promise((valid, invalid) => {
            if (input.getAttribute('maxlength') !== null && input.value.length > input.getAttribute('maxlength')) {
                invalid({maxLength: input.getAttribute('maxlength')});
            } else {
                valid();
            }
        });
    },

    minLength(input) {
        return new Promise((valid, invalid) => {
            if (input.getAttribute('minlength') !== null && input.value.length < input.getAttribute('minlength')) {
                invalid({minLength: input.getAttribute('minlength')});
            } else {
                valid();
            }
        });
    },

    maxFileSize(input) {
        return new Promise((valid, invalid) => {
            if (
                input.getAttribute('type') === 'file'
                && input.hasAttribute('maxfilesize')
                && _bn_getFile(input) !== false
            ) {
                const maxFileSize = parseFloat(input.getAttribute('maxfilesize')); // in MB
                const fileSize = (_bn_getFile(input).size / 1000000).toFixed(2); // in MB
                if (fileSize <= maxFileSize) {
                    valid(input);
                } else {
                    invalid({maxFileSize, fileSize});
                }
            } else {
                valid(input);
            }
        });
    },

    // if file input has "accept" attribute and it contains "image",
    // then check if uploaded file is a JPG or PNG
    image(input) {
        return new Promise((valid, invalid) => {
            if (
                input.getAttribute('type') === 'file'
                && input.getAttribute('accept').indexOf('image') > -1
                && _bn_getFile(input) !== false
            ) {
                __WEBPACK_IMPORTED_MODULE_0__file_file__["a" /* BunnyFile */].getSignature(_bn_getFile(input)).then(signature => {
                    if (__WEBPACK_IMPORTED_MODULE_0__file_file__["a" /* BunnyFile */].isJpeg(signature) || __WEBPACK_IMPORTED_MODULE_0__file_file__["a" /* BunnyFile */].isPng(signature)) {
                        valid();
                    } else {
                        invalid({signature});
                    }
                }).catch(e => {
                    invalid(e);
                });
            } else {
                valid();
            }
        });
    },

    minImageDimensions(input) {
        return new Promise((valid, invalid) => {
            if (input.hasAttribute('mindimensions') && _bn_getFile(input) !== false) {
                const [minWidth, minHeight] = input.getAttribute('mindimensions').split('x');
                __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageByBlob(_bn_getFile(input)).then(img => {
                    const width = __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageWidth(img);
                    const height = __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageHeight(img);
                    if (width < minWidth || height < minHeight) {
                        invalid({width: width, height: height, minWidth, minHeight});
                    } else {
                        valid();
                    }
                }).catch(e => {
                    invalid(e);
                });
            } else {
                valid();
            }
        });
    },

    maxImageDimensions(input) {
        return new Promise((valid, invalid) => {
            if (input.hasAttribute('maxdimensions') && _bn_getFile(input) !== false) {
                const [maxWidth, maxHeight] = input.getAttribute('maxdimensions').split('x');
                __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageByBlob(_bn_getFile(input)).then(img => {
                    const width = __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageWidth(img);
                    const height = __WEBPACK_IMPORTED_MODULE_1__file_image__["a" /* BunnyImage */].getImageHeight(img);
                    if (width > maxWidth || height > maxHeight) {
                        invalid({width: width, height: height, maxWidth, maxHeight});
                    } else {
                        valid();
                    }
                }).catch(e => {
                    invalid(e);
                });
            } else {
                valid();
            }
        });
    },

    requiredFromList(input) {
        return new Promise((valid, invalid) => {
            let id;
            if (input.hasAttribute('requiredfromlist')) {
                id = input.getAttribute('requiredfromlist')
            } else {
                id = input.name + '_id';
            }
            const srcInput = document.getElementById(id);
            if (srcInput) {
                if (srcInput.value.length > 0) {
                    valid();
                } else {
                    invalid();
                }
            } else {
                valid();
            }
        });
    },

    minOptions(input) {
        return new Promise((valid, invalid) => {
            if (input.hasAttribute('minoptions')) {
                const minOptionsCount = parseInt(input.getAttribute('minoptions'));
                const inputGroup = ValidationUI.getInputGroup(input);
                const hiddenInputs = inputGroup.getElementsByTagName('input');
                let selectedOptionsCount = 0;
                [].forEach.call(hiddenInputs, hiddenInput => {
                    if (hiddenInput !== input && hiddenInput.value !== '') {
                        selectedOptionsCount++
                    }
                });
                if (selectedOptionsCount < minOptionsCount) {
                    invalid({minOptionsCount});
                } else {
                    valid();
                }
            } else {
                valid();
            }
        })
    },

    confirmation(input) {
        return new Promise((valid, invalid) => {
            if (input.name.indexOf('_confirmation') > -1) {
                const originalInputId = input.name.substr(0, input.name.length - 13);
                const originalInput = document.getElementById(originalInputId);
                if (originalInput.value == input.value) {
                    valid();
                } else {
                    invalid({originalLabel: ValidationUI.getLabel(ValidationUI.getInputGroup(originalInput)).textContent});
                }
            } else {
                valid();
            }
        });
    },

    // if input's value is not empty and input has attribute "data-ajax" which should contain ajax URL with {value}
    // which will be replaced by URI encoded input.value
    // then ajax request will be made to validate input
    //
    // ajax request should return JSON response
    // if JSON response has "message" key and message key is not empty string - input is invalid
    // server should return validation error message, it may contain {label}
    // Does not works with file inputs
    ajax(input) {
        return new Promise((valid, invalid) => {
            if (input.dataset.ajax !== undefined && input.value.length > 0) {
                const url = input.dataset.ajax.replace('{value}', encodeURIComponent(input.value))
                __WEBPACK_IMPORTED_MODULE_2__bunny_ajax__["a" /* Ajax */].get(url, data => {
                    data = JSON.parse(data);
                    if (data.message !== undefined && data.message !== '') {
                        invalid(data.message);
                    } else {
                        valid();
                    }
                }, () => {
                    invalid('Ajax error');
                });
            } else {
                valid();
            }
        });
    }

};
/* unused harmony export ValidationValidators */


/**
 * @package BunnyJS
 * @component Validation
 *
 * Base Object to work with DOM, creates error messages
 * and searches for inputs within "input groups" and related elements
 * Each input should be wrapped around an "input group" element
 * Each "input group" should contain one input, may contain one label
 * Multiple inputs within same "Input group" should not be used for validation
 * <fieldset> is recommended to be used to wrap more then one input
 */
const ValidationUI = {

    config: ValidationConfig,

    /* ************************************************************************
     * ERROR MESSAGE
     */

    /**
     * DOM algorithm - where to insert error node/message
     *
     * @param {HTMLElement} inputGroup
     * @param {HTMLElement} errorNode
     */
    insertErrorNode(inputGroup, errorNode) {
        inputGroup.appendChild(errorNode);
    },



    /**
     * DOM algorithm - where to add/remove error class
     *
     * @param {HTMLElement} inputGroup
     */
    toggleErrorClass(inputGroup) {
        inputGroup.classList.toggle(this.config.classInputGroupError);
    },



    /**
     * Create DOM element for error message
     *
     * @returns {HTMLElement}
     */
    createErrorNode() {
        const el = document.createElement(this.config.tagNameError);
        el.classList.add(this.config.classError);
        return el;
    },



    /**
     * Find error message node within input group or false if not found
     *
     * @param {HTMLElement} inputGroup
     *
     * @returns {HTMLElement|boolean}
     */
    getErrorNode(inputGroup) {
        return inputGroup.getElementsByClassName(this.config.classError)[0] || false;
    },



    /**
     * Removes error node and class from input group if exists
     *
     * @param {HTMLElement} inputGroup
     */
    removeErrorNode(inputGroup) {
        const el = this.getErrorNode(inputGroup);
        if (el) {
            el.parentNode.removeChild(el);
            this.toggleErrorClass(inputGroup);
        }
    },



  /**
   * Removes all error node and class from input group if exists within section
   *
   * @param {HTMLElement} section
   */
    removeErrorNodesFromSection(section) {
      [].forEach.call(this.getInputGroupsInSection(section), inputGroup => {
        this.removeErrorNode(inputGroup);
      });
    },



    /**
     * Creates and includes into DOM error node or updates error message
     *
     * @param {HTMLElement} inputGroup
     * @param {String} message
     */
    setErrorMessage(inputGroup, message) {
        let errorNode = this.getErrorNode(inputGroup);
        if (errorNode === false) {
            // container for error message doesn't exists, create new
            errorNode = this.createErrorNode();
            this.toggleErrorClass(inputGroup);
            this.insertErrorNode(inputGroup, errorNode)
        }
        // set or update error message
        errorNode.textContent = message;
    },



    /**
     * Marks input as valid
     *
     * @param {HTMLElement} inputGroup
     */
    setInputValid(inputGroup) {
      inputGroup.classList.add(this.config.classInputGroupSuccess);
    },



    /* ************************************************************************
     * SEARCH DOM
     */

    /**
     * DOM Algorithm - which inputs should be selected for validation
     *
     * @param {HTMLElement} inputGroup
     *
     * @returns {HTMLElement|boolean}
     */
    getInput(inputGroup) {
        return inputGroup.querySelector(this.config.selectorInput) || false;
    },



    /**
     * Find closest parent inputGroup element by Input element
     *
     * @param {HTMLElement} input
     *
     * @returns {HTMLElement}
     */
    getInputGroup(input) {
        let el = input;
        while ((el = el.parentNode) && !el.classList.contains(this.config.classInputGroup));
        return el;
    },



    /**
     * Find inputs in section
     *
     * @meta if second argument true - return object with meta information to use during promise resolving
     *
     * @param {HTMLElement} node
     * @param {boolean} resolving = false
     *
     * @returns {Array|Object}
     */
    getInputsInSection(node, resolving = false) {
        const inputGroups = this.getInputGroupsInSection(node);
        let inputs;
        if (resolving) {
            inputs = {
                inputs: {},
                invalidInputs: {},
                length: 0,
                unresolvedLength: 0,
                invalidLength: 0
            };
        } else {
            inputs = [];
        }
        for (let k = 0; k < inputGroups.length; k++) {
            const input = this.getInput(inputGroups[k]);
            if (input === false) {
                console.error(inputGroups[k]);
                throw new Error('Bunny Validation: Input group has no input');
            }
            if (resolving) {
                inputs.inputs[k] = {
                    input: input,
                    isValid: null
                };
                inputs.length++;
                inputs.unresolvedLength++;
            } else {
                inputs.push(input);
            }
        }
        return inputs;
    },



    /**
     * Find label associated with input within input group
     *
     * @param {HTMLElement} inputGroup
     *
     * @returns {HTMLElement|boolean}
     */
    getLabel(inputGroup) {
        return inputGroup.getElementsByTagName('label')[0] || false;
    },



    /**
     * Find all input groups within section
     *
     * @param {HTMLElement} node
     *
     * @returns {HTMLCollection}
     */
    getInputGroupsInSection(node) {
        return node.getElementsByClassName(this.config.classInputGroup);
    }

};
/* unused harmony export ValidationUI */


const Validation = {

    validators: ValidationValidators,
    lang: ValidationLang,
    ui: ValidationUI,

    init(form, inline = false) {
        // disable browser built-in validation
        form.setAttribute('novalidate', '');

        form.addEventListener('submit', e => {
            e.preventDefault();
            const submitBtns = form.querySelectorAll('[type="submit"]');
            [].forEach.call(submitBtns, submitBtn => {
                submitBtn.disabled = true;
            });
            this.validateSection(form).then(result => {
                [].forEach.call(submitBtns, submitBtn => {
                    submitBtn.disabled = false;
                });
                if (result === true) {
                    form.submit();
                } else {
                    this.focusInput(result[0]);
                }
            })
        });

        if (inline) {
            this.initInline(form);
        }
    },

    initInline(node) {
        const inputs = this.ui.getInputsInSection(node);
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                this.checkInput(input).catch(e => {});
            })
        })
    },

    validateSection(node) {
        if (node.__bunny_validation_state === undefined) {
            node.__bunny_validation_state = true;
        } else {
            throw new Error('Bunny Validation: validation already in progress.');
        }
        return new Promise(resolve => {
            const resolvingInputs = this.ui.getInputsInSection(node, true);
            if (resolvingInputs.length === 0) {
                // nothing to validate, end
                this._endSectionValidation(node, resolvingInputs, resolve);
            } else {
                // run async validation for each input
                // when last async validation will be completed, call validSection or invalidSection
                let promises = [];
                for(let i = 0; i < resolvingInputs.length; i++) {
                    const input = resolvingInputs.inputs[i].input;

                    this.checkInput(input).then(() => {
                        this._addValidInput(resolvingInputs, input);
                        if (resolvingInputs.unresolvedLength === 0) {
                            this._endSectionValidation(node, resolvingInputs, resolve);
                        }
                    }).catch(errorMessage => {
                        this._addInvalidInput(resolvingInputs, input);
                        if (resolvingInputs.unresolvedLength === 0) {
                            this._endSectionValidation(node, resolvingInputs, resolve);
                        }
                    });
                }

                // if there are not resolved promises after 3s, terminate validation, mark pending inputs as invalid
                setTimeout(() => {
                    if (resolvingInputs.unresolvedLength > 0) {
                        let unresolvedInputs = this._getUnresolvedInputs(resolvingInputs);
                        for (let i = 0; i < unresolvedInputs.length; i++) {
                            const input = unresolvedInputs[i];
                            const inputGroup = this.ui.getInputGroup(input);
                            this._addInvalidInput(resolvingInputs, input);
                            this.ui.setErrorMessage(inputGroup, 'Validation terminated after 3s');
                            if (resolvingInputs.unresolvedLength === 0) {
                                this._endSectionValidation(node, resolvingInputs, resolve);
                            }
                        }
                    }
                }, 3000);
            }
        });
    },

    focusInput(input, delay = 500, offset = -50) {
        __WEBPACK_IMPORTED_MODULE_3__BunnyElement__["a" /* BunnyElement */].scrollTo(input, delay, offset);
        input.focus();
        if (
            input.offsetParent !== null
            && input.setSelectionRange !== undefined
            && ['text', 'search', 'url', 'tel', 'password'].indexOf(input.type) !== -1
            && typeof input.setSelectionRange === 'function'
        ) {
            input.setSelectionRange(input.value.length, input.value.length);
        }
    },

    checkInput(input) {
        return new Promise((valid, invalid) => {
            this._checkInput(input, 0, valid, invalid);
        });

    },

    _addValidInput(resolvingInputs, input) {
        resolvingInputs.unresolvedLength--;
        for (let k in resolvingInputs.inputs) {
            if (input === resolvingInputs.inputs[k].input) {
                resolvingInputs.inputs[k].isValid = true;
                break;
            }
        }
    },

    _addInvalidInput(resolvingInputs, input) {
        resolvingInputs.unresolvedLength--;
        resolvingInputs.invalidLength++;
        for (let k in resolvingInputs.inputs) {
            if (input === resolvingInputs.inputs[k].input) {
                resolvingInputs.inputs[k].isValid = false;
                resolvingInputs.invalidInputs[k] = input;
                break;
            }
        }
    },

    _getUnresolvedInputs(resolvingInputs) {
        let unresolvedInputs = [];
        for (let k in resolvingInputs.inputs) {
            if (!resolvingInputs.inputs[k].isValid) {
                unresolvedInputs.push(resolvingInputs.inputs[k].input);
            }
        }
        return unresolvedInputs;
    },

    _endSectionValidation(node, resolvingInputs, resolve) {
        delete node.__bunny_validation_state;

        if (resolvingInputs.invalidLength === 0) {
            // form or section is valid
            return resolve(true);
        } else {
            let invalidInputs = [];
            for(let k in resolvingInputs.invalidInputs) {
                invalidInputs.push(resolvingInputs.invalidInputs[k]);
            }
            // form or section has invalid inputs
            return resolve(invalidInputs);
        }
    },

    _checkInput(input, index, valid, invalid) {
        const validators = Object.keys(this.validators);
        const currentValidatorName = validators[index];
        const currentValidator = this.validators[currentValidatorName];
        currentValidator(input).then(() => {
            index++;
            if (validators[index] !== undefined) {
                this._checkInput(input, index, valid, invalid)
            } else {
                const inputGroup = this.ui.getInputGroup(input);
                // if has error message, remove it
                this.ui.removeErrorNode(inputGroup);

                if (input.form && input.form.hasAttribute('showvalid')) {
                    // mark input as valid
                    this.ui.setInputValid(inputGroup);
                }

                valid();
            }
        }).catch(data => {
            // Check if Data is system Exception
            if (data !== undefined && data.message !== undefined) {
                throw data;
            }

            // get input group and label
            const inputGroup = this.ui.getInputGroup(input);
            const label = this.ui.getLabel(inputGroup);

            // get error message
            const errorMessage = this._getErrorMessage(currentValidatorName, input, label, data);

            // set error message
            this.ui.setErrorMessage(inputGroup, errorMessage);
            invalid(errorMessage);
        });
    },

    _getErrorMessage(validatorName, input, label, data) {
        let message = '';
        if (typeof data === 'string') {
            // if validator returned string (from ajax for example), use it
            message = data;
        } else {
            if (this.lang[validatorName] === undefined) {
                throw new Error('Bunny Validation: Lang message not found for validator: ' + validatorName);
            }
            message = this.lang[validatorName];
        }

        // replace params in error message
        message = message.replace('{label}', this._getInputTitle(input, label));

        for (let paramName in data) {
            message = message.replace('{' + paramName + '}', data[paramName]);
        }
        return message;
    },

    _getInputTitle(input, label) {
      if (label !== false) {
        return label.textContent;
      } else if (input.placeholder && input.placeholder !== '') {
        return input.placeholder;
      } else if (input.getAttribute('aria-label') && input.getAttribute('aria-label') !== '') {
        return input.getAttribute('aria-label');
      } else if (input.name && input.name !== '') {
        return input.name;
      } else {
        return '';
      }
    }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = Validation;


document.addEventListener('DOMContentLoaded', () => {
    [].forEach.call(document.forms, form => {
        if (form.getAttribute('validator') === 'bunny') {
            const inline = form.hasAttribute('validator-inline');
            Validation.init(form, inline);
        }
    });
});


/***/ }),
/* 10 */
/*!************************************************!*\
  !*** ./node_modules/bunnyjs/src/file/image.js ***!
  \************************************************/
/*! exports provided: BunnyImage */
/*! exports used: BunnyImage */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__file__ = __webpack_require__(/*! ./file */ 1);



/**
 * @component BunnyImage
 * Wrapper for Image object representing <img> tag, uses Canvas and BunnyFile
 *
 */
const BunnyImage = {

  IMG_CONVERT_TYPE: 'image/jpeg',
  IMG_QUALITY: 0.7,

  // SECTION: get Image object via different sources

  /**
   * Downloads image by any URL or converts from Blob, should work also for non-CORS domains
   *
   * @param {String|Blob} urlOrBlob
   * @returns {Promise} success(Image object), fail(error)
   */
  getImage(urlOrBlob) {
    if (typeof urlOrBlob === 'string') {
      return this.getImageByURL(urlOrBlob);
    } else {
      return this.getImageByBlob(urlOrBlob);
    }
  },

  /**
   * Downloads image by any URL, should work also for non-CORS domains
   *
   * @param {String} URL
   * @returns {Promise} success(Image object), fail(error)
   */
  getImageByURL(URL) {
    return this._toImagePromise(URL, true);
  },

  _toImagePromise(src, crossOrigin = false) {
    const img = new Image;
    const p = new Promise( (ok, fail) => {
      img.onload = () => {
        ok(img);
      };
      img.onerror = (e) => {
        fail(e);
      }
    });
    if (crossOrigin) {
      img.crossOrigin = 'Anonymous';
    }
    img.src = src;
    return p;
  },

  getImageByBlob(blob) {
    const url = __WEBPACK_IMPORTED_MODULE_0__file__["a" /* BunnyFile */].getBlobLocalURL(blob);
    return this._toImagePromise(url);
  },

  getImageByBase64(base64) {
    const url = base64;
    return this._toImagePromise(url);
  },

  getImageByCanvas(canvas) {
    const url = canvas.toDataURL(this.IMG_CONVERT_TYPE, this.IMG_QUALITY);
    return this._toImagePromise(url);
  },




  // SECTION:: create different sources from Image object

  imageToCanvas(img, width = null, height = null) {
    if (!img.complete) {
      throw new Error('Can not create canvas from Image. Image is not loaded yet.');
    }
    const canvas = document.createElement("canvas");
    if (width === null && height === null) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      canvas.getContext("2d").drawImage(img, 0, 0);
    } else {
      canvas.width = width;
      canvas.height = height;
      canvas.getContext("2d").drawImage(img, 0, 0, width, height);
    }
    return canvas;
  },

  /**
   *
   * @param {Image|HTMLImageElement} img
   * @param {Number?} width
   * @param {Number?} height
   * @returns {string}
   */
  imageToBase64(img, width = null, height = null) {
    return this.imageToCanvas(img, width, height).toDataURL(this.IMG_CONVERT_TYPE, this.IMG_QUALITY);
  },

  /**
   *
   * @param {Image|HTMLImageElement} img
   * @param {Number?} width
   * @param {Number?} height
   * @returns {Blob}
   */
  imageToBlob(img, width = null, height = null) {
    return __WEBPACK_IMPORTED_MODULE_0__file__["a" /* BunnyFile */].base64ToBlob(this.imageToBase64(img, width, height));
  },




  // SECTION: basic Image statistics and info functions

  getImageURL(img) {
    return img.src;
  },

  getImageWidth(img) {
    if (!img.complete) {
      throw new Error('Can not get Image.width. Image is not loaded yet.');
    }
    return img.width;
  },

  getImageHeight(img) {
    if (!img.complete) {
      throw new Error('Can not get Image.height. Image is not loaded yet.');
    }
    return img.height;
  },




  // SECTION: basic Image data math functions

  getImageNewAspectSizes(img, max_width, max_height) {
    const img_width = this.getImageWidth(img);
    const img_height = this.getImageHeight(img);
    if (img_width === 0 || img_height === 0) {
      throw new Error('Image width or height is 0 in BunnyImage.getImageNewAspectSizes().')
    }
    const ratio = Math.min(max_width / img_width, max_height / img_height);

    return {
      width: Math.floor(img_width * ratio),
      height: Math.floor(img_height * ratio)
    };
  },





  // SECTION: basic Image manipulation
  // returns canvas

  /**
   * Resize image
   * @param {Image} img
   * @param {Number} max_width
   * @param {Number} max_height
   * @returns {Promise} success(Image), fail(error)
   */
  resizeImage(img, max_width, max_height) {
    const sizes = this.getImageNewAspectSizes(img, max_width, max_height);
    const width = sizes.width;
    const height = sizes.height;
    const canvas = this.imageToCanvas(img, width, height);
    return canvas;
    //return this.getImageByCanvas(canvas);
  },

  resizeCanvas(canvas, width, height = null) {
    if (height === null) height = width;
    const tmpCanvas = document.createElement('canvas');
    const tmpCtx = tmpCanvas.getContext('2d');
    tmpCanvas.width = width;
    tmpCanvas.height = height;
    tmpCtx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, width, height);
    return tmpCanvas;
  },

  crop(img, x, y, width, height = null) {
    if (height === null) height = width;
    const proportion =  img.naturalWidth / img.clientWidth;
    const canvas = document.createElement('canvas');
    const sizeX = width * proportion;
    const sizeY = height * proportion;
    canvas.width = sizeX;
    canvas.height = sizeY;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, x * proportion, y * proportion, sizeX, sizeY, 0, 0, sizeX, sizeY);
    return canvas;
  },

  cropByCursor(img, cursor) {
    return this.crop(img, cursor.offsetLeft, cursor.offsetTop, cursor.clientWidth, cursor.clientHeight);
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = BunnyImage;



/***/ }),
/* 11 */
/*!************************************************!*\
  !*** ./node_modules/bunnyjs/src/bunny.ajax.js ***!
  \************************************************/
/*! exports provided: Ajax */
/*! exports used: Ajax */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Ajax; });


/**
 * Base object Ajax
 */
var Ajax = {

    /**
     * Sends an async HTTP (AJAX) request or if last parameter is false - returns created instance
     * with ability to modify native XMLHttpRequest (.request property) and manually send request when needed.
     *
     * @param {string} method - HTTP method (GET, POST, HEAD, ...)
     * @param {string} url - URI for current domain or full URL for cross domain AJAX request
     *        Please note that in cross domain requests only GET, POST and HEAD methods allowed as well as
     *        only few headers available. For more info visit
     *        https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
     * @param {object} data - key: value pair of data to send. Data is automatically URL encoded
     * @param {callback(responseText)} on_success - callback on response with status code 200
     * @param {callback(responseText, responseStatusCode)} on_error = null - custom handler
     *        for response with status code different from 200
     * @param {object} headers = {} - key: value map of headers to send
     * @param {boolean} do_send = true - instantly makes requests
     *
     * @returns {Object}
     */
    create(method, url, data, on_success, on_error = null, headers = {}, do_send = true) {

        var t = Object.create(this);
        t.method = method;
        t.url = url;
        t.data = data;
        t.request = new XMLHttpRequest();
        t.onSuccess = on_success;
        t.onError = on_error;
        t.headers = headers;
        t.request.onreadystatechange = function() {
            if (t.request.readyState === XMLHttpRequest.DONE) {
                if (t.request.status === 200) {
                    t.onSuccess(t.request.responseText);
                } else {
                    if (t.onError !== null) {
                        t.onError(t.request.responseText, t.request.status);
                    } else {
                        console.error('Bunny AJAX error: unhandled error with response status ' + t.request.status + ' and body: ' + t.request.responseText);
                    }
                }
            }
        };

        if (do_send) {
            t.send();
        }

        return t;
    },

    /**
     * Should be called on instance created with factory Ajax.create() method
     * Opens request, applies headers, builds data URL encoded string and sends request
     */
    send() {

        this.request.open(this.method, this.url);

        for (var header in this.headers) {
            this.request.setRequestHeader(header, this.headers[header]);
        }

        var str_data = '';

        if (this.data instanceof FormData) {
            this.request.send(this.data);
        } else {
            for(var name in this.data) {
                str_data = str_data + name + '=' + encodeURIComponent(this.data[name]) + '&';
            }
            this.request.send(str_data);
        }

    },

    /**
     * Sends a form via ajax POST with header Content-Type: application/x-www-form-urlencoded
     * Data is automatically taken form all form input values
     *
     * @param {object} form_el - Form document element
     * @param {callback(responseText)} on_success - callback for status code 200
     * @param {callback(responseText, responseStatusCode)} on_error = null - custom handler for non 200 status codes
     * @param {object} headers = {'Content-Type': 'application/x-www-form-urlencoded'} - key: value map of headers
     */
    sendForm(form_el, on_success, on_error = null, headers = {'Content-Type': 'application/x-www-form-urlencoded'}) {
        var data = {};
        form_el.querySelectorAll('[name]').forEach(function(input){
            data[input.getAttribute('name')] = input.value;
        });
        this.create('POST', form_el.getAttribute('action'), data, on_success, on_error, headers, true);
    },

    /**
     * Sends a form via ajax POST with header Content-Type: multipart/form-data which is required for file uploading
     * Data is automatically taken form all form input values
     *
     * @param {object} form_el - Form document element
     * @param {callback(responseText)} on_success - callback for status code 200
     * @param {callback(responseText, responseStatusCode)} on_error = null - custom handler for non 200 status codes
     * @param {object} headers = {'Content-Type': 'multipart/form-data'} - key: value map of headers
     */
    sendFormWithFiles(form_el, on_success, on_error = null, headers = {'Content-Type': 'multipart/form-data'}) {
        this.sendForm(form_el, on_success, on_error, headers);
    },

    /**
     * Sends a simple GET request. By default adds header X-Requested-With: XMLHttpRequest
     * which allows back-end applications to detect if request is ajax.
     * However for making a cross domain requests this header might not be acceptable
     * and in this case pass an empty object {} as a last argument to send no headers
     *
     * @param {string} url - URI or full URL for cross domain requests
     * @param {callback(responseText)} on_success - callback for status code 200
     * @param {callback(responseText, responseStatusCode)} on_error = null - custom handler for non 200 status codes
     * @param headers = {'X-Requested-With': 'XMLHttpRequest'} key: value map of headers
     */
    get: function(url, on_success, on_error = null, headers = {'X-Requested-With': 'XMLHttpRequest'}) {
        this.create('GET', url, {}, on_success, on_error, headers, true);
    },

    post: function(url, data, on_success, on_error = null, headers = {'X-Requested-With': 'XMLHttpRequest'}) {
        this.create('POST', url, data, on_success, on_error, headers, true);
    }

};


/***/ }),
/* 12 */
/*!**************************************************!*\
  !*** ./node_modules/bunnyjs/src/BunnyElement.js ***!
  \**************************************************/
/*! exports provided: BunnyElement */
/*! exports used: BunnyElement */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

const BunnyElement = {

  getCurrentDocumentPosition(top = true) {
    //return Math.abs(document.body.getBoundingClientRect().y);
    return top ? window.scrollY : window.scrollY + window.innerHeight;
  },

  getPosition(el, top = true) {
    let curTop = 0;
    const originalEl = el;
    if (el.offsetParent) {
      do {
        curTop += el.offsetTop;
      } while (el = el.offsetParent);
    }
    if (!top) {
      curTop += originalEl.offsetHeight;
    }
    return curTop;
  },

  isInViewport(el, offset = 0, top = false) {
    const docPos = this.getCurrentDocumentPosition(top);
    const elPos = this.getPosition(el, top);
    return elPos + offset <= docPos;
  },

  scrollToIfNeeded(target, viewportOffset = 0, viewportTop = false, duration = 500, scrollOffset = 0) {
    if (!this.isInViewport(target, viewportOffset, viewportTop)) {
      this.scrollTo(target, duration, scrollOffset);
    }
  },

  /**
   * Smooth scrolling to DOM element or to relative window position
   * If target is string it should be CSS selector
   * If target is object it should be DOM element
   * If target is number - it is used to relatively scroll X pixels form current position
   *
   * Based on https://www.sitepoint.com/smooth-scrolling-vanilla-javascript/
   *
   * @param {HTMLElement, string, number} target
   * @param {Number|function} duration
   * @param {Number} offset
   * @param {HTMLElement} rootElement
   */
  scrollTo(target, duration = 500, offset = 0, rootElement = window) {
    return new Promise(onAnimationEnd => {

      let element;
      if (typeof target === 'string') {
        element = document.querySelector(target);
      } else if (typeof target === 'object') {
        element = target;
      } else {
        // number
        element = null;
      }

      if (element !== null && element.offsetParent === null) {
        // element is not visible, scroll to top of parent element
        element = element.parentNode;
      }

      const start = rootElement === window ? window.pageYOffset : rootElement.scrollTop;
      let distance = 0;
      if (element !== null) {
        distance = element.getBoundingClientRect().top;
      } else {
        // number
        distance = target;
      }

      distance = distance + offset;

      if (typeof duration === 'function') {
        duration = duration(distance);
      }

      let timeStart = 0;
      let timeElapsed = 0;

      requestAnimationFrame( time => {
        timeStart = time;
        loop(time);
      });

      function setScrollYPosition(el, y) {
        if (el === window) {
          window.scrollTo(0, y);
        } else {
          el.scrollTop = y;
        }
      }

      function loop(time) {
        timeElapsed = time - timeStart;
        setScrollYPosition(rootElement, easeInOutQuad(timeElapsed, start, distance, duration));
        if (timeElapsed < duration) {
          requestAnimationFrame(loop);
        } else {
          end();
        }
      }

      function end() {
        setScrollYPosition(rootElement, start + distance);
        onAnimationEnd();
      }

      // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
      function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }
    });
  },

  hide(element) {
    return new Promise(resolve => {
      element.style.opacity = 0;
      element.style.overflow = 'hidden';
      const steps = 40;
      const step_delay_ms = 10;
      const height = element.offsetHeight;
      const height_per_step = Math.round(height / steps);
      element._originalHeight = height;
      for (let k = 1; k <= steps; k++) {
        if (k === steps) {
          setTimeout(() => {
            element.style.display = 'none';
            element.style.height = '0px';
            resolve();
          }, step_delay_ms * k)
        } else {
          setTimeout(() => {
            element.style.height = height_per_step * (steps - k) + 'px';
          }, step_delay_ms * k);
        }
      }
    })
  },

  show(element) {
    if (element._originalHeight === undefined) {
      throw new Error('element._originalHeight is undefined. Save original height when hiding element or use BunnyElement.hide()');
    }
    return new Promise(resolve => {
      element.style.display = '';
      const steps = 40;
      const step_delay_ms = 10;
      const height = element._originalHeight;
      const height_per_step = Math.round(height / steps);
      delete element._originalHeight;
      for (let k = 1; k <= steps; k++) {
        if (k === steps) {
          setTimeout(() => {
            element.style.opacity = 1;
            element.style.height = '';
            element.style.overflow = '';
            resolve();
          }, step_delay_ms * k)
        } else {
          setTimeout(() => {
            element.style.height = height_per_step * k + 'px';
          }, step_delay_ms * k);
        }
      }
    })
  },

  remove(element) {
    element.parentNode.removeChild(element);
  }

};
/* harmony export (immutable) */ __webpack_exports__["a"] = BunnyElement;



/***/ })
/******/ ]);
//# sourceMappingURL=application-3e8b5a99e6f2948aa4d3.js.map