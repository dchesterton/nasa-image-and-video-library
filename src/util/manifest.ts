import { Manifest } from "../types";

export const findExtension = (extensions: string[], manifest?: Manifest) => {
    if (!manifest) {
        return undefined;
    }

    for (const extension of extensions) {
        const found = manifest.find(url =>
            url.toLowerCase().endsWith(`.${extension}`)
        );

        if (found) {
            return found;
        }
    }

    return undefined;
};
