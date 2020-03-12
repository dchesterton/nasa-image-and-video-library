import React, { useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import { ApplicationState } from "../store";
import { fetchNext } from "../store/search/actions";
import { css } from "aphrodite/no-important";

import { styles } from "./SearchResults.styles";
import { SearchResultsAsset } from "./SearchResultsAsset";
import { FaArrowDown } from "react-icons/fa";
import { LoadingSpinner } from "./LoadingSpinner";
import { RequestStatus } from "../types";

export const SearchResults = function() {
    const data = useSelector((state: ApplicationState) => state.search);
    const dispatch = useDispatch();

    const nextPage = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(fetchNext(data.pagination.next));
        },
        [dispatch, data]
    );

    if (data.assets.length === 0) {
        if (data.status === RequestStatus.Loading) {
            return (
                <div className={css(styles.resultsContainer)}>
                    <LoadingSpinner />
                </div>
            );
        }

        if (data.status === RequestStatus.Success) {
            return (
                <div className={css(styles.resultsContainer, styles.empty)}>
                    There are no assets, please try another search term
                </div>
            );
        }

        if (data.status === RequestStatus.Error) {
            return (
                <div className={css(styles.resultsContainer, styles.empty)}>
                    There was an error loading the assets, please try again
                </div>
            );
        }

        return null;
    }

    const num = (num: number) => new Intl.NumberFormat().format(num);

    return (
        <>
            <div className={css(styles.resultsContainer)} data-testid="results">
                {data.assets.map(asset => (
                    <SearchResultsAsset key={asset.nasaId} asset={asset} />
                ))}
            </div>

            <div className={css(styles.resultsFooter)}>
                <div className={css(styles.resultsCounter)}>
                    1 - {num(data.assets.length)} of{" "}
                    {num(data.pagination.total)}
                </div>
                {data.status === RequestStatus.Loading ? (
                    <LoadingSpinner />
                ) : data.pagination.next ? (
                    <button
                        onClick={nextPage}
                        className={css(styles.nextPage)}
                        title="Next"
                    >
                        <FaArrowDown />
                    </button>
                ) : null}
            </div>
        </>
    );
};
