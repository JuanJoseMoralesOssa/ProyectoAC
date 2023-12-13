import { UCControl } from "./uc.control";

export class UC {

  constructor() {}

  private addRedBorder(color: string, el: HTMLElement) {
    el.style.border = '5px solid ' + color;
  }

  public removeBorder(el: HTMLElement) {
    el.style.border = '';
  }

  public async empezarSenal(el: HTMLElement, color: string) {
    this.addRedBorder(color, el);
    return this.sleep(2000).then(() => {
      this.removeBorder(el)
      return new Promise((resolve) => {
        resolve(true);
      });
    });
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public leer(el : HTMLElement) {
    const ucControl = new UCControl(el);
    return ucControl.changeContent('READ', 2000);
  }

  public escribir(el :HTMLElement) {
    const ucControl = new UCControl(el);
    return ucControl.changeContent('WRITE', 2000);
  }

}
