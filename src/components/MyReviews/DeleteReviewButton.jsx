import { Alert } from 'react-native'
import { useDeleteReview } from '../../hooks/useReview'
import Pressable from '../Pressable'

const DeleteReviewButton = ({id}) => {
  const [deleteReview] = useDeleteReview();

  const handleDelete = async () => {
    Alert.alert(
      'Delete review',
      'Do you want to delete this review?',
      [
        {
          text: 'Cancel',
          onPress: () => Alert.alert('Deletion cancelled'),
          style: 'cancel'
        },
        {
          text: 'OK', onPress: () => removeReview()
        },
      ]
    )
  }

  const removeReview = async () => {
    try {
      const deleted = await deleteReview(id);
      if (deleted) Alert.alert('The review has been deleted')
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Pressable backgroundColor={'red'} onPress={handleDelete} text={'Delete review'} />
  )
}

export default DeleteReviewButton
