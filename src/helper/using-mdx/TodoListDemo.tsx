import DemoWrapper from "#root/layouts/DemoWrapper";
import { css } from "@linaria/core";
import { For, createSignal } from "solid-js";
import { getBoundingClientRect } from "#root/utils";
import { Flipper, Flipped } from "#root/animations/flip";
import DemoButton from "#root/components/Button/DemoButton";

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
        grid-template-rows: min-content minmax(10rem, 1fr) min-content;
        padding: 1rem;
        gap: 1rem;
        & > * {
            border: 2px dashed hsl(var(--color-overlay0));
            padding: 0rem;
            display: flex;
            flex-flow: row wrap;
            gap: 1rem;
            &:has(h3), &:has(form) {
                justify-content: center;
                border: none;
            }
            h3 {
                margin: 0 !important;
                margin-inline: auto;
                padding: 0;
                text-align: center;
                height: min-content;
            }
        }
        span {
            padding-inline: 0.5rem
        }
    `;

    const controlStyle = css`
        grid-column: 1 / -1;
        min-height: 0;
        padding: .5rem;
        form {
            display: contents;
        }
        input {
            outline: none;
            border: none;
            display: block;
            width: 100%;
            border-radius: 6px;
            padding: .5rem;
        }
    `;

    return <DemoWrapper class={wrapperStyle}>
        <div>
            <h3>Todo</h3>
        </div>
        <div>
            <h3>Done</h3>
        </div>
        <Flipper
            flipQuery={getTodo().join("")}
            defaultRectState={() => ({...getBoundingClientRect(ref), width: 0, height: 0})}
            >
            <div>
                <For each={getTodo().filter(todo => !todo.done)}>
                    {todo => <Flipped flipKey={todo.id} isFlippedVanishWhenCleanup={false}>
                        <DemoButton
                            style="--button-color: var(--color-green)"
                            onclick={() => toggleTodo(todo.id)}>
                            <span>
                                {todo.text}
                            </span>
                        </DemoButton>
                    </Flipped>}
                </For>
            </div>
            <div>
                <For each={getTodo().filter(todo => todo.done)}>
                    {todo => <Flipped flipKey={todo.id}>
                        <DemoButton
                            onclick={() => removeTodo(todo.id)}>
                            <span>
                                {todo.text}
                            </span>
                        </DemoButton>
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