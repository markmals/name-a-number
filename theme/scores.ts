import { computed } from "vue"
import { usePersisted } from "./persisted"

export interface User {
    name: string
    score: number
}

export const scores = usePersisted<User[]>("game-changer-scores", [])

export const sortedScores = computed(() =>
    scores.value.toSorted((lhs, rhs) => lhs.name.localeCompare(rhs.name))
)
