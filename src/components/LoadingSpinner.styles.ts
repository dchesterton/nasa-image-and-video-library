import { StyleSheet } from "aphrodite/no-important";

const spinKeyframes = {
    "0%": {
        transform: "rotate(0deg)"
    },
    "100%": {
        transform: "rotate(359deg)"
    }
};

export const styles = StyleSheet.create({
    spinner: {
        color: "#FFF",
        width: "100px",
        height: "100px",
        animationName: [spinKeyframes],
        animationDuration: "2s",
        animationIterationCount: "infinite"
    }
});
