import { StyleSheet } from "aphrodite/no-important";

export const styles = StyleSheet.create({
    resultsContainer: {
        width: "95%",
        margin: "0 auto",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "40px",

        "@media screen and (min-width: 1500px)": {
            width: "85%"
        }
    },
    resultsFooter: {
        height: "250px",
        paddingTop: "40px"
    },
    resultsCounter: {
        color: "#FFF",
        fontFamily: "'Merriweather', serif",
        padding: "10px 0 30px"
    },
    nextPage: {
        width: "100px",
        height: "100px",
        fontSize: "70px",
        borderRadius: "20px",
        backgroundColor: "#181818",
        color: "#FFF",
        lineHeight: "115px",
        display: "block",
        margin: "0 auto",
        appearance: "none",
        border: "none",
        cursor: "pointer",

        ":hover": {
            backgroundColor: "#000"
        }
    },
    empty: {
        fontFamily: "'Merriweather', serif",
        color: "#FFF"
    }
});
