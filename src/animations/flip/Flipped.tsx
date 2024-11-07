import { type JSX, children, onCleanup, onMount, useContext } from "solid-js";
import { FlipperContext } from "./Flipper";

type Props = {
    children: JSX.Element;
    flipKey: unknown;
}

export default function Flipped(props: Props) {
    const context = useContext(FlipperContext);
    const resolved = children(() => props.children);

    if (resolved() instanceof Array) throw new Error("Only one child allowed");

    onMount(() => {
        context?.add(props.flipKey, resolved() as never);
        onCleanup(() => {
            context?.interupt(props.flipKey);
        })
    })

    return <>
        {resolved()}
    </>;
}