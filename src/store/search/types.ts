import { SearchResponse } from "../../util/service";
import { Asset, RequestStatus } from "../../types";

export interface SearchState {
    status?: RequestStatus;
    assets: Asset[];
    pagination: {
        next: string;
        total: number;
    };
}

export const SEARCH_REQUEST = "SEARCH_REQUEST";
export const SEARCH_SUCCESS = "SEARCH_SUCCESS";
export const SEARCH_ERROR = "SEARCH_ERROR";

interface FetchRequestAction {
    type: typeof SEARCH_REQUEST;
    append: boolean;
}

interface FetchSuccessAction {
    type: typeof SEARCH_SUCCESS;
    response: SearchResponse;
    append: boolean;
}

interface FetchErrorAction {
    type: typeof SEARCH_ERROR;
}

export type SearchActionTypes =
    | FetchRequestAction
    | FetchSuccessAction
    | FetchErrorAction;
