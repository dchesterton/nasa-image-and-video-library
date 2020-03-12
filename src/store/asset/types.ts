import { ManifestResponse } from "../../util/service";
import { Asset, Manifest, RequestStatus } from "../../types";

export interface AssetState {
    currentAsset?: Asset;
    manifest?: Manifest;
    status?: RequestStatus;
}

export const CLOSE_ASSET = "CLOSE_ASSET";
export const DISPLAY_ASSET = "DISPLAY_ASSET";
export const FETCH_MANIFEST_REQUEST = "FETCH_MANIFEST_REQUEST";
export const FETCH_MANIFEST_SUCCESS = "FETCH_MANIFEST_SUCCESS";
export const FETCH_MANIFEST_ERROR = "FETCH_MANIFEST_ERROR";

interface DisplayAssetAction {
    type: typeof DISPLAY_ASSET;
    asset: Asset;
}

interface CloseAssetAction {
    type: typeof CLOSE_ASSET;
}

interface FetchManifestRequestAction {
    type: typeof FETCH_MANIFEST_REQUEST;
}

interface FetchManifestSuccessAction {
    type: typeof FETCH_MANIFEST_SUCCESS;
    response: ManifestResponse;
}

interface FetchManifestErrorAction {
    type: typeof FETCH_MANIFEST_ERROR;
}

export type AssetActionTypes =
    | CloseAssetAction
    | DisplayAssetAction
    | FetchManifestRequestAction
    | FetchManifestSuccessAction
    | FetchManifestErrorAction;
