import { jsx as _jsx } from "react/jsx-runtime";
import { memo } from 'react';
import IFrame from 'utils/IFrame';
var SPOTIFY_DOMAIN = 'open.spotify.com';
var parseLink = function (rawLink) {
    if (typeof rawLink !== 'string') {
        console.error('Invalid link provided:', rawLink);
        return '';
    }
    try {
        var url = new URL(rawLink, "https://".concat(SPOTIFY_DOMAIN));
        if (url.hostname !== SPOTIFY_DOMAIN) {
            console.error('Not a valid Spotify link:', rawLink);
            return '';
        }
        return url.pathname;
    }
    catch (error) {
        console.error('Invalid URL:', rawLink);
        return '';
    }
};
// put other easter-eggs here ;)
var FALLBACK_LINK = 'https://open.spotify.com/album/4cCfFozyo6JC8acN8uIP7u?si=laPgYvLDR8Gh0fPa3M2mFw';
export var Spotify = function (props) {
    var useColor = props.theme === undefined || props.theme === 'color';
    var themeString = useColor ? '' : '&theme=0';
    var link = parseLink(props.link || FALLBACK_LINK);
    var clipPathStyle = link.startsWith('/track')
        ? { clipPath: 'inset(0 0 8px 0 round 2.25rem)' } // this is a hack because spotify embeds of tracks have white background
        : { clipPath: 'inset(0 round 2.25rem)' };
    return (_jsx(IFrame, { style: clipPathStyle, src: "https://open.spotify.com/embed".concat(link, "?utm_source=generator").concat(themeString), width: "100%", height: "100%", frameBorder: "0", allowFullScreen: true, 
        // sandbox="allow-scripts allow-forms allow-same-origin"
        allow: "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture", loading: "lazy" }));
};
export var tile = {
    name: 'spotify',
    license: { type: 'MIT', fullText: 'MIT' },
    origin: 'https://spotify.com/',
    minDimensions: {
        w: 3,
        h: 4
    },
    maxDimensions: function (props) {
        var link = parseLink(props.link || FALLBACK_LINK);
        return {
            w: Infinity,
            h: link.startsWith('/track') ? 4 : Infinity
        };
    },
    props: {
        link: { slowLoad: true },
        theme: { slowLoad: true }
    },
    Component: memo(Spotify)
};
