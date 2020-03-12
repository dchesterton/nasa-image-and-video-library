export interface Asset {
    previewLink: string;
    mediaType: MediaType;
    nasaId: string;
    description: string;
    title: string;
}

export type Manifest = Array<string>;

export enum MediaType {
    Image = "image",
    Video = "video",
    Audio = "audio"
}

export enum RequestStatus {
    Success = "success",
    Loading = "loading",
    Error = "Error"
}
