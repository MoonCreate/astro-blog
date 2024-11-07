import animateFlip from "./flip";
import { getBoundingClientRect } from "#root/utils";
import type { AnimationControls } from "motion";
import { createContext, createEffect, onCleanup, onMount, type JSX } from "solid-js";

type Props = {
    flipQuery: unknown;
    children: JSX.Element;
    defaultRectState?: () => DOMRect;
}

type Context = {
    add: (uniqueKey: unknown, element: HTMLElement) => unknown,
    interupt: (uniqueKey: unknown) => unknown,
}

export const FlipperContext = createContext<Context>();

export default function Flipper(props: Props) {
    const rects = new Map<unknown, [DOMRect, HTMLElement, AnimationControls|null, boolean]>();
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
        rects.set(uniqueKey, [rect, element, item?.[2] ?? null, false]);
        trigger();
    }

    const interupt: Context["interupt"] = (key: unknown) => {
        const item = rects.get(key);
        if (item) item[3] = true;
    }

    const setRect = (key: unknown, rect: DOMRect) => {
        const item = rects.get(key);
        if (item) item[0] = rect;
    }

    const setAnimation = (key: unknown, animation: AnimationControls) => {
        const item = rects.get(key);
        if (item) item[2] = animation;
    }
    const trigger = (animate = true) => {
        for (const [key, [rect, element, animation, interupt]] of rects.entries()) {
            animation?.finish();
            const current = getBoundingClientRect(element);
            if (interupt) {
                continue;
            } else {
                setRect(key, current);
            }
            if (!animate) continue;
            setAnimation(key, animateFlip(element, rect, current));
        }
    }

    createEffect(() => {
        props.flipQuery;
        trigger();
    });

    onMount(() => {
        const onResize = () => trigger(false);
        window.addEventListener("resize", onResize)
        onCleanup(() => {
            window.removeEventListener("resize", onResize);
        });
    });

    return <FlipperContext.Provider value={{ add, interupt }}>
        {props.children}
    </FlipperContext.Provider>;
}