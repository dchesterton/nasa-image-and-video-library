import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { SearchResultsAsset } from "./SearchResultsAsset";
import { createStore } from "redux";
import { Asset, MediaType } from "../types";

describe("<SearchResultsAsset /> unit test", () => {
    it("should dispatch action if user clicks on an asset", () => {
        const store = createStore(state => state);
        store.dispatch = jest.fn();

        const asset: Asset = {
            title: "Test",
            previewLink: "",
            description: "Description",
            mediaType: MediaType.Image,
            nasaId: "NASA"
        };

        const { getByTitle } = render(
            <Provider store={store}>
                <SearchResultsAsset asset={asset} />
            </Provider>
        );

        const link = getByTitle("Test");
        fireEvent.click(link);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });
});
