import { deletePost } from './index'
import { Alert } from 'react-native'

let id_Newfeed;
export const onOpenBottomSheet = (modalizeRef, idPost, id_User) => {
    id_Newfeed = idPost
    modalizeRef.current?.open();
}

export const handleDeletePost = async () => {
    await deletePost(id_Newfeed).then(data => {
        return data.msg;
    })
}

export const reportPost = async (id_Post) => { }


export const deleteThisPost = (modalizeRef) => {
    Alert.alert(
        //Title
        '',
        //Body
        "Are you sure to delete this post?",
        [
            {
                text: 'Yes',
                onPress: async () => {
                    const seconds = Math.floor(Math.random() * 1000) + 600
                    await deletePost(id_Newfeed)
                    setTimeout(() => {
                        Alert.alert(
                            //Title
                            '',
                            //Body
                            "Delete successfully!",
                            [
                                {
                                    text: 'Yes',
                                    onPress: () => {
                                        modalizeRef.current?.close()
                                    }
                                },
                            ]
                        )
                    }, seconds);
                }
            },
            {
                text: 'No',
            }
        ]
    )
}