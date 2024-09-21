import { writable } from "svelte/store";

export const duration = writable(500);

export const className = writable('');

export const cmdHistory = writable<string[]>([]);