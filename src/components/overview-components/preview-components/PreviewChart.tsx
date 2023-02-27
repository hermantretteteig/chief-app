import React, { PureComponent } from 'react'
import { ILayer } from '../../../interfaces/Layer'

interface PreviewChartLayer {
    layer : ILayer
}


const PreviewChart = ({layer} : PreviewChartLayer) => {

    return (
        <>
        <div className="chart-container">
            <p className="chart-title">{layer.mainTitle}</p>
            <img className='chart-size' src={layer.imageBlobUrl}/>
        </div>
        </>
    )
  }


export default PreviewChart