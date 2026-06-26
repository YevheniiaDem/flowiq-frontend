/** Synchronous tour flag — React state updates too late for cross-page hints. */
let tourActive = false;

export function setTourActiveSync(active: boolean): void {
  tourActive = active;
}

export function isTourActiveSync(): boolean {
  return tourActive;
}
