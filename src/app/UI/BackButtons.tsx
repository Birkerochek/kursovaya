import React from 'react'
import styled from 'styled-components'
import MainBackButton from './MainBackButton'
import BackButton from './BackButton'


const BackButtonsContainer = styled.div`
display: flex;
align-items: center;
gap: 10px;
`

const BackButtons = () => {
  return (
    <BackButtonsContainer>
    
    <MainBackButton></MainBackButton>
    <BackButton></BackButton>
    </BackButtonsContainer>
  )
}

export default BackButtons
