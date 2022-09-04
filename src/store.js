import { writable } from "svelte/store";

export let todos = writable(JSON.parse(localStorage.getItem("todoapp_data")) || []);

todos.subscribe(val => {
    return localStorage.setItem("todoapp_data", JSON.stringify(val));
})