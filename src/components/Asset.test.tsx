import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { Asset } from "./Asset";
import { createStore } from "redux";
import { Asset as AssetType, MediaType } from "../types";

describe("<Asset /> unit test", () => {
    const asset: AssetType = {
        title: "Test",
        previewLink: "",
        description: "Description",
        mediaType: MediaType.Image,
        nasaId: "NASA"
    };

    it("should have title and description", () => {
        const store = createStore(state => state);

        const { getByTestId } = render(
            <Provider store={store}>
                <Asset asset={asset} />
            </Provider>
        );

        expect(getByTestId("title")).toHaveTextContent(asset.title);
        expect(getByTestId("description")).toHaveTextContent(asset.description);
    });

    it("should dispatch close action if user clicks on close button or presses escape key", () => {
        const store = createStore(state => state);
        store.dispatch = jest.fn();

        const { getByTitle } = render(
            <Provider store={store}>
                <Asset asset={asset} />
            </Provider>
        );

        const closeButton = getByTitle("Close");
        fireEvent.click(closeButton);

        fireEvent.keyDown(document, { keyCode: 27 });

        expect(store.dispatch).toHaveBeenCalledTimes(2);
        expect(store.dispatch).toHaveBeenNthCalledWith(1, {
            type: "CLOSE_ASSET"
        });
        expect(store.dispatch).toHaveBeenNthCalledWith(2, {
            type: "CLOSE_ASSET"
        });
    });
});
