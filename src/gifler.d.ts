declare namespace Gifler {
  interface Animator {
    animateInCanvas(canvas: HTMLCanvasElement): void
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onDrawFrame(context: CanvasRenderingContext2D, frame: any): void
    stop(): void
  }

  interface Source {
    get(callback: (animator: Animator) => void): this
  }
  interface Gifler {
    (src: string): Source
  }
}

interface Window {
  gifler: Gifler.Gifler
}
