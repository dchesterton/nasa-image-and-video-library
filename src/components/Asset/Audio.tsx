import React from "react";

import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { LoadingSpinner } from "../LoadingSpinner";
import { styles } from "./styles";
import { css } from "aphrodite/no-important";
import { findExtension } from "../../util/manifest";
import { RequestStatus } from "../../types";

export const Audio: React.FC = () => {
    const state = useSelector((state: ApplicationState) => state.asset);

    if (state.status === RequestStatus.Loading) {
        return <LoadingSpinner />;
    }
    if (state.status === RequestStatus.Error) {
        return (
            <div className={css(styles.error)}>Could not load audio file</div>
        );
    }

    const url = findExtension(["wav", "mp3"], state.manifest);

    if (!url) {
        return (
            <div className={css(styles.error)}>Could not load audio file</div>
        );
    }

    return (
        <audio
            controls
            src={url}
            className={css(styles.audio)}
            data-testid="audio"
        />
    );
};
