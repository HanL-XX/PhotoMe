import React, { useRef } from 'react'
import { Transition, Transitioning } from 'react-native-reanimated'
import styled from 'styled-components/native'

const Images = {
    icons: {
        home: require('../assets/images/home.png'),
        homeFocused: require('../assets/images/homeFocused.png'),
        compass: require('../assets/images/compass.png'),
        compassFocused: require('../assets/images/compassFocused.png'),
        notification: require('../assets/images/notification.png'),
        notificationFocused: require('../assets/images/notificationFocused.png'),
        search: require('../assets/images/search.png'),
        searchFocused: require('../assets/images/searchFocused.png'),
        account: require('../assets/images/account.png'),
        accountFocused: require('../assets/images/accountFocused.png'),
    }
}

const Container = styled.TouchableOpacity`
    flex: auto;
    background-color: #fff;
`

const Background = styled(Transitioning.View)`
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    padding: 7px;
    margin: 0 5px;
    background: ${(props) => (props.focused ? '#3498DB' : '#fff')};
`
const Label = styled.Text`
    color: #fff;
    font-weight: 600;
    font-size: 14.5px;
    margin-left: 5px;
`

const Icon = styled.Image`
    width: 28px;
    height: 28px;
`

export default function TabComponents({ label, accessibilityState, onPress }) {
    const focused = accessibilityState.selected
    const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`]
    const transition = (
        <Transition.Sequence>
            <Transition.Out type="fade" durationMs={0} />
            <Transition.Change interpolation="easeInOut" durationMs={1000} />
            <Transition.In type="fade" durationMs={100} />
        </Transition.Sequence>
    )

    const ref = useRef()


    return (
        <Container
            activeOpacity={1}
            onPress={() => {
                ref.current.animateNextTransition()
                onPress()
            }}
        >
            <Background ref={ref} transition={transition} focused={focused}>
                <Icon source={icon} />
                {focused && <Label>{label.charAt(0).toUpperCase() + label.slice(1)}</Label>}
            </Background>
        </Container>
    )
}
