export enum Color {
    Black = "#000000",
    White = "#ffffff",
    WhiteSilver = "#F1F4E7",
    Grey = "#7e8079",
    DarkGrey = "#222222",
    Red = "#f80606",
    Green = "#0db80b",
    HackerGreen = "#00ff00",
    LawnGreen = "#7CFC00",
    Yellow = "#FFFF00",
    Orange = "#EC6C28",
    IceBlue = "#4CAAD4",
    Blue = "#3333FF",
    HotRed = "#E93A17",
    LightRed = "#B17C76",
}

const to0x = (color: Color | string) => color.replace("#", "0x");
export const toHex = (color: Color | string) => parseInt(to0x(color), 16);
