import React from 'react'
import styled from 'styled-components'
import HomePage from '../../components/HomePage'

const HomeWrapper = styled.div`
  position: relative;
`

export default function Home() {
  return (
    <HomeWrapper>
      <HomePage />
    </HomeWrapper>
  )
}
