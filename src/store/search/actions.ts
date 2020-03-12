import { search, fetch, MediaTypeOptions } from "../../util/service";

import {
    SearchActionTypes,
    SEARCH_REQUEST,
    SEARCH_ERROR,
    SEARCH_SUCCESS
} from "./types";
import { Dispatch } from "redux";

export const fetchRequest = (query: string, mediaTypes: MediaTypeOptions) => {
    return (dispatch: Dispatch<SearchActionTypes>) => {
        dispatch({ type: SEARCH_REQUEST, append: false });

        return search(query, mediaTypes)
            .then(response => {
                dispatch({ type: SEARCH_SUCCESS, response, append: false });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: SEARCH_ERROR });
            });
    };
};

export const fetchNext = (url: string) => {
    return (dispatch: Dispatch<SearchActionTypes>) => {
        dispatch({ type: SEARCH_REQUEST, append: true });

        return fetch(url)
            .then(response => {
                dispatch({ type: SEARCH_SUCCESS, response, append: true });
            })
            .catch(e => {
                console.error(e);
                dispatch({ type: SEARCH_ERROR });
            });
    };
};
