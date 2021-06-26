import styled from 'styled-components/native'

export const Container = styled.View`
    flex: 1;
    background: #eee;
    margin-top: 20px;
`

export const HeaderBar = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`

export const UserName = styled.Text`
    font-size: 17px;
    font-weight: 700;
    margin-bottom: 3px;
`

export const UserFollow = styled.Text`
    font-size: 13.5px;
    color: #555;
    font-weight: 500;
`

export const ListImg = styled.View`
    flex-direction: row;
    flex: 1;
    height: 120px;
    margin-top: 10px;
`

export const ImgView = styled.Image`
    flex: 1; 
    justify-content: center;
    align-items: center;
`