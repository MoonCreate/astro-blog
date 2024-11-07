import animateFlip from "./flip";
import { getBoundingClientRect } from "#root/utils";
import type { AnimationControls } from "motion";
import { createContext, createDeferred, createEffect, onCleanup, onMount, type JSX } from "solid-js";

type Props = {
    flipQuery: unknown;
    children: JSX.Element;
    defaultRectState?: () => DOMRect;
}

type Context = {
    add: (uniqueKey: unknown, element: HTMLElement) => unknown,
    interupt: () => unknown,
    delete: (uniqueKey: unknown) => unknown,
}

export const FlipperContext = createContext<Context>();

export default function Flipper(props: Props) {
    const rects = new Map<unknown, [DOMRect, HTMLElement, AnimationControls|null]>();
    const defered = createDeferred(() => props.flipQuery, { timeoutMs: 1 });
    let interupted = false;
    const add: Context["add"] = (uniqueKey, element) => {
        const item = rects.get(uniqueKey);
        let rect = item?.[0];
        if (!rect) {
            let defaultRect = props.defaultRectState?.();
            if (!defaultRect) defaultRect = {
                ...getBoundingClientRect(element),
                width: 0,
                height: 0,
            };
            rect = defaultRect;
        }
        rects.set(uniqueKey, [rect, element, item?.[2] ?? null]);
        if (interupted) {
            trigger();
            interupted = false;
        }
    }

    const interupt: Context["interupt"] = () => {
        interupted = true;
    }

    const remove = (key: unknown) => {
        rects.delete(key);
    }

    const setRect = (key: unknown, rect: DOMRect) => {
        const item = rects.get(key);
        if (item) item[0] = rect;
    }
    const setAnimation = (key: unknown, animation: AnimationControls) => {
        const item = rects.get(key);
        if (item) item[2] = animation;
    }
    const trigger = (triggerAnimation = true) => {
        for (const [key, [rect, element, animation]] of rects.entries()) {
            animation?.finish();
            const current = getBoundingClientRect(element);
            setRect(key, current);
            const op = element.getAttribute("data-flipped-opacity")!;
            element.style.visibility = op;
            if (!triggerAnimation) continue;
            setAnimation(key, animateFlip(element, rect, current));
        }
    }

    createEffect(() => {
        props.flipQuery
        for (const [, [, element,]] of rects.entries()) {
            element.setAttribute("data-flipped-opacity", element.style.visibility);
            element.style.visibility = "hidden";
        }
    }) 

    createEffect(() => {
        defered();
        if (interupted) return;
        trigger();
    });

    onMount(() => {
        const onResize = () => trigger(false);
        window.addEventListener("resize", onResize);
        onCleanup(() => {
            window.removeEventListener("resize", onResize);
        });
    });

    return <FlipperContext.Provider value={{ add, interupt, delete: remove }}>
        {props.children}
    </FlipperContext.Provider>;
}