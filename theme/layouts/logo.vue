<script setup lang="ts">
import { useNav } from "@slidev/client"
import { effect } from "vue"

const { image } = defineProps<{ image: string }>()
const imageURL = `url("${image}")`

const nav = useNav()
const app = document.getElementById("app")!

effect(() => {
    if (nav.currentPage.value === 2) {
        app.setAttribute("style", "--container-padding: 0; --content-radius: 0;")
    } else if (app.hasAttribute("style")) {
        app.removeAttribute("style")
    }
})
</script>

<template>
    <div id="logo" />
</template>

<style scoped>
#logo {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;

    width: 100%;
    height: 100%;

    background-image: v-bind(imageURL);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
</style>
