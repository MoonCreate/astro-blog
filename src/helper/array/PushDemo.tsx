import { Flipped, Flipper } from "#root/animations/flip";
import { getBoundingClientRect } from "#root/utils";
import { createSignal, For } from "solid-js";

export default function PushDemo() {
    const [getAnimals, setAnimals] = createSignal(["gajah", "jerapah"]);
    let ref: HTMLInputElement;

    return <>
        <Flipper
            defaultRectState={() => getBoundingClientRect(ref)}
            flipQuery={() => getAnimals()}>
        <div>
            let hewan = [
                    <For each={getAnimals()}>
                        {animal => <Flipped isFlippedVanishWhenCleanup={false} flipKey={animal}><span style={{display: "block"}}>{animal}, </span></Flipped>}
                    </For>
            ];
        </div>
        <div>
        hewan.push(<input
            ref={x => ref = x}
            style="width: fit-content; display: inline-block; width: 50px"
            onChange={(event) => {
                if (event.target.value.length < 4) return;
                setAnimals([...getAnimals(), event.target.value, ]);
                event.target.value = "";
            }}/>);
        </div>
        </Flipper>
    </>
}