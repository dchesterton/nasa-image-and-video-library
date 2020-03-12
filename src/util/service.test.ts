import { fetch, search, manifest } from "./service";
import axios from "axios";

jest.mock("axios");

describe("service", () => {
    it("should call NASA API with correct escaped parameters when calling search function", async () => {
        const data = { collection: {} };
        const response = { data };

        (axios.get as jest.Mock).mockResolvedValueOnce(response);

        const result = await search("my query", {
            audio: true,
            video: true,
            image: false
        });

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            `https://images-api.nasa.gov/search?q=my%20query&media_type=audio%2Cvideo`
        );
        expect(result).toBe(data);
    });

    it("should call NASA API with correct escaped parameters when calling manifest function", async () => {
        const data = { collection: {} };
        const response = { data };

        (axios.get as jest.Mock).mockResolvedValueOnce(response);

        const result = await manifest("my NASA ID");

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(
            `https://images-api.nasa.gov/asset/my%20NASA%20ID`
        );
        expect(result).toBe(data);
    });

    it("should call NASA API when calling fetch function", async () => {
        const data = { collection: {} };
        const response = { data };

        (axios.get as jest.Mock).mockResolvedValueOnce(response);

        const url = "https://images-api.nasa.gov";
        const result = await fetch(url);

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(axios.get).toHaveBeenCalledWith(url);
        expect(result).toBe(data);
    });

    afterEach(() => {
        (axios.get as jest.Mock).mockReset();
    });
});
