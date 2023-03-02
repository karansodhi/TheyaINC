//#region "Start"
//#region "React Native Dependencies "
import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { connect, useDispatch } from "react-redux";
//#endregion "React Native Dependencies "
//#region "Project Dependencies"
import { getQuestion } from "../../redux/actions/index";
import ApiConfig from "../../config";
import styles from "./Styles";
import * as colorsCode from "../../utils/ColorsCode";
import * as ImagePaths from "../../utils/ImagePaths.js";
import QuestionModal from "../../components/questionModal/QuestionModal";
import { getSession } from "../../utils/Session";
import {
  PRIMARY_XPUB,
  SECONDARY_XPUB,
  SESSION_USER_DETAIL,
} from "../../utils/StringUtility";
//#endregion "Project Dependencies "
//#region "npm Dependencies"
import LinearGradient from "react-native-linear-gradient";
import {
  CLEAR_QUESTION,
  HIDE_LOADER,
  SAVE_FIRST_QUESTION_ANSWER,
  SAVE_QUESTION_ANSWER,
  SHOW_LOADER,
} from "../../redux/actions/ActionTypes";
import axios from "axios";

//#endregion "npm Dependencies "
//#region "End"
const RecoveryQuestionOne = ({ navigation, ...props }) => {
  const dispatch = useDispatch();

  const [answersOne, setAnswersOne] = useState("");
  const [isShowModal, setIsShowModal] = useState(false);
  const [selectedQe, setSelectedQe] = useState(null);

  useEffect(() => {
    dispatch({ type: CLEAR_QUESTION });
    getAllQuestion();
  }, []);

  const getAllQuestion = async () => {
    const userDetails = JSON.parse(await getSession(SESSION_USER_DETAIL));
    console.log(userDetails, "userDetails");
    props.getQuestion({
      sessionToken: userDetails.sessionToken,
      userId: userDetails.userID,
    });
    console.log("allQuestion", props.allQuestion);
  };

  const onPressQuestion = (selectedQuestion) => {
    console.log("onPressQuestion ==>", selectedQuestion);
    setSelectedQe(selectedQuestion);
    setIsShowModal(false);
  };

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      colors={colorsCode.colors.GRADIENT}
      style={styles.mainContainer}
    >
      <TouchableOpacity
        style={styles.back}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image source={ImagePaths.BACK} style={styles.backIcon} />
      </TouchableOpacity>
      <KeyboardAvoidingView behavior={"padding"}>
        <ScrollView>
          <View style={styles.subContainer}>
            <Text style={styles.title}>Add recovery{"\n"}questions</Text>
            <Text style={styles.titleDesc}>
              {`Please remember these\nquestion answers to recover\nyour key, once you lose or\ndamaged your device. Or forget\nthe other access options`}
            </Text>

            <Text style={styles.questionTitle}>1st question</Text>
            <Image source={ImagePaths.QE_ONE_DOT} style={styles.dot} />

            <View
              style={[
                styles.buttonContainer,
                {
                  borderColor: colorsCode.COLOR_YELLOW,
                  borderWidth: 2,
                },
              ]}
            >
              <TouchableOpacity
                style={styles.questionButton}
                onPress={() => {
                  setIsShowModal(true);
                }}
              >
                <Text style={styles.questionButtonTitle}>
                  {selectedQe === null
                    ? "Choose a question"
                    : selectedQe.question}
                </Text>
                <Image
                  source={ImagePaths.DOWN_ARROW}
                  style={styles.questionDropDownArrow}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.input}
                onChangeText={(text) => setAnswersOne(text)}
                value={answersOne}
                placeholder="Enter your answer"
                placeholderTextColor={colorsCode.colors.GREY}
              />
            </View>

            <TouchableOpacity
              style={styles.continueContainer}
              onPress={() => {
                const firstQA = {
                  question: selectedQe.question,
                  answer: answersOne,
                };
                console.log(props.isEditQuestion, "props");
                dispatch({ type: SAVE_FIRST_QUESTION_ANSWER, QA: firstQA });
                if (props.isEditQuestion) {
                  navigation.navigate("ConfirmQuestion");
                } else {
                  navigation.navigate("RecoveryQuestionTwo");
                }
              }}
            >
              <Text style={styles.continueContainerTitle}>Continue</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <QuestionModal
        modalVisible={isShowModal}
        onPressQuestion={onPressQuestion}
        data={props.allQuestion}
      />
    </LinearGradient>
  );
};

const mapStateToProps = (state) => ({
  allQuestion: state.setupkeys.allQuestion?.questions,
  isEditQuestion: state.setupkeys.isEditQuestion,
});
const mapDispatchToProps = {
  getQuestion,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecoveryQuestionOne);
