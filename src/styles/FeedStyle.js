import styled from 'styled-components/native'

export const Container = styled.SafeAreaView`
    flex:1;
    /* align-items:center; */
    background-color:#fff;
`

export const Card = styled.View`
    position: relative;
    background-color:#f1f1f1bc;
    width: 100%;
    margin-bottom:15px;
    /* border-radius:10px; */
`

export const HeaderBar = styled.View`
    background-color: #fff;
    padding: 5px 15px 0 15px;
    margin-bottom:15px;

`;

export const StatusBar = styled.View`
    width:100%;
    flex-direction:row;
    justify-content: space-around;
    align-items: center;
    padding: 5px 2px;
    border:none;
    border-radius:10px;
    background-color: #e1e1e1;
`

export const UserImgStatus = styled.Image`
    width: 44px;
    height: 44px;
    border-radius:22px;
`
export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius:25px;
`

export const InputForm = styled.Text`
    margin: 3px;
    padding-left: 5px;
    border: none;
    width: 80%;
    color: #333;
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

export const UserInfo = styled.View`
    flex-direction:row;
    justify-content:space-between;
    padding:15px;
    /* background-color: #ccc; */
`

export const UserInfoText = styled.View`
    flex-direction:column;
    justify-content:center;
    margin: 5px 8px;
`

export const UserName = styled.Text`
    font-size: 15px;
    font-weight: 600;
    /* font-family:'Lato-Regular'; */
`

export const Follow = styled.View`
    flex-direction:row;
    justify-content:center;
    text-align:center;
`
export const FollowText = styled.Text`
    font-size: 15px;
    font-weight: 600;
    color: #095fff;
`

export const PostTime = styled.Text`
    font-size: 13px;
    color:#f0f0f0;
    /* font-family:'Lato-Regular'; */
`

export const PostText = styled.Text`
    font-size: 15px;  
    font-weight: 500;
    color: #333;
    padding: 0 15px;
`
export const PostImgEffect = styled.TouchableOpacity`
    position: relative;
    margin-top:15px;
`

export const PostImg = styled.Image`
    margin-top:15px;
    width:100%;
    height:250px;
`

export const InteractionWrapper = styled.View`
    flex-direction:row;
    justify-content: space-around;
    padding: 15px 5px;
`

export const Interaction = styled.TouchableOpacity`
    flex-direction:row;
    justify-content:center;
    padding: 3px;
`

export const InteractionText = styled.Text`
    font-size:12px;
    /* font-family:'Lato-Regular'; */
    font-weight:500;
    color: #333;
    margin: 5px 0 0 5px;
`

export const Divide = styled.View`
    border-bottom-width:1px;
    border-bottom-color: #ddd;
    align-self:center;
    margin-top:15px;
    width:90%;
`

export const IconJob = styled.ImageBackground`
    width: 16px;
    height: 16px;
    padding: 0;
    margin: 0 8px;
`