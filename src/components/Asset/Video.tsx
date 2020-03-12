import React from "react";

import { useSelector } from "react-redux";
import { ApplicationState } from "../../store";
import { LoadingSpinner } from "../LoadingSpinner";
import { styles } from "./styles";
import { css } from "aphrodite/no-important";
import { findExtension } from "../../util/manifest";
import { RequestStatus } from "../../types";

export const Video: React.FC = () => {
    const state = useSelector((state: ApplicationState) => state.asset);

    if (state.status === RequestStatus.Loading) {
        return <LoadingSpinner />;
    }

    if (state.status === RequestStatus.Error) {
        return (
            <div className={css(styles.error)}>Could not load video file</div>
        );
    }

    const url = findExtension(["mp4"], state.manifest);

    if (!url) {
        return (
            <div className={css(styles.error)}>Could not load video file</div>
        );
    }

    return (
        <video
            controls
            src={url}
            className={css(styles.video)}
            data-testid="video"
        />
    );
};
