import { useEffect } from 'react'
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
    box-shadow:rgba(0,0,0,0.5) 0px 0 10px;
`

export const UserImg = styled.Image`
    width: 130px;
    height: 130px;
    border-radius: 65px;
    z-index:999;
`

export const UserName = styled.TextInput`
    color: #222222;
    margin-top: 24px;
    font-size: 17px;
    font-weight: 600;
`

export const Description = styled.Text`
    color: #7e7e7e;
    font-size: 14px;
    font-weight: 400;
    margin-top: 7px;
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

export const Stat = styled.View`
    align-items:center;
    flex:1;
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
    width:90%;
    padding: 10px;
    border: 1px solid #b8b8b8;
    margin-bottom:40px;
`

export const EditProfileText = styled.Text`
    color: #202020;
    font-weight:600;
    text-align:center;
`