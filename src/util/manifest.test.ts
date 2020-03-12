import { findExtension } from "./manifest";

describe("manifest", () => {
    it("should find files by extension", async () => {
        expect(findExtension(["mp4"], ["/file.mp4"])).toBe("/file.mp4");
        expect(findExtension(["mp4"], ["/file.jpg", "/file.mp4"])).toBe(
            "/file.mp4"
        );
        expect(findExtension(["mp4"], ["/file1.mp4", "/file2.mp4"])).toBe(
            "/file1.mp4"
        );
        expect(findExtension(["mp4"], ["/file.MP4"])).toBe("/file.MP4");
        expect(findExtension(["mp4"], ["/file.mp45"])).toBeUndefined();
    });
});
