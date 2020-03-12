import React from "react";
import { useSelector } from "react-redux";
import { css } from "aphrodite/no-important";

import { ApplicationState } from "../store";

import logo from "../nasa.svg";
import { Asset } from "./Asset";
import { SearchForm } from "./SearchForm";
import { SearchResults } from "./SearchResults";
import { styles } from "./Page.styles";

export function Page() {
    const currentAsset = useSelector(
        (state: ApplicationState) => state.asset.currentAsset
    );

    return (
        <div className={css(styles.app)}>
            <img src={logo} className={css(styles.logo)} alt="NASA" />

            <SearchForm />
            <SearchResults />
            {currentAsset ? <Asset asset={currentAsset} /> : null}
        </div>
    );
}
