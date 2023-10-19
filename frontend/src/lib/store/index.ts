import {create} from "zustand";
import {persist} from "zustand/middleware";
import {type Store} from "@/lib/store/types";

export const useDataStore = create<Store>()(persist((set, get) => ({
    favorites: new Map(),
    like: (key: string) => set((state) => {
        const newFavorites = new Map(state.favorites);
        newFavorites.set(key, true)
        return {favorites: newFavorites}
    }),
    dislike: (key: string) => set((state) => {
        const newFavorites = new Map(state.favorites);
        newFavorites.set(key, false)
        return {favorites: newFavorites}
    }),
    fetch: async () => {
        const response = await fetch("http://localhost:8000/api/users/current/favorites", {credentials: "include"});

        if (response.status !== 200) {
            return
        }

        const data = await response.json() as string[];
        const map = new Map();

        for (const key of data) {
            map.set(key, true)
        }

        return set({favorites: map})
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

        await get().fetch();

        return set(() => ({signedIn: true}))
    },
    signOut: async () => {
        const response = await fetch("http://localhost:8000/api/auth/sign-out", {
            method: "POST",
            credentials: "include",
        });

        if (response.status === 204) {
            return set({signedIn: false})
        }
    },
}),
    {name: 'data-store'}
));
