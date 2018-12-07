import React from 'react';
import { Router as DefaultRouter, Route, Switch } from 'react-router-dom';
import dynamic from 'umi/dynamic';
import renderRoutes from 'umi/_renderRoutes';


let Router = require('dva/router').routerRedux.ConnectedRouter;

let routes = [
  {
    "path": "/index.html",
    "exact": true,
    "component": require('../index/index.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('../index/index.js').default
  },
  {
    "path": "/studyCommentDetailEditor2.html",
    "exact": true,
    "component": require('../studyCommentDetailEditor2/index.js').default
  },
  {
    "component": () => React.createElement(require('D:/gjx_work/project/xb-mobile/node_modules/umi-build-dev/lib/plugins/404/NotFound.js').default, { pagesPath: 'pages', hasRoutesInConfig: false })
  }
];
window.g_plugins.applyForEach('patchRoutes', { initialValue: routes });

export default function() {
  return (
<Router history={window.g_history}>
      { renderRoutes(routes, {}) }
    </Router>
  );
}
