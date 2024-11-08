import DemoButton from "#root/components/Button/DemoButton";
import { css } from "@linaria/core";
import { animate } from "motion";
import { For, createDeferred, createSignal} from "solid-js"

const animals = ["lion", "cat", "tiger", "fish"];

export default function ArrayDemo() {
    const [getSelected, setSelected] = createSignal(0);
    const index = createDeferred(() => getSelected() % animals.length);

    const wrapperStyle = css`
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        width: fit-content;
        padding: 0;
        & > p {
            display: flex;
            flex-wrap: wrap;
            padding: 16px;
            align-items: center;
            gap: 0.5rem;
            margin: 0 !important;
            padding: 0;
        }
    `;
    return <>
            <div class={wrapperStyle}>
                <p>
                    <span style="color: hsl(var(--color-subtext0)); font-style: italic">// Cobalah untuk mengklik hewan dibawah ini untuk mengetahui indexnya</span>
                </p>
                <p>
                    <span style="color: hsl(var(--color-red))">let</span>
                    <span>animals</span>
                    <span style="color: hsl(var(--color-red))">=</span>
                    <span>[</span>
                <For each={animals}>
                    {(a, i) => <>
                        <DemoButton
                            style={{
                                "--button-color": `var(--color-${index() === i() ? "green" : "blue" })`
                            }}
                            onClick={() => {
                                animate(".array-demo-index", {
                                    opacity: [0, 1],
                                }, {
                                    duration: 1,
                                });
                                setSelected(i());
                            }}
                        >
                            <span style={{"padding-inline": "12px"}}>"{a}"</span>
                        </DemoButton>
                        <span>, </span>
                    </>}
                </For>
                    <span>];</span>
                </p>
                <p>
                    <span>console.<span style="color: hsl(var(--color-mauve))">log</span>(animals[<span class="array-demo-index" style="color: hsl(var(--color-sky));">{index()}</span>]);</span> 
                    <span style="color: hsl(var(--color-subtext0)); font-style: italic">// "{animals[index()]}"</span>
                </p>
            </div>
    </> 
}