import React from 'react'

export function getChildren(c: Element): Element[] {
    const subElements: Element[] = [];
    if (c == null || c.children == null) { return subElements; }
    for (let i = 0; i < c.children.length; i++) {
        const item = c.children.item(i);
        if (item == null) { continue; }
        subElements.push(item);
    }
    return subElements;
}

export function getChildrenFromRef(c: React.RefObject<Element>): Element[] {
    const subElements: Element[] = [];
    if (c == null || c.current == null) { return subElements; }
    return getChildren(c.current);
}

export function getElementById(id: string): HTMLElement {
    let e:HTMLElement = document.createElement("div");
    const candidate = document.getElementById(id);
    if (candidate == null) { return e;}
    e = candidate;
    return e;
}

export default {
    getChildren,
    getChildrenFromRef,
    getElementById
};

// module.exports = {
//      getChildren
// }