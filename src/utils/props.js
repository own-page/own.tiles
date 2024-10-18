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
/** does one level deep merge of props */
export var mergeProps = function (a, b) {
    return Object.fromEntries(Object.entries(__assign(__assign({}, a), b)).map(function (_a) {
        var k = _a[0], v = _a[1];
        return [
            k,
            typeof v === 'object' && v ? __assign(__assign({}, a[k]), v) : v
        ];
    }));
};
export function isComplex(propInfo) {
    return propInfo.type === 'object' || propInfo.type === 'function';
}
export function getPropsInfo(componentInfo) {
    return processComponentInfo(componentInfo[0]);
}
function processComponentInfo(componentInfo) {
    var _a;
    var result = {};
    for (var _i = 0, _b = Object.entries(componentInfo.props); _i < _b.length; _i++) {
        var _c = _b[_i], key = _c[0], prop = _c[1];
        var type = void 0;
        if (prop.type.raw === 'boolean') {
            type = 'boolean';
        }
        else if (prop.type.name === 'enum') {
            type = prop.type.value.map(function (v) { return v.value.replace(/"/g, ''); });
        }
        else if (['number', 'string', 'object', 'function'].includes(prop.type.name)) {
            type = prop.type.name;
        }
        else {
            continue; // skip unknown types
        }
        result[key] = {
            description: prop.description || '',
            type: type,
            required: prop.required || false,
            defaultValue: (_a = prop.defaultValue) === null || _a === void 0 ? void 0 : _a.value,
            ogInfo: prop
        };
    }
    return result;
}
