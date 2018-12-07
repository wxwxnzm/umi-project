import qs from 'qs';
export const rootFontSizeSet = (baseFontSize, fontscale) => {
    var _baseFontSize = baseFontSize || 100;
        var _fontscale = fontscale || 1;
        var win = window;
        var doc = win.document;
        var ua = navigator.userAgent;
        var matches = ua.match(/Android[\S\s]+AppleWebkit\/(\d{3})/i);
        var UCversion = ua.match(/U3\/((\d+|\.){5,})/i);
        var isUCHd = UCversion && parseInt(UCversion[1].split('.').join(''), 10) >= 80;
        var isIos = navigator.appVersion.match(/(iphone|ipad|ipod)/gi);
        var dpr = win.devicePixelRatio || 1;
        if (!isIos && !(matches && matches[1] > 534) && !isUCHd) {
          // 如果非iOS, 非Android4.3以上, 非UC内核, 就不执行高清, dpr设为1;
          dpr = 1;
        }
        var scale = 1 / dpr;
  
        var metaEl = doc.querySelector('meta[name="viewport"]');
        if (!metaEl) {
          metaEl = doc.createElement('meta');
          metaEl.setAttribute('name', 'viewport');
          doc.head.appendChild(metaEl);
        }
        metaEl.setAttribute('content', 'width=device-width,user-scalable=no,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale);
        doc.documentElement.style.fontSize = _baseFontSize / 2 * dpr * _fontscale + 'px';
        window.viewportScale = dpr;
}
export const historyBackWithAnimation = () => {
    const dragView = document.getElementsByClassName('dragView')[0];
    const dragSuperView = document.getElementsByClassName('dragSuperView')[0];
    const l = document.documentElement.clientWidth;
    try {
      dragView.style.transition = 'all 200ms';
      dragView.style.transform = `translateX(${l}px)`;
      dragSuperView.style.transition = 'all 200ms';
      dragSuperView.style.transform = `translateX(${l}px)`;
      setTimeout(() => {
        window.history.back();
  
        const android = window.android;
        const u = window.navigator.userAgent;
        const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
        const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
        if (isAndroid) {
          if (android.historyBack) {
            android.historyBack();
          }
        } else if (isiOS) {
          /* call 原生方法*/
          /* eslint-disable*/
          if (window.webkit && window.webkit.messageHandlers.historyBack) {
            // WKWebView
            window.webkit.messageHandlers.historyBack.postMessage({ body: ''});
          }
          /* eslint-enable*/
        }
      }, 200);
    } catch (e) {
      window.history.back();
    }
  };
export const SkinType = getUrlParams('SkinType') || '';
function getUrlParams(paramName = '') {
  let paramStr = window.location.search.slice(1);
  return qs.parse(paramStr) ? qs.parse(paramStr)[paramName] : ''
}

export const loadJs  = (src) => {
  return new Promise(function(resolve, reject) {
      const script = document.createElement('script');
      script.src = src;
      script.type = 'text/javascript';
      document.body.appendChild(script);
      script.onload = () => {
          resolve(1);
      };
      script.onerror = () => {
          reject(0);
      }
  })
}