import { toast } from "react-toastify";

export class Storage {
    private static set(key: string, value: any) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    private static get(key: string) {
        try {
            const value = localStorage.getItem(key);
            if (value) return JSON.parse(value);
            return null;
        } catch (error) {
            toast.error("An error occurred while retrieving your data");
            Storage.emptyStorage();
            window.location.href = "/";
            return null;
        }
    }

    static setToken(token: string) {
        this.set("token", token);
    }

    static getToken(): string | null {
        return this.get("token");
    }

    static setRefreshToken(token: string) {
        this.set("refreshToken", token);
    }

    static getRefreshToken(): string | null {
        return this.get("refreshToken");
    }

    static getId(): string | null {
        return this.get("id");
    }

    static setId(id: string) {
        this.set("id", id);
    }

    static emptyStorage() {
        localStorage.clear();
    }
}
