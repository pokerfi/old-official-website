import React, { useEffect, useState } from 'react'
import { useSpring, animated } from '@react-spring/web'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
`
const Main = styled.div`
  position: relative;
  width: 250px;
  height: 5px;
  cursor: pointer;
  border-radius: 5px;
  overflow: hidden;
  .fill {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: hotpink;
  }
`
interface ProgressBarProps {
  remaining: number
  color: string
}

export default function ProgressBar({ remaining, color }: ProgressBarProps) {
  const [open, toggle] = useState(false)
  const props = useSpring({ width: open ? remaining : 0, background: color })

  useEffect(() => {
    toggle(!open)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <Main>
        <animated.div className={'fill'} style={props} />
        {/* <animated.div className={'content'}>{props.width.to(x => x.toFixed(0))}</animated.div> */}
      </Main>
    </Container>
  )
}
