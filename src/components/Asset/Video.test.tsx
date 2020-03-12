import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { createStore } from "redux";
import { Asset, MediaType, RequestStatus } from "../../types";
import { Video } from "./Video";

import { createRootReducer } from "../../store";

describe("<Video /> unit test", () => {
    const asset: Asset = {
        title: "Video Test",
        previewLink: "/video.png",
        description: "Video Description",
        mediaType: MediaType.Video,
        nasaId: "VID"
    };

    it("should show message if cannot find suitable video file", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: asset,
                manifest: ["/test.jpg"],
                status: RequestStatus.Success
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <Video />
            </Provider>
        );

        expect(queryByText(/Could not load video file/)).toBeTruthy();
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
                <Video />
            </Provider>
        );

        expect(queryByText(/Could not load video file/)).toBeTruthy();
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
                <Video />
            </Provider>
        );

        expect(queryByTitle("Loading")).toBeTruthy();
    });

    it("should show video if mp4 exists in manifest", () => {
        const store = createStore(createRootReducer(), {
            asset: {
                currentAsset: asset,
                manifest: ["test.mp4"],
                status: RequestStatus.Success
            }
        });

        const { queryByTestId } = render(
            <Provider store={store}>
                <Video />
            </Provider>
        );

        expect(queryByTestId("video")).toBeTruthy();
    });
});
