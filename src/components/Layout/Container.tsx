import styled from 'styled-components'

const Container = styled.div`
  margin-left: auto;
  margin-right: auto;
  max-width: 1320px;
  padding-left: 15px;
  padding-right: 15px;
  ${({ theme }) => theme.mediaQueries.lg} {
    padding-left: 0px;
    padding-right: 0px;
  }
`

export default Container
