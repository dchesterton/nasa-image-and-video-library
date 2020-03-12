import React from "react";

import { css } from "aphrodite/no-important";

import { styles } from "./LoadingSpinner.styles";
import { FaSpinner } from "react-icons/fa";

export const LoadingSpinner: React.FC = () => (
    <FaSpinner className={css(styles.spinner)} title="Loading" />
);
