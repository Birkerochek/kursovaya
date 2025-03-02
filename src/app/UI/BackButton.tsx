import React from 'react'
import styled from 'styled-components'
export const BackButtonContainer = styled.div`
display: flex;
align-items: center;
gap: 10px;
cursor: pointer;
`

export const BackButtonText = styled.p`
font-family: var(--font-family);
font-weight: 400;
font-size: 15px;
color: #000;
`

export const BackButtonIcon = styled.img`

`

const BackButton = () => {
  return (
    <BackButtonContainer onClick={() => window.history.back()}>
      <BackButtonIcon src="/backArrow.svg" alt="Back arrow"  />
      <BackButtonText >Назад</BackButtonText>
    </BackButtonContainer>
  )
}

export default BackButton
