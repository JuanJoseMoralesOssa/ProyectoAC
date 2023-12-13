export class UCControl {
  element: HTMLElement;
  originalContent: string;

  constructor(private el: HTMLElement) {
    this.element = el;
    this.originalContent = el.innerHTML;
  }

  changeContent(tempContent: string, duration: number) {
    this.element.innerHTML = tempContent;

    return new Promise((resolve) =>
      setTimeout(
        () => (this.element.innerHTML = this.originalContent),
        duration
      )
    );
  }
}
