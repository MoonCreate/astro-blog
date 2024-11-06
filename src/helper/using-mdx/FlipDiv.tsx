import { createFlip } from "#hooks/index";
import { type JSX } from "solid-js"

type Props = {
    flipState: () => unknown;
} & JSX.HTMLAttributes<HTMLDivElement>;

export default function FlipDiv({ children, flipState, ...props }: Props) {
    let ref: HTMLDivElement;
    createFlip(() => ref, flipState);
    return <div ref={element => ref = element} {...props}>
        {children}
    </div>
}