import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.div`
  font-size: 0.9rem;
`

const StyledInput = styled.input`
  font-size: 1rem;
  border: 1px solid gray;
  border-radius: 0.25rem;
  margin-bottom: 0.2rem;
  padding: .375rem .75rem;
  width: 100%;
  &:focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`

function ContentInput(props) {
  const {title, baseUrl} = props
  const handleClick = (event) => event.target.select();

  const formatUrl = (type) => {
    if (type === 'Markdown') {
      return "![IMG_3787.JPG](" + baseUrl + ")"
    } else if (type === 'ImageURL') {
      return baseUrl
    } else if (type === 'HTML') {
      return "<a href=\"" + baseUrl + "\" target=\"_blank\"><img src=\"" + baseUrl + "\" ></a>"
    } else {
      return "undefined"
    }
  }

  return (
    <div>
      <StyledTitle>{title}</StyledTitle>
      <StyledInput type="text" onClick={handleClick} value={formatUrl(title)}/>
    </div>
  )
}

export default ContentInput;