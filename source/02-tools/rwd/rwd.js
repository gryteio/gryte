const breakpoints = {
    small: 0,
    medium: 640,
    large: 1024,
  };

class RWD {
  constructor() {
    this._listeners = [];
    window.addEventListener('resize', this.resize.bind(this));
    window.addEventListener('orientationchange', this.resize.bind(this));
    this.resize();
  }

  resize(event) {
    this.width = window.innerWidth;

    this.small = (this.width < breakpoints.small);
    this.medium = (!this.small && this.width < breakpoints.medium);
    this.large = (!this.medium && this.width < breakpoints.large);
    this.xlarge = (this.width >= breakpoints.large);

    if (event) {
      for (let i = this._listeners.length - 1; i >= 0; i -= 1) {
        this._listeners[i](this);
      }
    }
    return this;
  }

  onResize(listener) {
    this._listeners.push(listener);
  }
}

export default new RWD();
