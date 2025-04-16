import { Link } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
export const BackButtonContainer = styled.div`
display: flex;
align-items: center;
gap: 10px;
`

export const BackButtonText = styled(Link)`
font-family: var(--font-family);
font-weight: 400;
font-size: 15px;
color: #000;
text-decoration: none;
`

export const BackButtonIcon = styled.img`

`

const MainBackButton = () => {
  return (
    <BackButtonContainer>
      <BackButtonText href="/">На главную</BackButtonText>
    </BackButtonContainer>
  )
}

export default MainBackButton
