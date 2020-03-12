import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import { createStore } from "redux";
import { Asset, MediaType, RequestStatus } from "../types";

import { createRootReducer } from "../store";
import { SearchResults } from "./SearchResults";

describe("<SearchResults /> unit test", () => {
    const asset1: Asset = {
        title: "Video Test",
        previewLink: "/video.png",
        description: "Video Description",
        mediaType: MediaType.Video,
        nasaId: "VID"
    };

    const asset2: Asset = {
        title: "Image Test",
        previewLink: "/image.png",
        description: "Image Description",
        mediaType: MediaType.Image,
        nasaId: "IMG"
    };

    it("should show loading spinner if loading content", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [],
                status: RequestStatus.Loading,
                pagination: {
                    next: "",
                    total: 0
                }
            }
        });

        const { queryByTitle } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(queryByTitle("Loading")).toBeTruthy();
    });

    it("should render results", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [asset1, asset2],
                status: RequestStatus.Success,
                pagination: {
                    next:
                        "https://images-api.nasa.gov/search?media_type=image,video&q=moon&page=2",
                    total: 540
                }
            }
        });

        const { queryByTestId } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(queryByTestId("results")).toBeTruthy();
        expect(queryByTestId("results")?.children).toHaveLength(2);
    });

    it("should show next button if there's more content", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [asset1, asset2],
                status: RequestStatus.Success,
                pagination: {
                    next:
                        "https://images-api.nasa.gov/search?media_type=image,video&q=moon&page=2",
                    total: 540
                }
            }
        });

        const { queryByTitle } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(queryByTitle("Next")).toBeTruthy();
        expect(queryByTitle("Loading")).toBeFalsy();
    });

    it("should not show next button if there's no more content", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [asset1, asset2],
                status: RequestStatus.Success,
                pagination: {
                    next: "",
                    total: 2
                }
            }
        });

        const { queryByTitle } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(queryByTitle("Next")).toBeFalsy();
        expect(queryByTitle("Loading")).toBeFalsy();
    });

    it("should show error message if cannot load assets", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [],
                status: RequestStatus.Error,
                pagination: {
                    next: "",
                    total: 0
                }
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(
            queryByText(
                "There was an error loading the assets, please try again"
            )
        ).toBeTruthy();
    });

    it("should show message if there are no assets", () => {
        const store = createStore(createRootReducer(), {
            search: {
                assets: [],
                status: RequestStatus.Success,
                pagination: {
                    next: "",
                    total: 0
                }
            }
        });

        const { queryByText } = render(
            <Provider store={store}>
                <SearchResults />
            </Provider>
        );

        expect(
            queryByText("There are no assets, please try another search term")
        ).toBeTruthy();
    });
});
