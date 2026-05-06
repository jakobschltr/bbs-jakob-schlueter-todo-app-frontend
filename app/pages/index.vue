<template>
    <div class="flex justify-center">
        <div class="w-full max-w-4xl">
            <div class="mb-4">
                <span class="text-text-variant text-sm">
                    Listen
                </span>
            </div>

            <h2 class="text-lg font-bold mb-8">
                Willkommen — du hast {{ todoLists.length }}
                {{ todoLists.length === 1 ? 'Liste' : 'Listen' }} vor dir
            </h2>

            <div class="relative">
                <input
                    v-model="newListName"
                    class="w-full p-4 rounded-lg bg-surface-low shadow-sunken"
                    type="text"
                    placeholder="Neue Liste hinzufügen"
                    autocomplete="off"
                    @keyup.enter="handleListCreation"
                >
                <button
                    type="button"
                    class="absolute right-1.5 top-1/2 -translate-y-1/2 min-h-10 min-w-10 p-2 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container"
                    aria-label="Liste erstellen"
                    @click="handleListCreation"
                >
                    <span
                        class="block h-full w-full flex items-center justify-center [&_svg]:h-5 [&_svg]:w-5"
                        aria-hidden="true"
                        v-html="plusIconSvg"
                    />
                </button>
            </div>

            <div class="flex flex-col gap-4 mt-4">
                <div
                    v-for="list in todoLists"
                    :key="list.id"
                    class="bg-primary rounded-l-lg rounded-r-xl shadow-xl"
                >
                    <div class="group bg-surface-lowest rounded-lg pl-4 py-2 pr-2 ml-1 text-primary-text flex">
                        <NuxtLink
                            :to="`/todo-list/${list.id}`"
                            class="flex-1 flex flex-col justify-center min-h-8 font-bold"
                        >
                            {{ list.name }}
                        </NuxtLink>
                        <div class="flex gap-1">
                            <button
                                type="button"
                                class="min-h-10 min-w-10 p-2 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container hidden group-hover:flex items-center justify-center"
                                aria-label="Liste löschen"
                                @click="deleteTodoList({ listId: list.id })"
                            >
                                <span
                                    class="block h-1/2 w-1/2 flex items-center justify-center [&_svg]:h-full [&_svg]:w-full"
                                    aria-hidden="true"
                                    v-html="trashcanIconSvg"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import plusIconSvg from '~/assets/plus-icon.svg?raw';
import trashcanIconSvg from '~/assets/trashcan-icon.svg?raw';

const { todoLists, createTodoList, deleteTodoList } = useTodoLists();

const newListName = ref('');

const handleListCreation = () => {
    const name = newListName.value.trim();
    if (!name) return;
    createTodoList({ name });
    newListName.value = '';
};
</script>
