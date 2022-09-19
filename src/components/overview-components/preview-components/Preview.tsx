import React from 'react'
import { ILayer } from '../../../interfaces/Layer'

interface PreviewProps{
	layers : ILayer[]
}

const Preview = ({layers} : PreviewProps) => {
  return (
    <div>Preview</div>
  )
}

export default Preview