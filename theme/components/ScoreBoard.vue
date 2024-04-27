<script setup lang="ts">
import { scores, sortedScores } from "../scores"

function incrementScore(name: string) {
    const player = scores.value.find(player => player.name === name)!
    const filtered = scores.value.filter(player => player.name !== name)
    scores.value = [...filtered, { name: player.name, score: player.score + 1 }]
}
</script>

<template>
    <div class="scores">
        <button
            v-for="player of sortedScores"
            :key="player.name"
            class="score-card"
            @click="incrementScore(player.name)"
        >
            <span>{{ player.name }}</span>
            <span class="lcd">{{ player.score }}</span>
        </button>
    </div>
</template>

<style scoped>
.slidev-presenter .next .scores {
    display: none;
}

.scores {
    display: flex;
    flex-direction: row;
    gap: 1rem;

    align-items: center;
    justify-content: center;

    width: 100%;
}

.score-card {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    align-items: start;

    padding: 0.5rem;

    border: 2px solid red;
    border-radius: 0.25rem;

    color: white;
    width: 100%;

    justify-self: start;
}

.lcd {
    font-family: "DSEG7-Classic", monospace;
    font-weight: normal;
    text-align: start;
    color: red;
    font-size: 1.5rem;
}
</style>
