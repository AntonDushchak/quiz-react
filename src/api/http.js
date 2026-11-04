export class HttpError extends Error {
    constructor(status) {
        super(`HTTP ${status}`);
        this.name = "HttpError";
        this.status = status;
    }
}

export async function fetchJson(url, { signal } = {}) {
    const response = await fetch(url, { signal });
    if (!response.ok) {
        throw new HttpError(response.status);
    }
    return response.json();
}
