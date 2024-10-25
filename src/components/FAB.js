import { FloatingAction } from "react-native-floating-action";
import Entypo from '@expo/vector-icons/Entypo';
const actions = [
  {
    text: 'Add',
    icon: <Entypo name="plus" size={20} color="white" />,
    name: 'bt_add',
    position: 1,
  },
  {
    text: 'Star',
    icon: <Entypo name="star" size={20} color="white" />,
    name: 'bt_star',
    position: 2,
  },
  // Add other actions as needed
];

export default function ActionButton(){
  return (
    <FloatingAction
      actions={actions}
      onPressItem={name => {
        console.log(`selected button: ${name}`)
      }}
      
      />
  )
}