import { createSignal, type JSX } from "solid-js";

export default function createMatcherRange<T>(matches: T[], initial = 0) {
    const [getIndex, setIndex] = createSignal(initial);
    const getMatch = () => matches[getIndex()];

    return [{
        min: 0,
        max: matches.length - 1,
        value: getIndex(),
        oninput: e => setIndex(+e.target.value),
    }, getMatch, getIndex] as [
        controls: JSX.InputHTMLAttributes<HTMLInputElement>,
        match: typeof getMatch,
        index: typeof getIndex
    ];
}