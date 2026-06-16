<template>
    <div class="bg-surface-low w-65 p-4 pr-2 h-screen flex-none flex flex-col min-h-0">
        
        <div class="mb-4 flex-none pr-2 flex flex-col">
            <h2 class="text-xl">Sammlung</h2>
            <span class="text-2xs">Deine Listen</span>
        </div>

        <div class="flex-1 overflow-y-auto pr-2 scrollbar-thin"> 
            <div 
                v-for="list in todoLists"
                :key="list.id"
                class="group w-full h-10 hover:bg-background hover:shadow-sunken rounded-lg flex items-center relative mb-1"
            >
                <NuxtLink
                    :to="`/todo-list/${list.id}`" 
                    class="w-full text-md p-2 truncate"
                >
                    {{ list.name }}
                </NuxtLink>
                <div
                    class="hidden group-hover:flex h-full aspect-square w-auto items-center justify-center"
                >
                    <button
                        type="button"
                        class="flex h-8 w-8 hover:shadow-sunken hover:cursor-pointer hover:text-black rounded-lg hover:bg-primary-container items-center justify-center"
                        :aria-label="`Liste ${list.name} löschen`"
                        @click="deleteTodoList({ listId: list.id })"
                    >
                        <Icon name="heroicons-solid:trash" class="h-4 w-4" aria-hidden="true" />
                    </button>
                </div>
            </div>
        </div>

        <div class="pt-4 flex-none pr-2">
            <button
                class="btn-primary w-full"
                @click="openModal('creatList')"
            >
                Add New List
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { openModal } = useModalStore();
const { todoLists, deleteTodoList } = useTodoLists();
</script>
