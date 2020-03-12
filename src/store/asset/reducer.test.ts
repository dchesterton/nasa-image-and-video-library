import { assetReducer } from "./reducer";
import { MediaType, RequestStatus } from "../../types";

describe("assetReducer", () => {
    const asset = {
        title: "Title",
        description: "Description",
        nasaId: "NASA",
        previewLink: "",
        mediaType: MediaType.Image
    };

    it("should set currentAsset on state on DISPLAY_ASSET action", async () => {
        const result = assetReducer(
            {
                currentAsset: undefined,
                status: RequestStatus.Success
            },
            {
                type: "DISPLAY_ASSET",
                asset
            }
        );

        expect(result.currentAsset).toBe(asset);
    });

    it("should remove currentAsset from state on CLOSE_ASSET action", async () => {
        const result = assetReducer(
            {
                currentAsset: asset,
                status: RequestStatus.Success
            },
            {
                type: "CLOSE_ASSET"
            }
        );

        expect(result.currentAsset).toBeUndefined();
    });

    it("should set status to loading on FETCH_MANIFEST_REQUEST action", async () => {
        const result = assetReducer(
            {
                currentAsset: undefined,
                status: undefined
            },
            {
                type: "FETCH_MANIFEST_REQUEST"
            }
        );

        expect(result.status).toBe(RequestStatus.Loading);
    });

    it("should set status to error on FETCH_MANIFEST_ERROR action", async () => {
        const result = assetReducer(
            {
                currentAsset: undefined,
                status: RequestStatus.Loading
            },
            {
                type: "FETCH_MANIFEST_ERROR"
            }
        );

        expect(result.status).toBe(RequestStatus.Error);
    });

    it("should set status to success and set manifest on FETCH_MANIFEST_SUCCESS action", async () => {
        const hrefs = [
            "https://images-assets.nasa.gov/image/as11-40-5874/as11-40-5874~orig.jpg",
            "https://images-assets.nasa.gov/image/as11-40-5874/as11‐40‐5874~medium.jpg"
        ];

        const result = assetReducer(
            {
                currentAsset: undefined,
                status: RequestStatus.Loading
            },
            {
                type: "FETCH_MANIFEST_SUCCESS",
                response: {
                    collection: {
                        items: [{ href: hrefs[0] }, { href: hrefs[1] }]
                    }
                }
            }
        );

        expect(result.status).toBe(RequestStatus.Success);
        expect(result.manifest).toStrictEqual(hrefs);
    });
});
