import React from "react";

import { Asset } from "../../types";

import { styles } from "./styles";
import { css } from "aphrodite/no-important";

interface IProps {
    asset: Asset;
}

export const Image: React.FC<IProps> = ({ asset }) => (
    <img
        src={asset.previewLink}
        alt={asset.description}
        className={css(styles.image)}
    />
);
