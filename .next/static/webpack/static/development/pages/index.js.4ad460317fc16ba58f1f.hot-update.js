webpackHotUpdate("static/development/pages/index.js",{

/***/ "./components/index/Index.js":
/*!***********************************!*\
  !*** ./components/index/Index.js ***!
  \***********************************/
/*! exports provided: indexContentQuery, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "indexContentQuery", function() { return indexContentQuery; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.esm.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ErrorMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ErrorMessage */ "./components/ErrorMessage.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/get */ "./node_modules/lodash/get.js");
/* harmony import */ var lodash_get__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_get__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _Products__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Products */ "./components/index/Products.js");
/* harmony import */ var _MainImage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./MainImage */ "./components/index/MainImage.js");
/* harmony import */ var _About__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./About */ "./components/index/About.js");
/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../constants */ "./constants.js");

var _jsxFileName = "/home/user/projects/eshop-frontend/components/index/Index.js";


function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  query indexContentQuery {\n    contnetsByGroup(group: \"index\") {\n      id\n      handle\n      group\n      title(language: \"en\")\n      subTitle(language: \"en\")\n      paragraph(language: \"en\")\n      img(language: \"en\") {\n        alt\n        url\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}









var indexContentQuery = graphql_tag__WEBPACK_IMPORTED_MODULE_3___default()(_templateObject());
/* harmony default export */ __webpack_exports__["default"] = (function () {
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_2__["Query"], {
    query: indexContentQuery,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    },
    __self: this
  }, function (_ref) {
    var loading = _ref.loading,
        error = _ref.error,
        contnetsByGroup = _ref.data.contnetsByGroup,
        fetchMore = _ref.fetchMore;
    if (error) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_ErrorMessage__WEBPACK_IMPORTED_MODULE_4__["default"], {
      message: "Error loading posts.",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    });
    if (loading) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, "Loading");
    var contentObj = contnetsByGroup.reduce(function (acc, contentObj) {
      acc[contentObj.handle] = contentObj;
      return acc;
    }, {});
    var mainImageContent = {
      img: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'mainImage.img[0]', _constants__WEBPACK_IMPORTED_MODULE_9__["default"].unavailableImage),
      title: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'mainImage.title[0]', ''),
      subTitle: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'mainImage.subTitle[0]', '')
    };
    var productsContent = {
      title: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'index_products.title[0]', ''),
      subTitle: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'index_products.subTitle[0]', '')
    };
    var aboutContent = {
      img: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'index_about.img[0]', _constants__WEBPACK_IMPORTED_MODULE_9__["default"].unavailableImage),
      title: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'index_about.title[0]', ''),
      mainText: lodash_get__WEBPACK_IMPORTED_MODULE_5___default()(contentObj, 'index_about.paragraph', [''])
    };
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_MainImage__WEBPACK_IMPORTED_MODULE_7__["MainImage"], {
      img: mainImageContent.img,
      title: mainImageContent.title,
      subTitle: mainImageContent.subTitle,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 51
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_Products__WEBPACK_IMPORTED_MODULE_6__["Products"], {
      title: productsContent.title,
      subTitle: productsContent.subTitle,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_About__WEBPACK_IMPORTED_MODULE_8__["About"], {
      img: aboutContent.img,
      title: aboutContent.title,
      mainText: aboutContent.mainText,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }));
  });
});

/***/ })

})
//# sourceMappingURL=index.js.4ad460317fc16ba58f1f.hot-update.js.map