import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

interface DestructionEchartsProps {
  seriesData: any[]
  size: boolean
}

export default function DestructionEcharts({ seriesData, size }: DestructionEchartsProps) {
  const main2 = useRef(null)
  let chartInstance = null

  let renderChart = () => {
    const myChart = echarts.getInstanceByDom(main2.current as unknown as HTMLDivElement)
    if (myChart) chartInstance = myChart
    else chartInstance = echarts.init(main2.current as unknown as HTMLDivElement)
    chartInstance.setOption({
      color: ['#1B93A2'],

      textStyle: {
        color: '#638B95',
      },
      xAxis: {
        show: false,
        type: 'category',
        boundaryGap: false,
      },
      yAxis: {
        type: 'value',
        position: 'right',
        splitLine: {
          lineStyle: {
            // 使用深浅的间隔色
            color: ['#1A2E38', '#1A2E38'],
          },
        },
      },
      series: [
        {
          data: seriesData,
          type: 'line',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                {
                  offset: 0,
                  color: '#1B93A2',
                },
                {
                  offset: 1,
                  color: '#17242E',
                },
              ],
              global: false,
            },
          },
        },
      ],
    })
  }

  useEffect(() => {
    renderChart()
    // eslint-disable-next-line
  }, [seriesData])

  return (
    <div>
      <div style={size ? { height: 280, width: 550 } : { height: 300, width: 600 }} ref={main2} />
    </div>
  )
}
