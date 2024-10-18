import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { memo } from 'react';
import GitHubCalendar from 'react-github-calendar';
import { GithubLogo } from '@phosphor-icons/react/dist/ssr/GithubLogo';
import { InnerOwnTile } from 'InnerOwnTile';
var selectLastHalfYear = function (showMonths) { return function (contributions) {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var shownMonths = showMonths;
    return contributions.filter(function (activity) {
        var date = new Date(activity.date);
        var monthOfDay = date.getMonth();
        return (date.getFullYear() === currentYear &&
            monthOfDay > currentMonth - shownMonths &&
            monthOfDay <= currentMonth);
    });
}; };
var InnerCalendar = function (props) {
    return (_jsx(GitHubCalendar, { style: {
            overflow: 'clip'
        }, fontSize: 14, theme: {
            dark: ['fafafa', 'gray']
        }, hideColorLegend: true, hideMonthLabels: true, hideTotalCount: true, blockSize: 12, blockMargin: 3, transformData: selectLastHalfYear(props.months), username: props.username }));
};
var InnerCalendarMemo = memo(InnerCalendar);
export var GitHub = function (props) {
    var months = props.grid !== undefined ? Math.floor(props.grid.w * 1.37) : 12;
    var username = props.username || 'DominikScholz';
    var showUsername = props.showUsername || true;
    return (_jsxs(InnerOwnTile, { className: "size-full p-9 overflow-clip relative bg-white", children: [_jsx("div", { className: "text-white bg-black/90 rounded-full \n          size-10 flex-center absolute top-4 left-4 z-10 p-2 backdrop-blur-xl whitespace-nowrap\n          ", style: {
                    filter: 'drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white)'
                }, children: _jsx(GithubLogo, { size: '100%' }) }), showUsername && (_jsx("div", { className: "text-[#0a0909c4] bg-white \n        absolute left-4 bottom-4 z-10\n        flex-center rounded-full px-5 h-10 \n        font-['Plus_Jakarta_Sans'] font-medium text-base", style: {
                    filter: 'drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white) drop-shadow(0 0 1rem white)'
                }, children: username })), _jsx("div", { className: "absolute size-full mix-blend-color", style: { backgroundColor: 'var(--background-color)' } }), _jsx(InnerCalendarMemo, { username: username, months: months })] }));
};
export var tile = {
    name: 'github',
    license: { type: 'MIT', fullText: 'MIT' },
    origin: 'https://github.com/',
    props: {
        username: { slowLoad: true }
    },
    minDimensions: { w: 3, h: 2 },
    Component: memo(GitHub)
};
