<script setup lang="ts">
import ScoreBoard from "../components/ScoreBoard.vue"
</script>

<template>
    <div class="container">
        <div class="slide-card">
            <slot />
        </div>

        <ScoreBoard />
    </div>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    align-items: center;
    justify-content: center;

    height: 100%;
    width: 100%;
}

.slide-card {
    display: flex;

    align-items: center;
    justify-content: center;

    padding: 4rem;

    height: 100%;
    width: 100%;

    border-radius: var(--content-radius, 4rem);

    background-color: white;
}

:slotted(p) {
    color: black;
    font-family: "Urbanist", Helvetica, Arial, sans-serif;
    font-weight: 900;
    font-size: 4.5vmin;
    text-align: center;
    line-height: normal;
    text-transform: uppercase;
    font-optical-sizing: auto;
}
</style>
