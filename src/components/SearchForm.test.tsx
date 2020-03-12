import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { SearchForm } from "./SearchForm";
import { createStore } from "redux";

describe("<SearchForm /> unit test", () => {
    const store = createStore(state => state);
    store.dispatch = jest.fn();

    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => null)
            },
            writable: true
        });
    });

    it("should call dispatch if user enters text and submits form", () => {
        const { getByRole, getByPlaceholderText } = render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const form = getByRole("search");
        const searchInput = getByPlaceholderText("Enter search term...");

        fireEvent.change(searchInput, { target: { value: "moon" } });
        fireEvent.submit(form);

        expect(store.dispatch).toHaveBeenCalledTimes(1);
    });

    it("should not be able to submit the form until a query is entered", () => {
        const { getByTitle } = render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const submitButton = getByTitle("Search");

        expect(submitButton).toHaveAttribute("disabled");
    });

    it("should not be able to submit the form if no media type is selected", () => {
        const {
            getByRole,
            getByPlaceholderText,
            getByTitle,
            getByLabelText
        } = render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const form = getByRole("search");
        const searchInput = getByPlaceholderText("Enter search term...");
        const submitButton = getByTitle("Search");
        const images = getByLabelText("Images");
        const audio = getByLabelText("Audio");
        const video = getByLabelText("Videos");

        fireEvent.click(images);
        fireEvent.click(audio);
        fireEvent.click(video);
        fireEvent.change(searchInput, { target: { value: "moon" } });
        fireEvent.submit(form);

        expect(submitButton).toHaveAttribute("disabled");
    });

    it("should fetch media type options from localStorage", () => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest
                    .fn()
                    .mockReturnValue("false")
                    .mockReturnValueOnce("true")
            }
        });

        const { getByLabelText } = render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const images = getByLabelText("Images");
        const audio = getByLabelText("Audio");
        const video = getByLabelText("Videos");

        expect(images).toHaveAttribute("checked");
        expect(audio).not.toHaveAttribute("checked");
        expect(video).not.toHaveAttribute("checked");
    });

    it("should store media type options in localStorage", () => {
        const { getByLabelText } = render(
            <Provider store={store}>
                <SearchForm />
            </Provider>
        );

        const images = getByLabelText("Images");
        const audio = getByLabelText("Audio");
        const video = getByLabelText("Videos");

        fireEvent.click(images);
        fireEvent.click(audio);
        fireEvent.click(video);

        expect(window.localStorage.setItem).toHaveBeenCalledTimes(3);
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            "search_image",
            "false"
        );
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            "search_audio",
            "false"
        );
        expect(window.localStorage.setItem).toHaveBeenCalledWith(
            "search_video",
            "false"
        );
    });
});
