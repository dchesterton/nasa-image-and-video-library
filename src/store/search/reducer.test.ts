import { searchReducer } from "./reducer";
import { MediaType, RequestStatus } from "../../types";

describe("searchReducer", () => {
    const asset1 = {
        title: "Image Title",
        description: "Image Description",
        nasaId: "IMG",
        previewLink: "/image.jpg",
        mediaType: MediaType.Image
    };

    const asset2 = {
        title: "Video Title",
        description: "Video Description",
        nasaId: "VID",
        previewLink: "/video.jpg",
        mediaType: MediaType.Video
    };

    it("should set status to loading on SEARCH_REQUEST action", async () => {
        const result = searchReducer(
            {
                assets: [],
                status: undefined,
                pagination: {
                    total: 0,
                    next: ""
                }
            },
            {
                type: "SEARCH_REQUEST",
                append: false
            }
        );

        expect(result.status).toBe(RequestStatus.Loading);
    });

    it("should set status to error on SEARCH_ERROR action", async () => {
        const result = searchReducer(
            {
                assets: [],
                status: RequestStatus.Loading,
                pagination: {
                    total: 0,
                    next: ""
                }
            },
            {
                type: "SEARCH_ERROR"
            }
        );

        expect(result.status).toBe(RequestStatus.Error);
    });

    it("should append state on SEARCH_SUCCESS action when append = true", async () => {
        const result = searchReducer(
            {
                assets: [asset1],
                status: RequestStatus.Loading,
                pagination: {
                    total: 0,
                    next: ""
                }
            },
            {
                type: "SEARCH_SUCCESS",
                append: true,
                response: {
                    collection: {
                        links: [
                            {
                                href: "/next",
                                rel: "next"
                            }
                        ],
                        items: [
                            {
                                links: [
                                    {
                                        href: asset2.previewLink,
                                        rel: "preview"
                                    }
                                ],
                                data: [
                                    {
                                        media_type: asset2.mediaType,
                                        description: asset2.description,
                                        title: asset2.title,
                                        nasa_id: asset2.nasaId
                                    }
                                ]
                            }
                        ],
                        metadata: {
                            total_hits: 1000
                        }
                    }
                }
            }
        );

        expect(result.status).toBe(RequestStatus.Success);
        expect(result.assets).toStrictEqual([asset1, asset2]);
        expect(result.pagination).toStrictEqual({
            total: 1000,
            next: "/next"
        });
    });

    it("should replace state on SEARCH_SUCCESS action when append = false", async () => {
        const result = searchReducer(
            {
                assets: [
                    {
                        title: "Audio Title",
                        description: "Audio Description",
                        nasaId: "AUD",
                        previewLink: "",
                        mediaType: MediaType.Audio
                    }
                ],
                status: RequestStatus.Loading,
                pagination: {
                    total: 1,
                    next: ""
                }
            },
            {
                type: "SEARCH_SUCCESS",
                append: false,
                response: {
                    collection: {
                        links: [
                            {
                                href: "/next",
                                rel: "next"
                            }
                        ],
                        items: [
                            {
                                links: [
                                    {
                                        href: asset1.previewLink,
                                        rel: "preview"
                                    }
                                ],
                                data: [
                                    {
                                        media_type: asset1.mediaType,
                                        description: asset1.description,
                                        title: asset1.title,
                                        nasa_id: asset1.nasaId
                                    }
                                ]
                            },
                            {
                                links: [
                                    {
                                        href: asset2.previewLink,
                                        rel: "preview"
                                    }
                                ],
                                data: [
                                    {
                                        media_type: asset2.mediaType,
                                        description: asset2.description,
                                        title: asset2.title,
                                        nasa_id: asset2.nasaId
                                    }
                                ]
                            }
                        ],
                        metadata: {
                            total_hits: 1000
                        }
                    }
                }
            }
        );

        expect(result.status).toBe(RequestStatus.Success);
        expect(result.assets).toStrictEqual([asset1, asset2]);
        expect(result.pagination).toStrictEqual({
            total: 1000,
            next: "/next"
        });
    });
});
