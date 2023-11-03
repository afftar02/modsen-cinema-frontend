class MockIntersectionObserver implements IntersectionObserver {
  constructor() {}

  observe() {
    return null;
  }

  unobserve() {
    return null;
  }

  disconnect() {
    return null;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  root: Element | null = null;
  rootMargin: string = '';
  thresholds: ReadonlyArray<number> = [];
}

global.IntersectionObserver = MockIntersectionObserver;
