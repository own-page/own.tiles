import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import IFrame from 'utils/IFrame';
var YOUTUBE_DOMAINS = ['www.youtube.com', 'youtu.be'];
var parseLink = function (rawLink) {
    if (typeof rawLink !== 'string') {
        console.error('Invalid link provided:', rawLink);
        return '';
    }
    try {
        var url = new URL(rawLink);
        if (!YOUTUBE_DOMAINS.includes(url.hostname)) {
            console.error('Not a valid YouTube link:', rawLink);
            return '';
        }
        var videoId = '';
        if (url.hostname === 'youtu.be') {
            videoId = url.pathname.slice(1);
        }
        else {
            videoId = url.searchParams.get('v') || '';
        }
        if (!videoId) {
            console.error('No video ID found in the link:', rawLink);
            return '';
        }
        return videoId;
    }
    catch (error) {
        console.error('Invalid URL:', rawLink);
        return '';
    }
};
// put other easter-eggs here ;)
var FALLBACK_LINK = 'https://www.youtube.com/watch?v=gnV-8pkILF0';
export var YouTube = function (props) {
    //   const useColor = props.theme === undefined || props.theme === 'color';
    //   const themeString = useColor ? '' : '&theme=0';
    var videoId = parseLink(props.link || FALLBACK_LINK);
    return (_jsx(IFrame, { style: { clipPath: 'inset(0 round 2.25rem)' }, src: "https://www.youtube.com/embed/".concat(videoId), width: "100%", height: "100%", frameBorder: "0", allowFullScreen: true, 
        // sandbox="allow-scripts allow-forms allow-same-origin"
        allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", loading: "lazy" }));
};
export var tile = {
    name: 'youtube',
    license: { type: 'MIT', fullText: 'MIT' },
    origin: 'https://www.youtube.com/',
    minDimensions: {
        w: 3,
        h: 4
    },
    props: {
        link: { slowLoad: true }
        // theme: { slowLoad: true }
    },
    Component: memo(YouTube)
};
