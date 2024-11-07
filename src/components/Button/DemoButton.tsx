import { css } from "@linaria/core";
import { type JSX } from "solid-js";

type Props = JSX.HTMLAttributes<HTMLButtonElement>;

export default function DemoButton(props: Props) {
    const wrapperStyle = css`
        --button-color: var(--color-red);
        color: hsl(var(--color-base));
        appearance: none;
        background: transparent;
        outline: none;
        border: none; 
        cursor: pointer;
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
        padding: 0;
        margin: 0;
        & > * {
            padding: 0;
            grid-column: 1 / -1;
            grid-row: 1 / -1;
            border-radius: 5px;
            transition: transform .1s ease;
            width: 100%;
            height: 100%;
        }
        &:active {
            & > * {
                transform: translateY(0px);
            }
        }
    `;

    const surfaceStyle = css`
        transform: translateY(-5px);
        background-color: hsl(var(--button-color));
    `;
    const shadowStyle = css`
        transform: translateY(3px);
        background-color: hsl(0deg 0% 0% / 20%);
    `;
    const bodyStyle = css`
        /* transform: translateY(0px); */
        background-color: hsl(var(--button-color) / 50%);
    `;
    return <button {...props} class={`${wrapperStyle} ${props.class ?? ""}`}>
        <div class={shadowStyle}>
        </div>
        <div class={bodyStyle}>
        </div>
        <div class={surfaceStyle}>
            {props.children}
        </div>
    </button>;
}