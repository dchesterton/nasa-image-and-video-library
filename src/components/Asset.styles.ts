import { StyleSheet } from "aphrodite/no-important";

export const styles = StyleSheet.create({
    assetTitle: {
        fontSize: "24px",
        lineHeight: "32px",
        width: "80%",
        color: "#FFF",
        margin: "80px auto 30px",
        fontFamily: "'Merriweather', serif"
    },
    assetDescription: {
        fontSize: "12px",
        lineHeight: "22px",
        color: "#FFF",
        width: "70%",
        margin: "0 auto 30px",
        fontFamily: "'Merriweather', serif"
    },
    asset: {
        paddingBottom: "100px"
    },
    assetOverlay: {
        top: "0",
        left: "0",
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        position: "fixed",
        width: "100vw",
        height: "100vh",
        overflowY: "scroll"
    },
    closeButton: {
        display: "block",
        position: "absolute",
        top: "30px",
        left: "30px",
        fontSize: "40px",
        color: "#DDD",
        background: "none",
        appearance: "none",
        border: "none",
        cursor: "pointer",

        ":hover": {
            color: "#FFF"
        }
    }
});
