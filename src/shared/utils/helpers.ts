// eslint-disable-next-line import/prefer-default-export
export function createImageElement(source: string) {
  const image = new Image()
  image.src = source

  return image
}
