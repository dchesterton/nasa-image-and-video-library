import { manifest } from "../../util/service";

import {
    AssetActionTypes,
    FETCH_MANIFEST_REQUEST,
    FETCH_MANIFEST_SUCCESS,
    FETCH_MANIFEST_ERROR,
    DISPLAY_ASSET,
    CLOSE_ASSET
} from "./types";
import { Dispatch } from "redux";
import { Asset, MediaType } from "../../types";

export const fetchManifest = (nasaId: string) => {
    return (dispatch: Dispatch<AssetActionTypes>) => {
        dispatch({ type: FETCH_MANIFEST_REQUEST, append: false });

        return manifest(nasaId)
            .then(response => {
                dispatch({
                    type: FETCH_MANIFEST_SUCCESS,
                    response,
                    append: false
                });
            })
            .catch(e => {
                dispatch({ type: FETCH_MANIFEST_ERROR });
            });
    };
};

export const displayAsset = (asset: Asset) => {
    return (dispatch: Dispatch<AssetActionTypes>) => {
        dispatch({
            type: DISPLAY_ASSET,
            asset
        });

        // no need to fetch manifest for images
        if (asset.mediaType === MediaType.Image) {
            return Promise.resolve();
        }

        return fetchManifest(asset.nasaId)(dispatch);
    };
};

export const closeAsset = () => ({
    type: CLOSE_ASSET
});
