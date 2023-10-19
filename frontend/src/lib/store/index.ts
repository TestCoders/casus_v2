import {create} from "zustand";
import {persist} from "zustand/middleware";
import {type Store} from "@/lib/store/types";

export const useDataStore = create<Store>()(persist((set, get) => ({
    favorites: {},
    isFavorite: (key: string) => {
        return get().favorites?.[key] ?? false
    },
    like: (key: string) => set((state) => {
        return {favorites: {...state.favorites, [key]: true}}
    }),
    dislike: (key: string) => set((state) => {
        return {favorites: {...state.favorites, [key]: false}}
    }),
    fetch: async () => {
        const response = await fetch("http://localhost:8000/api/users/current/favorites", {credentials: "include"});

        if (response.status !== 200) {
            return
        }

        const data = await response.json() as string[];
        const newFavorites: Record<string, boolean> = {}

        for (const key of data) {
            newFavorites[key] = true;
        }

        return set({favorites: {...get().favorites, ...newFavorites}})
    },

    signedIn: false,
    signIn: async (formData, toast) => {
        const response = await fetch("http://localhost:8000/api/auth/token", {
            method: "POST",
            body: formData,
            cache: "no-store",
            credentials: "include",
        });

        if (response.status === 401) {
            toast({
                title: "Login failed",
                description: (await response.json() as { detail: string }).detail,
                variant: "destructive"
            });
            return
        }

        // Fetch favorites
        await get().fetch();

        return set(() => ({signedIn: true}))
    },
    signOut: async () => {
        const response = await fetch("http://localhost:8000/api/auth/sign-out", {
            method: "POST",
            credentials: "include",
        });

        if (response.status === 204) {
            return set({signedIn: false, favorites: {}})
        }
    },
}),
    {name: 'data-store'}
));
