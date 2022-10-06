import React from "react";

export function getChildren<T extends Element>(c: Element): T[] {
  const subElements: T[] = [];
  if (c == null || c.children == null) {
    return subElements;
  }
  for (let i = 0; i < c.children.length; i++) {
    const item = c.children.item(i);
    if (item == null) {
      continue;
    }

    subElements.push(item as T);
  }
  return subElements;
}

export function getChildrenFromRef<T extends Element>(
  c: React.RefObject<Element>
): T[] {
  const subElements: T[] = [];
  if (c == null || c.current == null) {
    return subElements;
  }
  return getChildren<T>(c.current);
}

export function getElementById(id: string): HTMLElement {
  let e: HTMLElement = document.createElement("div");
  const candidate = document.getElementById(id);
  if (candidate == null) {
    return e;
  }
  e = candidate;
  return e;
}

export default {
  getChildren,
  getChildrenFromRef,
  getElementById,
};
