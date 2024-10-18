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
import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
function useOnce(f) {
    useEffect(function () {
        f();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
}
/**
 * Chrome hack that solved the following bug:
 * Chrome has the problem that it does not utilize the onLoad prop,
 ' therefore we have to introduce a side-effect sadly
 * @param props @see ChromHackProps
 */
var ChromeHack = function (props) {
    useOnce(props.loadProp);
    return _jsx(_Fragment, {});
};
var IFrame = function (props) {
    var _a = useState(false), isLoaded = _a[0], setIsLoaded = _a[1];
    var loaded = function () {
        setIsLoaded(true);
    };
    return (_jsx(_Fragment, { children: _jsx("iframe", __assign({}, props, { onLoad: loaded, style: __assign({ opacity: isLoaded ? 1 : 0, transition: 'opacity 1s ease-in-out' }, props.style), children: _jsx(ChromeHack, { loadProp: loaded }) })) }));
};
export default IFrame;
