import { config } from "../config/config";

export function debug(title: string, data?: any) {

    if (!config.DEBUG) return;

    const now =
    new Date().toLocaleTimeString();

    console.log(
    `\n[${now}] ${title.toUpperCase()}`
    );

    if (data !== undefined) {
        console.dir(data, { depth: null });
    }
}

export function info(...args: any[]) {
    console.log(...args);
}

export function warn(...args: any[]) {
    console.warn(...args);
}

export function error(...args: any[]) {
    console.error(...args);
}