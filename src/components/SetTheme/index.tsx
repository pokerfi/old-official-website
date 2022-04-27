import React, { memo } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { themeAction } from '../../store/theme'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 1.4rem;
  white-space: nowrap;
  width: 38px;
  height: 38px;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.bg3};
  margin-right: 16px;
`

export default memo(function SetTheme() {
  const dispatch = useDispatch()

  const changeTheme = () => {
    dispatch(themeAction())
  }

  return (
    <div>
      <StyledButton onClick={changeTheme}>主题</StyledButton>
    </div>
  )
})
