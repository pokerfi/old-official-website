import React, { memo, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const SetLanguageHapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 200px;
`

const StyledButton = styled.button<{ active: boolean }>`
  font-size: 14px;
  height: 40px;
  width: ${({ active }) => (active ? '105px' : '')};
  color: ${({ active }) => (active ? '#35DDC0' : '#FFFFFF')};
  border: ${({ active }) => (active ? `1px solid #35DDC0` : `0px`)};
  text-align: center;
  line-height: 30px;
  white-space: nowrap;
  border-radius: 20px;
  cursor: pointer;
  background-color: transparent;
`

const VerticalBar = styled.div`
  height: 15px;
  border: 1px solid #9e9e9e;
  margin-left: 20px;
  margin-right: 20px;
`

export default memo(function SetLanguage() {
  const [colorKey, setColorKey] = useState(true)
  const { i18n } = useTranslation()

  const langClick = () => {
    if (i18n.language === 'zh') {
      i18n.changeLanguage('en')
      setColorKey(false)
    } else {
      i18n.changeLanguage('zh')
      setColorKey(true)
    }
  }

  return (
    <SetLanguageHapper>
      <StyledButton active={colorKey} onClick={langClick}>
        中文版
      </StyledButton>
      <VerticalBar />
      <StyledButton active={!colorKey} onClick={langClick}>
        English
      </StyledButton>
    </SetLanguageHapper>
  )
})
