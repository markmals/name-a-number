<script setup lang="ts">
import { useSlideContext } from "@slidev/client"
import { computed } from "vue"

const props = defineProps<{ redacted?: boolean }>()
const redactPrompt = computed(() => props.redacted ?? false)

const context = useSlideContext()
const showRedacted = computed(() => context.$clicks.value === 0)
const showUnredacted = computed(() => context.$clicks.value === 1)
</script>

<template>
    <p class="relaxed">
        How many <br />
        <template v-if="redactPrompt">
            <v-click hide="-1" v-if="showRedacted">
                <span class="redacted"><slot />?</span>
            </v-click>

            <v-click v-if="showUnredacted">
                <span><slot />?</span>
            </v-click>
        </template>
        <template v-else><slot />?</template>
    </p>
</template>

<style scoped>
.redacted {
    background-color: black;
}

p.relaxed {
    line-height: 3.5rem;
}
</style>
