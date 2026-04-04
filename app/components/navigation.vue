<template>
    <div class="bg-neutral w-75 p-2 flex flex-col gap-1">
        <div class="text-lg pl-2">
            <div class="flex justify-between pl-0 p-2">
                <h4>Übersicht</h4>
                <button
                    class="bg-primary w-6 h-6 flex items-center justify-center rounded-md"
                    @click="createTodoList({ name: 'shopping' })"
                >
                    +
                </button>
            </div>
            <div class="pl-1 border-l-2 border-border">
                <div 
                    v-for="list in todoLists"
                    :key="list.id"
                    class="group w-full h-fit p-2 hover:bg-neutral-light rounded-lg flex items-center relative"
                >
                    <NuxtLink
                        :to="`/todo-list/${list.id}`" 
                        class="flex-1 pr-10 text-sm"
                    >
                        {{ list.name }}
                    </NuxtLink>

                    <button
                        class="hidden group-hover:flex absolute right-0 inset-y-0 aspect-square items-center justify-center rounded-lg hover:bg-red-500 transition-all"
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
</template>

<script lang="ts" setup>
import trashcanIconSvg from '~/assets/trashcan-icon.svg?raw';

const { todoLists, deleteTodoList, createTodoList } = useTodoLists();
</script>
