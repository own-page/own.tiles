import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import IFrame from 'utils/IFrame';
var EVENTBRITE_DOMAIN = 'eventbrite.com';
var parseLink = function (rawLink) {
    if (typeof rawLink !== 'string') {
        console.error('Invalid link provided:', rawLink);
        return '';
    }
    try {
        var url = new URL(rawLink, "https://".concat(EVENTBRITE_DOMAIN));
        if (!url.hostname.includes(EVENTBRITE_DOMAIN)) {
            console.error('Not a valid Eventbrite link:', rawLink);
            return '';
        }
        return url.pathname;
    }
    catch (error) {
        console.error('Invalid URL:', rawLink);
        return '';
    }
};
var FALLBACK_LINK = 'https://www.eventbrite.com/e/sample-event-1234567890';
export var Eventbrite = function (props) {
    var link = parseLink(props.link || FALLBACK_LINK);
    return (_jsx(IFrame, { src: "https://www.eventbrite.com/e".concat(link), width: "100%", height: "100%", frameBorder: "0", allowFullScreen: true, allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", loading: "lazy" }));
};
export var tile = {
    name: 'eventbrite',
    license: { type: 'MIT', fullText: 'MIT' },
    origin: 'https://eventbrite.com/',
    minDimensions: {
        w: 4,
        h: 2
    },
    maxDimensions: function () {
        // const link = parseLink(props.link || FALLBACK_LINK);
        return {
            w: Infinity,
            h: Infinity
        };
    },
    props: {
        link: { slowLoad: true }
    },
    Component: memo(Eventbrite)
};
