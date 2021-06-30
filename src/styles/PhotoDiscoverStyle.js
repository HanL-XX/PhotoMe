import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    background: #eee;
`

export const BodyContent = styled.ScrollView`
    background-color: #eee;
    padding: 5px;
    border-radius: 5px;

`

export const HeaderBodyContent = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
`

export const Label = styled.Text`
    color: #000;
    font-weight: 600;
    font-size: 18px;
    margin: 5px 0;
`

export const ButtonShow = styled.TouchableOpacity`
    border: none;
    background: transparent;
`