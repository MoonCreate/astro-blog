import { animate, spring } from "motion";

export default function animateFlip(target: HTMLElement, before: DOMRect, after: DOMRect) {
    const animation = animate(target, {
        x: [before.x - after.x, 0],
        y: [before.y - after.y, 0],
        scaleX: [before.width / after.width, 1, 1],
        scaleY: [before.height / after.height, 1, 1],
        transformOrigin: "top left",
    }, {
        easing: spring({
            damping: 100,
        }),
    });
    return animation;
}