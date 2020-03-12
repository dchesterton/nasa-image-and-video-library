import React, { useCallback } from "react";

import { FaVideo, FaImage, FaFileAudio } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { css } from "aphrodite/no-important";
import { styles } from "./SearchResultsAsset.styles";
import { displayAsset } from "../store/asset/actions";
import { Asset, MediaType } from "../types";

interface IProps {
    asset: Asset;
}

export const SearchResultsAsset: React.FC<IProps> = ({ asset }) => {
    const dispatch = useDispatch();

    const handleClick = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) => {
            e.preventDefault();
            dispatch(displayAsset(asset));
        },
        [dispatch, asset]
    );

    return (
        <div className={css(styles.asset)}>
            <button
                className={css(styles.assetLink)}
                onClick={handleClick}
                title={asset.title}
            >
                {asset.mediaType === MediaType.Audio ? (
                    <div className={css(styles.assetInner, styles.assetAudio)}>
                        <FaFileAudio />
                    </div>
                ) : (
                    <>
                        <img
                            className={css(
                                styles.assetInner,
                                styles.assetPreview
                            )}
                            src={asset.previewLink}
                            alt={asset.description}
                        />
                        <div className={css(styles.assetIcon)}>
                            {asset.mediaType === MediaType.Video ? (
                                <FaVideo />
                            ) : (
                                <FaImage />
                            )}
                        </div>
                    </>
                )}

                <div className={css(styles.assetTitle)}>{asset.title}</div>
            </button>
        </div>
    );
};
