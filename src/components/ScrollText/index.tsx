import React from 'react'
import styled from 'styled-components'

const ContentText = styled.div`
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: bold;
  color: #eaeaea;
  line-height: 30px;
  .outer-container,
  .content {
    width: 566px;
    height: 390px;
    @media screen and (max-width: 1200px) {
      height: 650px;
    }
  }
  .outer-container {
    position: relative;
    overflow: hidden;
  }
  .inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  /* for Chrome */
  .inner-container::-webkit-scrollbar {
    display: none;
  }
`

export default function ScrollText({ children }: { children: React.ReactNode }) {
  return (
    <ContentText>
      <div className="outer-container">
        <div className="inner-container">
          <div className="content">{children}</div>
        </div>
      </div>
    </ContentText>
  )
}
