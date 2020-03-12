import { combineReducers, Store, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import { SearchState } from "./search/types";
import { searchReducer } from "./search/reducer";

import { AssetState } from "./asset/types";
import { assetReducer } from "./asset/reducer";

export interface ApplicationState {
    asset: AssetState;
    search: SearchState;
}

export const createRootReducer = () =>
    combineReducers({
        search: searchReducer,
        asset: assetReducer
    });

export const configureStore = (): Store<ApplicationState> => {
    return createStore(createRootReducer(), applyMiddleware(thunk));
};
