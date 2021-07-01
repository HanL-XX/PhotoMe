import styled from 'styled-components'

export const SafeAreaView = styled.SafeAreaView`
    flex :1;
    background: #fff;
`

export const Container = styled.View`
    flex: 1;
    padding: 10px;
    background: #fff;
`

export const HeaderBar = styled.View`
    flex-direction: row;
    background: #fff;
    justify-content: space-around;
    align-items: center;
    padding: 0 15px;

`

export const UserInfo = styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin-right: 10px;
    
`
export const UserImg = styled.Image`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`

export const FormInput = styled.View`
    flex: 2;
    flex-direction: row;
    border-radius: 5px;
    background-color: #eee;
    padding: 10px 12px;
`

export const FormInputText = styled.TextInput`
    color: #666;
    font-weight: 500;
    font-size: 16px;
    border: none;
    margin-left: 5px;
`