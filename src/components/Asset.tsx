import React, { useEffect, useCallback } from "react";

import { Audio } from "./Asset/Audio";
import { Image } from "./Asset/Image";
import { Video } from "./Asset/Video";
import { css } from "aphrodite/no-important";

import { styles } from "./Asset.styles";
import { Asset as AssetType, MediaType } from "../types";
import { FaWindowClose } from "react-icons/fa";
import { closeAsset } from "../store/asset/actions";
import { useDispatch } from "react-redux";

interface IProps {
    asset: AssetType;
}

export const Asset: React.FC<IProps> = ({ asset }) => {
    const dispatch = useDispatch();

    const handleKeyDown = useCallback(
        event => {
            if (event.keyCode === 27) {
                dispatch(closeAsset());
            }
        },
        [dispatch]
    );

    const handleCloseClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(closeAsset());
        },
        [dispatch]
    );

    useEffect(() => {
        document.getElementsByTagName("body")[0].classList.add("noscroll");
        document.addEventListener("keydown", handleKeyDown, false);

        return function cleanup() {
            document
                .getElementsByTagName("body")[0]
                .classList.remove("noscroll");
            document.removeEventListener("keydown", handleKeyDown, false);
        };
    }, [handleKeyDown]);

    return (
        <div className={css(styles.assetOverlay)}>
            <button
                className={css(styles.closeButton)}
                onClick={handleCloseClick}
                title="Close"
            >
                <FaWindowClose />
            </button>
            <div className={css(styles.asset)}>
                <h1 className={css(styles.assetTitle)} data-testid="title">
                    {asset.title}
                </h1>
                <p
                    className={css(styles.assetDescription)}
                    data-testid="description"
                >
                    {asset.description}
                </p>

                {getAsset(asset)}
            </div>
        </div>
    );
};

const getAsset = (asset: AssetType) => {
    switch (asset.mediaType) {
        case MediaType.Audio:
            return <Audio />;
        case MediaType.Image:
            return <Image asset={asset} />;
        case MediaType.Video:
            return <Video />;
    }
};
