import { css } from "@linaria/core";
import { For } from "solid-js";
import InputRange from "#components/Inputs/InputRange";
import { createMatcherRange } from "#root/hooks";
import DemoWrapper from "#root/layouts/DemoWrapper";
import { Flipper, Flipped } from "#root/animations/flip";

export default function FlexDemo() {
    const [directionControl, getDirection] = createMatcherRange(["row", "column", "row-reverse", "column-reverse"] as const);
    const [justifyControl, getJustifyControl] = createMatcherRange(["flex-start", "flex-end", "center", "space-between", "space-around", "space-evenly"] as const);
    const [alignControl, getAlignControl] = createMatcherRange(["flex-start", "flex-end", "center", "baseline", "stretch"] as const);

    const wrapperStyle = css`
        display: flex;
        height: 400px;
    `

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
        <DemoWrapper
            class={wrapperStyle}
            style={{
                "flex-direction": getDirection(),
                "justify-content": getJustifyControl(),
                "align-items": getAlignControl(),
            }}
        >
            <Flipper flipQuery={[getDirection(), getAlignControl(), getJustifyControl()]}>
                <For each={["red", "blue", "yellow", "green"]}>
                    {
                        item => <Flipped flipKey={item}>
                            <div style={{ "--color-content": `var(--color-${item})` }}
                            class={childWrapperStyle}></div>
                        </Flipped>
                    }
                </For>
            </Flipper>
        </DemoWrapper>
    </>;
}