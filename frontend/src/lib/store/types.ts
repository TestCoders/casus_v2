import {type ToastType} from "@/components/ui/use-toast";

export interface FavoritesStore {
    favorites: Map<string, boolean>;
    like: (key: string) => void;
    dislike: (key: string) => void;
    fetch: () => Promise<void>;
}

export interface UserStore {
    signedIn: boolean;
    signIn: (formData: FormData, toast: ToastType) => Promise<void>;
    signOut: () => Promise<void>;
}

export interface Store {
    signedIn: boolean;
    signIn: (formData: FormData, toast: ToastType) => Promise<void>;
    signOut: () => Promise<void>;
    favorites: Map<string, boolean>;
    like: (key: string) => void;
    dislike: (key: string) => void;
    fetch: () => Promise<void>;
}