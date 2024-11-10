
import { Flipped, Flipper } from "#root/animations/flip";
import { getBoundingClientRect, promiseSetTimeout } from "#root/utils";
import { css } from "@linaria/core";
import { createSignal, For, onMount } from "solid-js";

export default function UnshiftDemo() {
    const [getAnimals, setAnimals] = createSignal<{ id: number, animal: string }[]>([]);

    let refInput: HTMLInputElement;

    const unshiftAnimal = (animal: string) => setAnimals(animals => [{
        id: Date.now(),
        animal,
    }, ...animals]);

    onMount(async () => {
        unshiftAnimal("marmut");
        await promiseSetTimeout(500);
        unshiftAnimal("kucing");
    });

    const style = css`
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        align-items: center;
    `;

    const stringStyle = css`
        color: hsl(var(--color-blue));
        &[type="text"] {
            background: transparent;
            border: none;
            outline: none;
            width: 30px;
            border-bottom: 2px solid white;
        }
    `;
    const declarationStyle = css`
        color: hsl(var(--color-red));
    `;
    const functionStyle = css`
        color: hsl(var(--color-mauve));
    `;

    const commentStyle = css`
        color: hsl(var(--color-subtext0));
        font-style: italic;
    `

    const wrapperStyle = css`
        display: grid;
        grid-auto-flow: row;
    `;

    return <Flipper
        flipQuery={getAnimals()}
        defaultRectState={() => getBoundingClientRect(refInput)}
    >
        <div class={wrapperStyle}>
            <div class={style}>
                <span class={declarationStyle}>let</span>
                <span>hewan</span>
                <span class={declarationStyle}>=</span>
                <span>[</span>
                <For each={getAnimals()}>
                    {
                        x => <Flipped flipKey={x.id} isFlippedVanishWhenCleanup={false}>
                            <span>
                                <span class={stringStyle}>"{x.animal}"</span>,
                            </span>
                        </Flipped>
                    }
                </For>
                <Flipped flipKey="];" isFlippedVanishWhenCleanup={false}>
                    <span>];</span>
                </Flipped>
            </div>
            <div class={style}>
                <span>hewan.
                    <span class={functionStyle}>unshift</span>
                    (<span class={stringStyle}>
                        "
                        <input type="text"
                            ref={e => refInput = e}
                            class={stringStyle}
                            onInput={e => {
                                const length = e.target.value.length;
                                e.target.style.width = `${length / 2}rem`;
                            }}
                            onChange={e => {
                                unshiftAnimal(e.target.value);
                                e.target.value = "";
                            }} />"
                    </span>
                    );</span>
            </div>
            <span class={commentStyle}>//Cobalah untuk mengetik</span>
        </div>
    </Flipper>
}
