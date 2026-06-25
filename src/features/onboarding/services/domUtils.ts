export function waitForElement(
  selector: string,
  maxAttempts = 30,
  intervalMs = 100
): Promise<Element | null> {
  return new Promise((resolve) => {
    let attempts = 0;

    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        resolve(element);
        return;
      }

      attempts += 1;
      if (attempts >= maxAttempts) {
        resolve(null);
        return;
      }

      window.setTimeout(check, intervalMs);
    };

    check();
  });
}

export function focusElement(selector: string): void {
  const element = document.querySelector<HTMLElement>(selector);
  if (element && typeof element.focus === "function") {
    element.focus({ preventScroll: true });
  }
}
