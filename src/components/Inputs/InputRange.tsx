import { css } from "@linaria/core";
import type { JSX } from "solid-js";

type Props = Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "type">;

export default function InputRange({class: className, ...props}: Props) {
    const style = css`
        --slider-size: 1rem;
        --webkit-appearance: none;
        appearance: none;
        background: transparent;

        &::-webkit-slider-runnable-track {
            background-color: hsl(var(--color-base));
            height: calc(var(--slider-size) / 2);
            box-shadow: var(--shadow-elevation-low);
            border-radius: 50px;
            cursor: pointer;
        }

        &::-webkit-slider-thumb {
            --webkit-appearance: none;
            appearance: none;
            background-color: hsl(var(--color-red));
            margin-top: calc(var(--slider-size) / -4);
            height: var(--slider-size);
            width: var(--slider-size);
            box-shadow: var(--shadow-elevation-low);
            border-radius: 50%;
            transition: .2s ease;
            position: relative;

            &:hover {
                background-color: hsl(var(--color-rosewater));
                cursor: grab;
            }

            &:active {
                cursor: grabbing;
            }
        }
    `;
    return <input class={`${style} ${className}`} type="range" {...props}/>
}