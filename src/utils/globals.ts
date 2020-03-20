const cssId = 'reading-mode';

class ReadingMode {
  private _status: boolean = false;
  get isOn(): boolean {
    return this._status;
  }
  toggle() {
    this._status = !this._status;
  }
}
const readingMode = new ReadingMode();

export {
  cssId,
  readingMode
}
