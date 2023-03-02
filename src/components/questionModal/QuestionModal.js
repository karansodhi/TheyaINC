//#region "Start"
//#region "React Native Dependencies "
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import * as ImagePaths from "../../utils/ImagePaths.js";
import styles from "./Styles";
//#endregion "Project Dependencies "
//#region "End"

const DATA = [
  {
    id: "1",
    title: "What is your mother maiden name?",
  },
  {
    id: "2",
    title: "What was your first car?",
  },
  {
    id: "3",
    title: "What elementary school did you attend?",
  },
  {
    id: "4",
    title: "What is the name of the town where you were born?",
  },
  {
    id: "5",
    title: "What is the name of your first pet?",
  },
  {
    id: "6",
    title: "In what city were you born?",
  },
  {
    id: "7",
    title: "What was the name of your elementary school?",
  },
  {
    id: "8",
    title: "What was your favorite food as a child?",
  },
  {
    id: "9",
    title: "Where did you spend your honeymoon?",
  },
];

const QuestionModal = (props) => {
  const renderQuestionItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={styles.renderItemContainer}
        onPress={() => {
          props.onPressQuestion(item);
        }}
      >
        <Text style={styles.titleDesc}>
          {index + 1}. {item.question}
        </Text>
        <Image source={ImagePaths.BACK} style={styles.rightArrow} />
      </TouchableOpacity>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        console.log("clsoed modal");
      }}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalSubContainer}>
          <Text style={styles.title}>Choose a question</Text>
          <FlatList
            data={props.data}
            renderItem={renderQuestionItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </Modal>
  );
};

export default QuestionModal;
