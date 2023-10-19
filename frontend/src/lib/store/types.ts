import {type ToastType} from "@/components/ui/use-toast";


export interface Store {
    signedIn: boolean;
    signIn: (formData: FormData, toast: ToastType) => Promise<void>;
    signOut: () => Promise<void>;
    favorites: Record<string, boolean>;
    isFavorite: (key: string) => boolean;
    like: (key: string) => void;
    dislike: (key: string) => void;
    fetch: () => Promise<void>;
}