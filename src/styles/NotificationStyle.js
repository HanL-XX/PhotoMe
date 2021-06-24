import styled from 'styled-components/native'

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background: #fff;
`
export const Container = styled.View`
    padding: 10px;
    background: #fff;
`

export const UserInfo = styled.TouchableOpacity`
    width: 100%;
    background-color: #eee;
    flex-direction:row;
    padding: 5px 10px;
    margin: 5px 0;
`
export const UserNotifi = styled.TouchableOpacity`
    width: 100%;
    background-color: #C0C0C0;
    flex-direction:row;
    padding: 5px 10px;
    margin: 5px 0;
`
export const UserImg = styled.Image`
    width: 60px;
    height: 60px;
    border-radius:30px;
`
export const UserInfoWrapper = styled.View`
    flex: 1;
    flex-wrap: wrap;
    margin-left: 10px;
    justify-content: center;
    align-items: center;
`

export const UserInfoText = styled.Text`
    font-size: 17px;
    color: #444;
    font-weight: 500;
`
export const UserName = styled.Text`
    font-size: 16px;
    font-weight: bold;
    /* font-family:'Lato-Regular'; */
`

export const PostTime = styled.Text`
    font-size: 13px;
    color:#666;
    /* font-family:'Lato-Regular'; */
`