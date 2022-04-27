import React, { useEffect } from 'react'
import styled from 'styled-components'
import tips_bj from '../../assets/images/tips_bj.png'

export interface TipsProps {
  title: string
  closeTips: () => void
}

const TipsPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
`

const TipsContent = styled.div`
  height: 60px;
  width: 554px;
  text-align: center;
  line-height: 60px;
  margin-left: 150px;
  margin-top: 60px;
  font-size: 18px;
  font-weight: bold;
  color: #e9c419;
  background: url(${tips_bj}) no-repeat;
  background-size: 100% 100%;
`

const Tips: React.FC<TipsProps> = (props) => {
  const { title, closeTips } = props

  useEffect(() => {
    if (title !== '') {
      setTimeout(() => {
        closeTips()
      }, 2000)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title])

  return (
    <TipsPage>
      <TipsContent>{title}</TipsContent>
    </TipsPage>
  )
}

export default Tips
