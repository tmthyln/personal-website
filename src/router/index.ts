import {createRouter, createWebHistory} from "vue-router";

// @ts-ignore
import { setupLayouts } from 'virtual:generated-layouts'
// @ts-ignore
import generatedRoutes from 'virtual:generated-pages'

export const routes = setupLayouts(generatedRoutes);

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

export default router;
