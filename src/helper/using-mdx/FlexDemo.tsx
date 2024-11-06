import { css } from "@linaria/core";
import { For } from "solid-js";
import FlipDiv from "./FlipDiv";
import InputRange from "#components/Inputs/InputRange";
import { createMatcherRange } from "#root/hooks";

export default function FlexDemo() {
    const [directionControl, getDirection] = createMatcherRange(["row", "column", "row-reverse", "column-reverse"] as const);
    const [justifyControl, getJustifyControl] = createMatcherRange(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const);
    const [alignControl, getAlignControl] = createMatcherRange(["flex-start", "flex-end", "center", "baseline", "stretch"] as const);

    const demoWrapperStyle = css`
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;
        height: 400px;
        background-color: hsl(var(--color-base));
        border: 2px dashed hsl(var(--color-overlay0));
    `;

    const childWrapperStyle = css`
        background-color: hsl(var(--color-content));
        will-change: transform;
        border-radius: 3px;
        min-width: 70px;
        min-height: 70px;
        flex-shrink: 1;
    `;

    const demoControlStyle = css`
        display: flex;
        flex-direction: column;
        gap: 1rem;
        & > label {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            span {
                flex: 1;
                flex-basis: 12rem;
            }
        }
    `;

    return <>
        <div class={demoControlStyle}>
            <label>
                <span>flex-direction: {getDirection()}</span>
                <InputRange {...directionControl} />
            </label>
            <label>
                <span>align-items: {getAlignControl()}</span>
                <InputRange {...alignControl} />
            </label>
            <label>
                <span>justify-content: {getJustifyControl()}</span>
                <InputRange {...justifyControl} />
            </label>
        </div>
        <div style={{
                "flex-direction": getDirection(),
                "justify-content": getJustifyControl(),
                "align-items": getAlignControl(),
            }} class={demoWrapperStyle}>
            <For each={["red", "blue", "yellow", "green"]}>
                {
                    item => <FlipDiv
                        style={{ "--color-content": `var(--color-${item})` }}
                        flipState={() => [getDirection(), getAlignControl(), getJustifyControl()]}
                        class={childWrapperStyle} />
                }
            </For>
        </div>
    </>;
}