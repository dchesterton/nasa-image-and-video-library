import { Reducer } from "redux";
import {
    AssetActionTypes,
    AssetState,
    FETCH_MANIFEST_REQUEST,
    FETCH_MANIFEST_SUCCESS,
    FETCH_MANIFEST_ERROR,
    DISPLAY_ASSET,
    CLOSE_ASSET
} from "./types";
import { RequestStatus } from "../../types";

export const initialState: AssetState = {};

export const assetReducer: Reducer<AssetState, AssetActionTypes> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case CLOSE_ASSET:
            return { ...state, currentAsset: undefined };
        case DISPLAY_ASSET:
            return { ...state, currentAsset: action.asset };
        case FETCH_MANIFEST_REQUEST:
            return { ...state, status: RequestStatus.Loading };
        case FETCH_MANIFEST_SUCCESS:
            const manifest = action.response.collection.items.map(
                item => item.href
            );

            return {
                ...state,
                status: RequestStatus.Success,
                manifest
            };
        case FETCH_MANIFEST_ERROR:
            return { ...state, status: RequestStatus.Error };
        default:
            return state;
    }
};
