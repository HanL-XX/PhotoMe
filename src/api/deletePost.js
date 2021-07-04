import { deletePost } from './'

let id_Newfeed;
export const onOpenBottomSheet = (modalizeRef, idPost) => {
    console.log("alo: " + idPost)
    id_Newfeed = idPost
    modalizeRef.current?.open();
}

export const handleDeletePost = async () => {
    await deletePost(id_Newfeed).then(data => {
        console.log(data)
        return data.msg;
    })
}