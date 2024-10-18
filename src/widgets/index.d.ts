import { TileInfo } from 'types';
declare const rawWidgets: {
    readonly GitHub: import("types").RawTileInfo<"github", {
        username: string;
        showUsername: boolean;
        grid?: import("types").GridArea;
    }>;
    readonly Spotify: import("types").RawTileInfo<"spotify", {
        link?: string;
        theme?: "color" | "dark";
    }>;
    readonly YouTube: import("types").RawTileInfo<"youtube", {
        link?: string;
    }>;
    readonly GoogleCalendar: import("types").RawTileInfo<"google-calendar", {
        email?: string;
        title?: string;
        theme?: "white" | "dark";
        view?: "week" | "month" | "agenda";
    }>;
    readonly Eventbrite: import("types").RawTileInfo<"eventbrite", {
        link?: string;
    }>;
};
export declare const widgets: { [key in keyof typeof rawWidgets]: TileInfo<Lowercase<key>, NonNullable<(typeof rawWidgets)[key]["props"]>>; };
export default widgets;
