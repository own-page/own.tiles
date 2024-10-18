var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
// This is not needed nor compulsory for OwnTiles to have! just a nice helper to get equal design
// TODO: probably transition padding and border radius to use variables that are defined in the style
export var InnerOwnTile = function (_a) {
    var _b = _a.Component, Component = _b === void 0 ? 'div' : _b, // Default to 'div'
    children = _a.children, className = _a.className, rest = __rest(_a, ["Component", "children", "className"]);
    return (_jsx(Component
    // this p-4 gap here is inside the element (e.g. so that text has border until edge of tile)
    , __assign({ 
        // this p-4 gap here is inside the element (e.g. so that text has border until edge of tile)
        className: "p-4 rounded-[2.25rem] w-full h-full overflow-hidden relative " +
            (className || '') }, rest, { children: children })));
};
