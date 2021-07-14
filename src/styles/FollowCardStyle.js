import styled from 'styled-components'

export const Card = styled.TouchableOpacity`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 5px;
    margin-bottom: 15px;
`

export const Wrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

export const UserImg = styled.View`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    margin-right: 10px;

`

export const Image = styled.Image`
     width: 60px;
    height: 60px;
    border-radius: 30px;
`

export const UserInfo = styled.View`
    flex-direction: column;
`

export const UserName = styled.Text`
    font-size: 17.5px;
    font-weight: 600;
    margin-bottom: 3px;
`

export const WorkName = styled.Text`
    font-size: 15px;
    font-weight: 400;
`

export const FormButton = styled.View`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const Button = styled.TouchableOpacity`
    border: 1.5px solid #25b644;
    border-radius: 5px;
    padding: 7px 18px;
    background: transparent;
    margin-right: 3px;
`

export const Following = styled.Text`
    font-size: 15px;
    margin: 0 5px;
    font-weight: 600;
    color: #25b644;
`

export const ButtonDelete = styled.TouchableOpacity`
    border: 1.5px solid #ccc;
    border-radius: 5px;
    padding: 7px 18px;
    background: transparent;
`

export const Delete = styled.Text`
    font-size: 15px;
    margin: 0 5px;
    font-weight: 600;
    color: #555;
`

