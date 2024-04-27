<script setup lang="ts">
import { computed, ref } from "vue"
import { User, scores } from "../scores"
import { PlusIcon, XMarkIcon } from "@heroicons/vue/20/solid"

const tempUser = ref<User>()

const disableSaveButton = computed(
    () =>
        !tempUser.value?.name ||
        scores.value
            .map(player => player.name.toLowerCase())
            .includes(tempUser.value?.name.toLowerCase() ?? "")
)

const showList = computed(() => scores.value.length !== 0 || tempUser.value !== undefined)

function addCell() {
    tempUser.value = { name: "", score: 0 }
}

function setTempName(event: Event) {
    tempUser.value!.name = (event.target as HTMLInputElement).value
}

function createUser() {
    const player = scores.value.find(player => player.name === tempUser.value!.name)
    let filtered = scores.value

    if (player) {
        filtered = scores.value.filter(player => player.name !== tempUser.value!.name)
    }

    scores.value = [...filtered, { name: tempUser.value!.name, score: 0 }]
    tempUser.value = undefined
}

function deleteUser(name: string) {
    scores.value = scores.value.filter(player => player.name !== name)
}
</script>

<template>
    <div class="flex flex-col items-end gap-5 w-full">
        <button
            v-if="!showList"
            @click="addCell()"
            type="button"
            class="relative group block w-full rounded-lg border-2 border-dashed border-gray-600 p-8 text-center hover:border-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
            <PlusIcon class="mx-auto h-12 w-12 text-red-700" />
            <span class="mt-2 block text-sm font-semibold text-gray-600 group-hover:text-red-700">
                Add User
            </span>
        </button>

        <!-- TODO: Make this a grid (and restrict the total number of contestants to 12?) -->
        <ul
            v-if="showList"
            role="list"
            class="divide-y divide-zinc-600 overflow-hidden bg-zinc-900 border border-zinc-700 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl w-full"
        >
            <li
                v-for="player in scores"
                :key="player.name"
                class="relative flex justify-between gap-x-6 px-4 py-5 sm:px-6"
            >
                <div class="flex flex-row justify-between items-center w-full">
                    <div class="flex min-w-0 gap-x-4">
                        <div class="min-w-0 flex-auto">
                            <p class="text-sm font-semibold leading-6 text-zinc-100">
                                {{ player.name }}
                            </p>
                            <p class="mt-1 flex text-xs leading-5 text-zinc-400">
                                <span class="relative truncate font-lcd">
                                    {{ player.score }}
                                </span>
                            </p>
                        </div>
                    </div>

                    <div>
                        <button
                            @click="deleteUser(player.name)"
                            type="button"
                            class="rounded-full bg-red-700 p-2 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </li>

            <li v-if="tempUser">
                <div class="flex flex-row justify-between w-full p-7">
                    <input
                        type="text"
                        class="text-sm font-semibold leading-6 text-zinc-100 rounded-lg border border-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 px-2"
                        :value="tempUser.name"
                        @input="setTempName($event)"
                    />

                    <div class="flex gap-3">
                        <button
                            @click="tempUser = undefined"
                            type="button"
                            class="rounded-full bg-red-950 px-3.5 py-2 text-sm font-semibold text-red-400 shadow-sm hover:bg-red-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Cancel
                        </button>

                        <button
                            @click="createUser()"
                            :disabled="disableSaveButton"
                            type="button"
                            class="rounded-full bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </li>
        </ul>

        <button
            @click="addCell()"
            :disabled="tempUser !== undefined"
            type="button"
            class="rounded-full bg-red-700 disabled:bg-zinc-700 disabled:text-zinc-400 disabled:cursor-not-allowed p-2 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
        >
            <PlusIcon class="h-5 w-5" aria-hidden="true" />
        </button>
    </div>
</template>
