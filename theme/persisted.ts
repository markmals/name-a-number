import { type Ref, effect, shallowRef } from "vue"

export function usePersisted<T>(key: string, initialValue?: T): Ref<T> {
    let ref = shallowRef(initialValue) as Ref<T>
    let skipSave = true

    // try to hydrate state from storage:
    function load() {
        skipSave = true
        try {
            const stored = localStorage.getItem(key)
            console.log("loading stored", stored)
            if (stored != null) ref.value = JSON.parse(stored)
        } catch (err) {
            // ignore blocked storage access
            console.error(`Could not read from ${key}`)
        }
        skipSave = false
    }

    effect(() => {
        let value = ref.value
        if (skipSave) return
        try {
            console.log("writing to stored", value)
            localStorage.setItem(key, JSON.stringify(value))
        } catch (err) {
            // ignore blocked storage access
            console.error(`Could not write to ${key}`)
        }
    })

    // if another tab changes the launch tracking state, update our in-memory copy:
    if (typeof addEventListener === "function") {
        addEventListener("storage", event => {
            console.log("storage event:", event.key)
            if (event.key === key) load()
        })
    }

    load()
    return ref
}
