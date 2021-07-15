import styled from 'styled-components'

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background: #fff;
`

export const Container = styled.ScrollView`
    flex: 1;
    background-color: #fff;
`
export const IconContainer = styled.View`
    /* margin-top:5px; */
    width:90%;
    align-items:center;
    display:flex;
    flex-direction:row;
`

export const UserImgContainer = styled.View`
    border-radius:65px;
    box-shadow: 1px 1px 8px rgba(0,0,0,0.5) ;
`

export const UserImg = styled.Image`
    width: 130px;
    height: 130px;
    border-radius: 65px;
    z-index:999;
`

export const UserName = styled.TextInput`
    color: #222;
    margin-top: 24px;
    font-size: 17px;
    font-weight: 700;
`

export const Description = styled.Text`
    color: #7e7e7e;
    font-size: 14px;
    font-weight: 400;
    margin-top: 5px;
    font-style:italic;
    letter-spacing:1.04px;
    text-align:center;
    /* background-color: #333; */
`

export const StatsContainer = styled.View`
    flex-direction:row;
    justify-content:space-between;
    margin: 24px;
`

export const Stat = styled.TouchableOpacity`
    align-items:center;
    flex: 1; 
`

export const StatAmount = styled.Text`
    color: #464c61;
    font-size:18px;
    font-weight: 500;
`

export const StatTitle = styled.Text`
    color: #a9aaad;
    font-size: 13px;
    font-weight: 500;
    margin-top:5px;
`

export const EditProfile = styled.TouchableOpacity` 
    width:92%;
    padding: 12px;
    border: 0.5px solid #c7c7c7;
    border-radius: 7px;
    margin-bottom: 35px;
`

export const EditProfileText = styled.Text`
    color: #333;
    font-weight: 700;
    text-align:center;
`
export const ProfileUser = styled.TouchableOpacity` 
    /* width:90%; */
    flex: 1;
    padding: 10px;
    border: 0.5px solid #c7c7c7;
    border-radius: 6px;
    margin-bottom:40px;
    margin-left: 7px;
    margin-right: 7px;
`

export const ProfileUserText = styled.Text`
    color: #202020;
    font-weight:700;
    text-align:center;
`

export const ViewCreate = styled.View`
    flex-direction: column;
    align-items: stretch;
`

export const TextReview = styled.Text`
    font-style: normal;
    font-weight: 600;
    color: #222;
    font-size: 20px;
    letter-spacing: 0.7px;
    text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
    text-align: center;
    margin-bottom: 6px;
`

export const TextCreate = styled.Text`
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    letter-spacing: 0.7px;
    text-align: center;
    color: rgb(43, 110, 255);
`