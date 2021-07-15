import styled from 'styled-components'

export const SafeAreaView = styled.SafeAreaView`
    flex: 1;
    background: #fff;
`

export const Container = styled.View`
    flex: 1;
    background: transparent;
    padding: 5px 10px;
`

export const FormSearch = styled.View`
    width: 100%;
    background-color: #f1f1f1;
    border: none;
    border-radius: 10px;
    flex-direction: row; 
    justify-content: flex-start;
    align-items: center;
    padding: 5px 12px;
`

export const InputSearch = styled.TextInput`
    margin-left: 5px;
    padding: 10px; 
    color: #333;
    font-size: 18px;
`

export const ModalBackground = styled.View`
    flex: 1;
    background-color:rgba(0,0,0,0.6);
    justify-content: center;
    align-items: center;
`

export const ModalContainer = styled.View`
    width: 75%;
    background-color: #f4f4f4;
    padding: 30px 0 0 0;
    border-radius: 15px;
    flex-direction: column;
    align-items: center;
`

export const ModalImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-bottom: 32px;
`

export const TextWarning = styled.Text`
    width: 90%;
    font-size: 17px;
    text-align: center;
    color: #333;
    font-weight: 400;
    line-height: 26px;
`

export const TextName = styled.Text`
    font-size: 17px;
    color: #333;
    font-weight: bold;
`

export const ModalButton = styled.View`
    width: 100%;
    margin-top: 32px;
`

export const TouchButton = styled.TouchableOpacity`
    width: 100%;
    padding: 17px;
`

export const TextUnfollow = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #00B0FF;
    text-align: center;
`

export const TextDelete = styled.Text`
    font-size: 18px;
    font-weight: 700;
    color: #e74c3c;
    text-align: center;
`

export const TextCancel = styled.Text`
    font-size: 17.5px;
    font-weight: 400;
    color: #444;
    text-align: center;
`

export const TextReview = styled.Text`
    font-style: normal;
    font-weight: 600;
    color: #333;
    font-size: 20px;
    letter-spacing: 0.7px;
    line-height: 30px;
    text-shadow: 0px 5px 5px rgba(0, 0, 0, 0.25);
`