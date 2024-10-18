import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo } from 'react';
import IFrame from 'utils/IFrame';
import { InnerOwnTile } from 'InnerOwnTile';
var GOOGLE_CALENDAR_DOMAIN = 'calendar.google.com';
var parseEmail = function (rawEmail) {
    if (typeof rawEmail !== 'string') {
        console.error('Invalid email provided:', rawEmail);
        return '';
    }
    try {
        // Simple regex to validate email format
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(rawEmail)) {
            console.error('Invalid email format:', rawEmail);
            return '';
        }
        // Assuming the email is valid, return it directly
        return rawEmail;
    }
    catch (error) {
        console.error('Unexpected error during email validation:', error);
        return '';
    }
};
// email address to the public austrian holidays calendar
var FALLBACK_EMAIL = 'ht3jlfaac5lfd6263ulfh4tql8@group.calendar.google.com';
export var GoogleCalendar = function (props) {
    var useColor = props.theme === undefined || props.theme === 'white';
    var email = parseEmail(props.email || FALLBACK_EMAIL);
    var view = props.view || 'week';
    var title = props.title || 'My Calendar';
    var themeStyle = useColor
        ? { filter: 'none' }
        : { filter: 'invert(90%) hue-rotate(180deg)' }; // hacky way to make the calendar dark mode
    return (_jsxs(InnerOwnTile, { className: "size-full px-4 pt-10 overflow-clip relative bg-white", style: themeStyle, children: [_jsx("div", { className: "text-[#0a0909c4]\n        absolute left-1/2 -translate-x-1/2 top-0 z-10\n        flex-center px-5 h-10 \n        font-['Plus_Jakarta_Sans'] font-medium text-base", children: title }), _jsx(IFrame, { src: "https://".concat(GOOGLE_CALENDAR_DOMAIN, "/calendar/embed?src=").concat(email, "&bgColor=ffffff&mode=").concat(view, "&showTitle=0&showPrint=0&showTz=0&showDate=0&showTabs=0&showCalendars=0"), width: "100%", height: "100%", frameBorder: "0", allowFullScreen: true, className: "rounded-3xl", 
                // sandbox="allow-scripts allow-forms allow-same-origin"
                allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", loading: "lazy" })] }));
};
export var tile = {
    name: 'google-calendar',
    license: { type: 'MIT', fullText: 'MIT' },
    origin: 'https://calendar.google.com/',
    minDimensions: {
        w: 4,
        h: 4
    },
    maxDimensions: function () {
        //const email = parseLink(props.email || FALLBACK_LINK);
        return {
            w: Infinity,
            h: Infinity
        };
    },
    props: {
        email: { slowLoad: true },
        title: { slowLoad: false },
        theme: { slowLoad: false },
        view: { slowLoad: true }
    },
    Component: memo(GoogleCalendar)
};
