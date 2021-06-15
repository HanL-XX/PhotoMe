import styled from 'styled-components'
export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background: #fff;
    padding-bottom: 20px;
`

export const Container = styled.ScrollView`
    flex: 1;
    width:100%;
    padding: 15px;
`

export const UserImgContainer = styled.View`
    border-radius:65px;
    box-shadow:rgba(0,0,0,0.5) 0px 0 10px;
`

export const UserImg = styled.ImageBackground`
    width: 130px;
    height: 130px;
    opacity:0.8;
    /* z-index:999; */
`
export const Label = styled.Text`
    color: #333;
    font-weight: 600;
    margin: 10px 0;
    font-size: 18.5px;
`

export const TextInput = styled.TextInput`
    color: #4e4e4e;
    padding: 12px;
    font-size: 17px;
    font-weight: 600;
    border-radius: 5px;
    border: 1px solid #ccc;
    margin-bottom: 5px;
`

export const IntroText = styled.TextInput`
    border: 0.5px solid #c7c7c7;
    border-radius: 5px;
    height: 130px;
    font-size: 17px;
    justify-content: flex-start;
    color:#000;
    padding: 5px;
`

export const ProfileUserText = styled.Text`
    color: #202020;
    font-weight:700;
    text-align:center;
`