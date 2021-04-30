import styled from 'styled-components/native'

export const Container = styled.View`
    flex:1;
    padding:0 20px;
    align-items:center;
    background-color:#fff;
`;

export const Card = styled.TouchableOpacity`
    width:100%;
`

export const UserInfo = styled.View`
    flex-direction:row;
    justify-content:space-between;
`

export const UserImgWrapper = styled.View`
    padding: 15px 0;
`

export const UserImg = styled.Image`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius:30px;
`

export const UserActive = styled.View`
    width: 17px;
    height: 17px;
    border-radius:8.5px;
    background-color:#31A24C;
    border:2.5px solid #fff;
    position:absolute;
    bottom:22%;
    right:10%;
`

export const TextSection = styled.View`
    flex-direction:column;
    justify-content:center;
    padding:15px;
    padding-left:0;
    margin-left:10px;
    width:300px;
    border-bottom-width:1px;
    border-bottom-color: #ccc;
`

export const UserInfoText = styled.View`
    flex-direction:row;
    justify-content:space-between;
    margin-bottom: 5px;
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

export const MessageText = styled.Text`
    font-size: 15px;
    color: #444;
`