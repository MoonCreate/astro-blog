import { Flipped, Flipper } from "#root/animations/flip";
import DemoButton from "#root/components/Button/DemoButton";
import { promiseSetTimeout } from "#root/utils";
import { css } from "@linaria/core";
import { createSignal, For, onMount } from "solid-js";

export default function PopDemo() {
    const [getAnimals, setAnimals] = createSignal<{ id: number, animal: string }[]>([]);

    const pushAnimal = (animal: string) => setAnimals(animals => [...animals, {
        id: Date.now(),
        animal,
    }]);

    const popAnimal = () => setAnimals(animals => {
        animals.pop();
        return [...animals];
    });

    onMount(async () => {
        pushAnimal("marmut");
        await promiseSetTimeout(500);
        pushAnimal("kucing");
        await promiseSetTimeout(500);
        pushAnimal("tikus");
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
    >
        <div class={wrapperStyle}>
            <div class={style}>
                <span class={declarationStyle}>let</span>
                <span>hewan</span>
                <span class={declarationStyle}>=</span>
                <span>[</span>
                <For each={getAnimals()}>
                    {
                        x => <Flipped flipKey={x.id}>
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
                <span>hewan.</span>
                <DemoButton onClick={() => popAnimal()} style="--button-color: var(--color-mauve);">
                    <span style="padding-inline: 1rem;">pop()</span>
                </DemoButton>
            </div>
            <span class={commentStyle}>//Cobalah untuk mengklik tombol diatas</span>
        </div>
    </Flipper>
}
