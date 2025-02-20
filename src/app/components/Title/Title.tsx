import React, { ReactNode } from 'react'
import styled from 'styled-components'
const StyledTitle = styled.p`
    font-family: var(--font-family);
font-weight: 400;
font-size: 45px;
color: #000;
margin: 40px 0;
`
type TitleProps = {
    children: ReactNode
}

const Title = ({children}: TitleProps) => {
  return (
    <div>
      <StyledTitle>{children}</StyledTitle>
    </div>
  )
}

export default Title
