import styled from 'styled-components'

export const Container = styled.View`
    flex: 1;
    background: #eee;
    /* align-items: center; */
`

export const Wrapper = styled.View`
    position: absolute;
    bottom: 0;
    left: 0;
    background: #fff;
    width: 100%;
    padding: 15px 10px;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const CountComment = styled.Text`
    color: #333;
    font-size: 18px;
    font-weight: 500;
`

export const UserInfo = styled.View`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const InputCommentView = styled.View`
    border: 1.5px solid #eee;
    border-radius: 7px;
    width: 80%;
    margin-left: 5px;
    padding: 7px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

`

export const InputComment = styled.TextInput`
    width: 90%;
    color: #333;
    border: none;
    font-size: 15px;
    font-weight: 500;
    padding: 5px;
`
