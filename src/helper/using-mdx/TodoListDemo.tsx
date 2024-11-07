import DemoWrapper from "#root/layouts/DemoWrapper";
import { css } from "@linaria/core";
import { For, createSignal } from "solid-js";
import { getBoundingClientRect } from "#root/utils";
import { Flipper, Flipped } from "#root/animations/flip";

export default function TodoListDemo() {
    const [getText, setText] = createSignal("");
    const [getTodo, setTodo]= createSignal([] as { id: number, text: string; done: boolean }[]);

    let ref: HTMLElement;

    const addTodo = (text: string) => {
        setTodo([...getTodo(), { id: Date.now(), text, done: false }]);
    }

    const removeTodo = (id: number) => {
        setTodo(getTodo().filter(todo => todo.id !== id));
    }

    const toggleTodo = (id: number) => {
        setTodo(getTodo().map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo));
    }

    const wrapperStyle = css`
        display: grid;
        grid-template-columns: 1fr 1fr;
        padding: 1rem;
        gap: 1rem;
        & > * {
            border: 2px dashed hsl(var(--color-overlay0));
            padding: 1rem;
        }
    `;

    const controlStyle = css`
        grid-column: 1 / -1;
    `;

    return <DemoWrapper class={wrapperStyle}>
        <Flipper
            flipQuery={getTodo()}
            defaultRectState={() => getBoundingClientRect(ref)}
            >
            <div>
                <For each={getTodo().filter(todo => !todo.done)}>
                    {todo => <Flipped flipKey={todo.id}>
                        <div
                            onclick={() => toggleTodo(todo.id)}>
                            {todo.text}
                        </div>
                    </Flipped>}
                </For>
            </div>
            <div>
                <For each={getTodo().filter(todo => todo.done)}>
                    {todo => <Flipped flipKey={todo.id}>
                        <div
                            onclick={() => removeTodo(todo.id)}>
                            {todo.text}
                        </div>
                    </Flipped>}
                </For>
            </div>
        </Flipper>
        <div class={controlStyle}>
            <form onsubmit={e => {
                e.preventDefault();
                addTodo(getText());
                setText("");
            }}>
            <input ref={x => ref = x} type="text" name="text" value={getText()} oninput={e => setText(e.target.value)} />
            </form>
        </div>
    </DemoWrapper>
}