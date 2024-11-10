export function getBoundingClientRect(element: HTMLElement) {
    const rect = element.getBoundingClientRect();
    return {
        width: rect.width,
        height: rect.height,
        x: rect.x + window.scrollX,
        y: rect.y + window.scrollY,
    } as DOMRect;
}

export function promiseSetTimeout(durationMs: number): Promise<void> {
    return new Promise(resolve => {
        setTimeout(resolve, durationMs);
    });
}
