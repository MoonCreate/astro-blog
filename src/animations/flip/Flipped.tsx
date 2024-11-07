import { type JSX, children, onCleanup, onMount, useContext } from "solid-js";
import { FlipperContext } from "./Flipper";

type Props = {
    children: JSX.Element;
    flipKey: unknown;
    isFlippedVanishWhenCleanup?: boolean;
}

export default function Flipped(props: Props) {
    const context = useContext(FlipperContext);
    const resolved = children(() => props.children);

    if (resolved() instanceof Array) throw new Error("Only one child allowed");

    onMount(() => {
    const isFlippedVanishWhenCleanup = props.isFlippedVanishWhenCleanup ?? true;
    const res = resolved() as HTMLElement;
    context?.add(props.flipKey, res);
        onCleanup(() => {
            if (!isFlippedVanishWhenCleanup) {
                context?.interupt();
            } else {
                context?.delete(props.flipKey);
            }
        });
    });

    return <>
        {resolved()}
    </>;
}