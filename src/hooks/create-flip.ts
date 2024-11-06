import { animateFlip } from "#root/animations";
import { getBoundingClientRect } from "#root/utils";
import type { AnimationControls } from "motion";
import { createEffect, createSignal, onCleanup, onMount, untrack } from "solid-js";

export default function createFlip(ref: () => HTMLElement, flipState: () => unknown) {
    const [getRect, setRect] = createSignal(null as DOMRect | null);
    const [getAnimation, setAnimation] = createSignal(null as AnimationControls | null);

    const trigger = (animate = true) => {
        const curControl = getAnimation();
        const before = getRect();
        curControl?.finish();
        const current = getBoundingClientRect(ref());
        setRect(current);
        if (!animate) return;
        const animation = animateFlip(ref(), before ?? {...current, width: 0, height: 0}, current);
        setAnimation(animation);
    }

    createEffect(() => {
        flipState();
        untrack(() => trigger());
    })

    onMount(() => {
        const onResize = () => trigger(false);
        window.addEventListener("resize", onResize)
        onCleanup(() => {
            window.removeEventListener("resize", onResize);
        });
    });
}