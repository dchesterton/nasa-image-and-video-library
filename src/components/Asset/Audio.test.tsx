import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { createStore } from "redux";
import { Asset, MediaType, RequestStatus } from "../../types";
import { Audio } from "./Audio";

import { createRootReducer } from "../../store";

describe("<Audio /> unit test", () => {
    const asset: Asset = {
        title: "Audio Test",
        previewLink: "",
        description: "Audio Description",
        mediaType: MediaType.Audio,
        nasaId: "AUD"
    };

    it("should show message if cannot find suitable audio file", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: asset,
                manifest: ["/test.jpg"],
                status: RequestStatus.Success
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <Audio />
            </Provider>
        );

        expect(queryByText(/Could not load audio file/)).toBeTruthy();
    });

    it("should show message if there is a network error", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: asset,
                status: RequestStatus.Error
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <Audio />
            </Provider>
        );

        expect(queryByText(/Could not load audio file/)).toBeTruthy();
    });

    it("should show loading spinner if loading", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: undefined,
                manifest: [],
                status: RequestStatus.Loading
            }
        });

        const { queryByTitle } = render(
            <Provider store={store}>
                <Audio />
            </Provider>
        );

        expect(queryByTitle("Loading")).toBeTruthy();
    });

    it("should show audio if mp3 exists in manifest", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: asset,
                manifest: ["test.mp3"],
                status: RequestStatus.Success
            }
        });

        const { queryByTestId } = render(
            <Provider store={store}>
                <Audio />
            </Provider>
        );

        expect(queryByTestId("audio")).toBeTruthy();
    });
});
