import axios from "axios";
import { MediaType } from "../types";

export interface ManifestResponse {
    collection: {
        items: Array<{ href: string }>;
    };
}

export interface SearchResponse {
    collection: {
        items: Array<SearchResponseItem>;
        links?: SearchLinks;
        metadata: {
            total_hits: number;
        };
    };
}

export type SearchLinks = Array<{
    href: string;
    rel: string;
}>;

export interface SearchResponseItem {
    links?: SearchLinks;
    data: Array<{
        media_type: MediaType;
        nasa_id: string;
        description: string;
        title: string;
    }>;
}

export interface MediaTypeOptions {
    image: boolean;
    audio: boolean;
    video: boolean;
}

export async function search(query: string, options: MediaTypeOptions) {
    const optionsArr = [];

    if (options.audio) {
        optionsArr.push("audio");
    }

    if (options.image) {
        optionsArr.push("image");
    }

    if (options.video) {
        optionsArr.push("video");
    }

    return fetch(
        `https://images-api.nasa.gov/search?q=${encodeURIComponent(
            query
        )}&media_type=${encodeURIComponent(optionsArr.join(","))}`
    );
}

export async function fetch(url: string): Promise<SearchResponse> {
    const response = await axios.get<SearchResponse>(url);
    return response.data;
}

export async function manifest(nasaId: string) {
    const response = await axios.get<ManifestResponse>(
        `https://images-api.nasa.gov/asset/${encodeURIComponent(nasaId)}`
    );

    return response.data;
}
