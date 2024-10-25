import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => (
  <>
    <NextImage src={`${basePath || ''}${src}`} {...rest} />
    <div>{basePath}</div>
  </>
)

export default Image