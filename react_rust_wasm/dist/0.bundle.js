(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "./build/react_rust_wasm.js":
/*!**********************************!*\
  !*** ./build/react_rust_wasm.js ***!
  \**********************************/
/*! exports provided: rust_alert, __wbg_alert_e3f8b32a72cc3799 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"rust_alert\", function() { return rust_alert; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_alert_e3f8b32a72cc3799\", function() { return __wbg_alert_e3f8b32a72cc3799; });\n/* harmony import */ var _react_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react_rust_wasm_bg */ \"./build/react_rust_wasm_bg.wasm\");\n\n/**\n* @returns {void}\n*/\n\nfunction rust_alert() {\n  return _react_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"rust_alert\"]();\n}\nlet cachedTextDecoder = new TextDecoder('utf-8');\nlet cachegetUint8Memory = null;\n\nfunction getUint8Memory() {\n  if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== _react_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n    cachegetUint8Memory = new Uint8Array(_react_rust_wasm_bg__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n  }\n\n  return cachegetUint8Memory;\n}\n\nfunction getStringFromWasm(ptr, len) {\n  return cachedTextDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));\n}\n\nconst __wbg_alert_e3f8b32a72cc3799 = function (arg0, arg1) {\n  let varg0 = getStringFromWasm(arg0, arg1);\n  alert(varg0);\n};\n\n//# sourceURL=webpack:///./build/react_rust_wasm.js?");

/***/ }),

/***/ "./build/react_rust_wasm_bg.wasm":
/*!***************************************!*\
  !*** ./build/react_rust_wasm_bg.wasm ***!
  \***************************************/
/*! exports provided: memory, rust_alert */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./react_rust_wasm.js */ \"./build/react_rust_wasm.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///./build/react_rust_wasm_bg.wasm?");

/***/ })

}]);