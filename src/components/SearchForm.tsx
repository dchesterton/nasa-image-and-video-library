import React, { useEffect, useRef, useCallback, useState } from "react";
import { useLocalStorageState } from "../util/hooks";
import { useDispatch } from "react-redux";
import { fetchRequest } from "../store/search/actions";
import { css } from "aphrodite/no-important";

import { styles } from "./SearchForm.styles";
import { FaSearch } from "react-icons/fa";
import { MediaType } from "../types";

export const SearchForm = () => {
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const [image, setSearchImage] = useLocalStorageState("search_image", true);
    const [video, setSearchVideo] = useLocalStorageState("search_video", true);
    const [audio, setSearchAudio] = useLocalStorageState("search_audio", true);

    const inputEl = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputEl.current?.focus();
    }, []);

    const handleChange = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            switch (event.target.name) {
                case MediaType.Image:
                    setSearchImage(event.target.checked);
                    break;
                case MediaType.Audio:
                    setSearchAudio(event.target.checked);
                    break;
                case MediaType.Video:
                    setSearchVideo(event.target.checked);
                    break;
                default:
                    setQuery(event.target.value);
                    break;
            }
        },
        [setQuery, setSearchAudio, setSearchImage, setSearchVideo]
    );

    const handleSubmit = useCallback(
        (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            e.stopPropagation();

            dispatch(fetchRequest(query, { image, video, audio }));
        },
        [dispatch, audio, image, video, query]
    );

    const disabled = query === "" || (!image && !audio && !video);

    return (
        <form
            onSubmit={handleSubmit}
            role="search"
            className={css(styles.searchForm)}
        >
            <div>
                <input
                    ref={inputEl}
                    type="search"
                    value={query}
                    onChange={handleChange}
                    className={css(styles.searchInput)}
                    placeholder="Enter search term..."
                />
                <button
                    disabled={disabled}
                    className={css(styles.searchButton)}
                    title="Search"
                >
                    <FaSearch />
                </button>
            </div>

            <div className={css(styles.searchOptions)}>
                <label className={css(styles.searchOption)}>
                    <input
                        type="checkbox"
                        checked={image}
                        onChange={handleChange}
                        name={MediaType.Image}
                    />{" "}
                    Images
                </label>
                <label className={css(styles.searchOption)}>
                    <input
                        type="checkbox"
                        checked={audio}
                        onChange={handleChange}
                        name={MediaType.Audio}
                    />{" "}
                    Audio
                </label>
                <label className={css(styles.searchOption)}>
                    <input
                        type="checkbox"
                        checked={video}
                        onChange={handleChange}
                        name={MediaType.Video}
                    />{" "}
                    Videos
                </label>
            </div>
        </form>
    );
};
