import styled from 'styled-components'

export const Wrapper = styled.ScrollView`
    max-height: 200px;
    margin: 10px;
    flex: 1;
`

export const ButtonBar = styled.View`
     width: 40px;
    height: 7px;
    border:none;
    border-radius: 10px;
    background-color: #555;
    justify-content: center;
    text-align: center;
    margin-bottom: 15px;
`

export const Status = styled.Text`
    font-size: 20px;
    font-weight: 600;
    color: #222;
    max-width: 300px;
`

export const UserImg = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`

export const NameCard = styled.Text`
    font-size: 16.5px;
    font-weight: 500;
    color: #333;

`
export const StatusCard = styled.Text`
    font-size: 16px;
    font-weight: 500;
    color: #444;

`

export const CountReact = styled.Text`
    font-size: 24px;
    font-weight: 500;
    color: #333;
    letter-spacing: 0.5px;
`

export const ContentInfo = styled.View`
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    align-items: center; 
    margin-bottom: 10px;
`

export const ReactInfo = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const IconJob = styled.ImageBackground`
    width: 16px;
    height: 16px;
`

export const NameReact = styled.Text`
    font-size: 16.5px;
    font-weight: 500;
    letter-spacing: 0.5px;
`

export const ImagePopular = styled.ImageBackground`
    width: 25px;
    height: 25px;
`

export const ButtonTag = styled.TouchableOpacity`
    background-color: #ccc;
    padding: 3px 8px;
    border-radius: 5px; 
    margin-right: 7px;
`

export const NameTag = styled.Text`
    font-size: 17px;
    font-weight: 500;
    color: #333;
`