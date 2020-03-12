import { Reducer } from "redux";

import {
    SearchActionTypes,
    SearchState,
    SEARCH_REQUEST,
    SEARCH_SUCCESS,
    SEARCH_ERROR
} from "./types";
import { SearchResponseItem, SearchLinks } from "../../util/service";
import { Asset, RequestStatus } from "../../types";

export const initialState: SearchState = {
    status: undefined,
    assets: [],
    pagination: {
        next: "",
        total: 0
    }
};

export const searchReducer: Reducer<SearchState, SearchActionTypes> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case SEARCH_REQUEST:
            return {
                ...state,
                status: RequestStatus.Loading,
                assets: action.append ? state.assets : []
            };
        case SEARCH_SUCCESS:
            const response = action.response;

            const next = getLink(response.collection, "next");

            const newAssets = response.collection.items.map(mapApiToAsset);
            const assets = action.append
                ? state.assets.concat(newAssets)
                : newAssets;

            return {
                ...state,
                status: RequestStatus.Success,
                assets,
                pagination: {
                    total: response.collection.metadata.total_hits,
                    next
                }
            };
        case SEARCH_ERROR:
            return { ...state, status: RequestStatus.Error };
        default:
            return state;
    }
};

const getLink = (item: { links?: SearchLinks }, rel: string) => {
    if (!item.links) {
        return "";
    }

    const preview = item.links.find(link => link.rel === rel);

    if (!preview) {
        return "";
    }

    return preview.href;
};

const mapApiToAsset = (item: SearchResponseItem): Asset => ({
    previewLink: getLink(item, "preview"),
    mediaType: item.data[0].media_type,
    description: item.data[0].description,
    title: item.data[0].title,
    nasaId: item.data[0].nasa_id
});
