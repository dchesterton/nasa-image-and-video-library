import { StyleSheet } from "aphrodite/no-important";

export const styles = StyleSheet.create({
    asset: {
        width: "250px",
        height: "280px",
        margin: "8px",
        position: "relative"
    },

    assetInner: {
        width: "250px",
        height: "250px"
    },

    assetAudio: {
        lineHeight: "250px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        fontSize: "60px"
    },

    assetPreview: {
        objectFit: "cover"
    },

    assetIcon: {
        color: "#FFF",
        width: "40px",
        height: "40px",
        lineHeight: "40px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        position: "absolute",
        top: "0",
        right: "0"
    },

    assetTitle: {
        fontFamily: "'Merriweather', serif",
        fontSize: "0.8rem",
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        height: "30px",
        lineHeight: "30px"
    },

    assetLink: {
        color: "#FFF",
        textDecoration: "none",
        width: "100%",
        height: "100%",
        background: "none",
        appearance: "none",
        border: "none",
        cursor: "pointer",

        ":hover": {
            textDecoration: "underline"
        }
    }
});
