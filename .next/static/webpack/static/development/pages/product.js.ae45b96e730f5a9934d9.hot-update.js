webpackHotUpdate("static/development/pages/product.js",{

/***/ "./components/product/Product.js":
/*!***************************************!*\
  !*** ./components/product/Product.js ***!
  \***************************************/
/*! exports provided: productQuery, Product */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "productQuery", function() { return productQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Product", function() { return Product; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral */ "./node_modules/@babel/runtime-corejs2/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_apollo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-apollo */ "./node_modules/react-apollo/react-apollo.esm.js");
/* harmony import */ var recompose_compose__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! recompose/compose */ "./node_modules/recompose/compose.js");
/* harmony import */ var recompose_compose__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(recompose_compose__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! next/router */ "./node_modules/next/router.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! graphql-tag */ "./node_modules/graphql-tag/src/index.js");
/* harmony import */ var graphql_tag__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(graphql_tag__WEBPACK_IMPORTED_MODULE_5__);

var _jsxFileName = "/home/user/projects/eshop-frontend/components/product/Product.js";


function _templateObject() {
  var data = Object(_babel_runtime_corejs2_helpers_esm_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__["default"])(["\n  query productQuery($handle: String!) {\n    productByHandle(handle: $handle) {\n      id\n      handle\n      title(language: \"en\")\n      price\n      imgBig\n      descriptionLong\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}





var productQuery = graphql_tag__WEBPACK_IMPORTED_MODULE_5___default()(_templateObject());

var InnerComponent = function InnerComponent(_ref) {
  var router = _ref.router;
  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react_apollo__WEBPACK_IMPORTED_MODULE_2__["Query"], {
    query: productQuery,
    variables: {
      handle: router.query.handle
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    },
    __self: this
  }, function (_ref2) {
    var loading = _ref2.loading,
        error = _ref2.error,
        product = _ref2.data.product,
        fetchMore = _ref2.fetchMore;
    if (error) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(ErrorMessage, {
      message: "Error loading posts.",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 22
      },
      __self: this
    });
    if (loading) return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 23
      },
      __self: this
    }, "Loading");
    return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("section", {
      className: "ftco-section bg-light",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "container",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "row",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 28
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "col-lg-6 mb-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 29
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "images/menu-2.jpg",
      className: "image-popup",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 30
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
      src: "".concat("http://localhost:5000").concat(product.imgBig),
      className: "img-fluid",
      alt: "".concat(product.title, " image"),
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "col-lg-6 product-details pl-md-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 34
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 35
      },
      __self: this
    }, product.title), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      className: "price",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: this
    }, "\u20AC", price)), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 37
      },
      __self: this
    }, product.descriptionLong), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "row mt-4",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 38
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "col-md-6",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 39
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "form-group d-flex",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 40
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "select-wrap",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 41
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "icon",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "ion-ios-arrow-down",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("select", {
      name: "",
      id: "",
      className: "form-control",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    }, "Small"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }, "Medium"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: this
    }, "Large"), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("option", {
      value: "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 47
      },
      __self: this
    }, "Extra Large"))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "w-100",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 52
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
      className: "input-group col-md-6 d-flex mb-3",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 53
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "input-group-btn mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 54
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      type: "button",
      className: "quantity-left-minus btn",
      "data-type": "minus",
      "data-field": "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 55
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "ion-ios-remove",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 56
      },
      __self: this
    }))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("input", {
      type: "text",
      id: "quantity",
      name: "quantity",
      className: "form-control input-number",
      value: "1",
      min: "1",
      max: "100",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 59
      },
      __self: this
    }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("span", {
      className: "input-group-btn ml-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 60
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("button", {
      type: "button",
      className: "quantity-right-plus btn",
      "data-type": "plus",
      "data-field": "",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 61
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("i", {
      className: "ion-ios-add",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 62
      },
      __self: this
    }))))), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("p", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("a", {
      href: "cart.html",
      className: "btn btn-primary py-3 px-5",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 67
      },
      __self: this
    }, "Add to Cart"))))));
  });
};

var Product = recompose_compose__WEBPACK_IMPORTED_MODULE_3___default()(next_router__WEBPACK_IMPORTED_MODULE_4__["withRouter"])(InnerComponent);

/***/ })

})
//# sourceMappingURL=product.js.ae45b96e730f5a9934d9.hot-update.js.map