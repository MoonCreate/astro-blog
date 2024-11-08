import { type JSX } from "solid-js";
import { css } from "@linaria/core";
import { animate, spring } from "motion";
type Props = {
    children?: JSX.Element
};

export default function LikeButton(props: Props) {
    let ref: HTMLButtonElement;
    let refSpan: HTMLSpanElement;

    const toggleButton = (enter: boolean) => {
        // const like = ref.querySelector("[data-like-button='liked']");
        // const unlike = ref.querySelector("[data-like-button='unliked']");
        animate(ref, {
            rotate: [0, 360],
        }, {
            easing: spring()
        });

        if (enter) {
            animate(refSpan, {
                y: [-100, 0],
                opacity: [0, 1]
            }, {
                easing: spring()
            });
        } else {
            animate(refSpan, {
                y: [0, -100],
                opacity: [1, 0]
            }, {
                easing: spring()
            });

        }
    }

    const style = css`
        appearance: none;
        border: none;
        background-color: transparent;
        cursor: pointer;
        display: grid;
        gap: 1rem;
        grid-column: 2;
        align-self: center;
        width: max-content;
        justify-self: center;
        place-self: center;
        margin-bottom: calc(var(--viewport-spacing) * -2);
        &> * {
            color: hsl(var(--color-rosewater));
        }
        &:hover {
            div[data-like-button='unliked'] > svg {
                opacity: 0;
            }
            div[data-like-button='liked'] > svg {
                opacity: 1;
            }
        }
        div[data-like-button='liked'] > svg {
            opacity: 0;
        }
        div[data-like-button='liked'],
        div[data-like-button='unliked'] {
            & > svg {
                grid-column: 1 / -1;
                grid-row: 1 / -1;
            }
        }
    `;

    return <button
        class={style}
        aria-label="like-button"
        ref={el => ref = el}
        onmouseenter={() => toggleButton(true)}
        onmouseleave={() => toggleButton(false)}
    >
        <span  ref={el => refSpan = el} style={"opacity: 0; background-color: red;"}>Like ?</span>
        {props.children}
    </button>
}