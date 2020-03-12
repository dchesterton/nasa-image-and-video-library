import { StyleSheet } from "aphrodite/no-important";

export const styles = StyleSheet.create({
    searchForm: {
        fontFamily: "'Merriweather', serif",
        width: "100%"
    },
    searchInput: {
        width: "60%",
        padding: "13px",
        fontSize: "16px",
        border: "none",
        fontFamily: "'Merriweather', serif",

        "@media screen and (max-width: 800px)": {
            width: "80%"
        }
    },
    searchButton: {
        border: "none",
        fontSize: "16px",
        padding: "13px 16px",
        fontFamily: "'Merriweather', serif"
    },
    searchOptions: {
        padding: "10px 0",
        width: "300px",
        margin: "0 auto",
        display: "flex",
        justifyContent: "center"
    },
    searchOption: {
        flex: "1",
        color: "#FFF"
    }
});
