import { css } from "@linaria/core";
import type { JSX } from "solid-js";

type Props = JSX.HTMLAttributes<HTMLDivElement>;

export default function DemoWrapper(props: Props) {
    const demoWrapperStyle = css`
        background-color: hsl(var(--color-base));
        border: 2px dashed hsl(var(--color-overlay0));
    `;
    return <div {...props} class={`${demoWrapperStyle} ${props.class}`}>
        {props.children}
    </div>
}