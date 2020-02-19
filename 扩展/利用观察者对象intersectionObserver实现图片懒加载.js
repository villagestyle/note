const imgs = document.querySelectorAll('.intersection_observer');

const lazyObserve = new IntersectionObserver(entries => {
    // entries储存着所有的观察者
    entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
            // 大于0表示进入视口
            entry.src = entry.target.dataset.src;
            // 取消观察
            lazyObserve.unobserve(entry.target);
        }
    })
})

imgs.map(d => lazyObserve.observe(d));

// interface IntersectionObserver {
//     readonly root: Element | null;
//     readonly rootMargin: string;
//     readonly thresholds: ReadonlyArray<number>;
//     disconnect(): void;
//     observe(target: Element): void;
//     takeRecords(): IntersectionObserverEntry[];
//     unobserve(target: Element): void;
// }

// declare var IntersectionObserver: {
//     prototype: IntersectionObserver;
//     new(callback: IntersectionObserverCallback, options?: IntersectionObserverInit): IntersectionObserver;
// };

// interface IntersectionObserverCallback {
//     (entries: IntersectionObserverEntry[], observer: IntersectionObserver): void;
// }

/** This Intersection Observer API interface describes the intersection between the target element and its root container at a specific moment of transition. */
// interface IntersectionObserverEntry {
//     readonly boundingClientRect: ClientRect | DOMRect;
//     readonly intersectionRatio: number;
//     readonly intersectionRect: ClientRect | DOMRect;
//     readonly isIntersecting: boolean;
//     readonly rootBounds: ClientRect | DOMRect | null;
//     readonly target: Element;
//     readonly time: number;
// }