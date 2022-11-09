import React, {useMemo} from 'react';
import {
  Modal,
  StyleSheet,
  Pressable,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {getScreenHeight, getScreenWidth} from '../utils/domUtils';

const CustomActionModal = (props: any) => {
  return (
    <>
      <Modal
        onRequestClose={props.close}
        visible={true}
        animationType="slide"
        transparent={true}
        {...props}>
        <Pressable onPress={props.pressHandler} style={styles.modalScreen}>
          <View style={styles.modalContanier}>
            <Text style={styles.title}>{props.title}</Text>
            <View style={{height: getScreenHeight(1)}} />
            <Text style={styles.subtitle}>{props.subtitle}</Text>
            <View style={styles.buttoncontanier}>
              <TouchableOpacity onPress={props.firstbuttonaction}>
                <Text style={styles.title}>{props.firstbuttontitle}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.secondbuttonaction}>
                <Text style={[styles.title, {color: "red"}]}>
                  {props.secondbuttontitle}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalScreen: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'center',
  },
  modalContanier: {
    backgroundColor: "white",
    width: getScreenWidth(90),
    alignSelf: 'center',
    justifyContent: 'space-between',
    padding: getScreenHeight(2),
    borderRadius: getScreenHeight(1),
  },
  title: {
    fontSize: getScreenHeight(1.8),
    color: "black",
  },
  subtitle: {
    fontSize: getScreenHeight(1.5),
    color: "black",
  },
  buttoncontanier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: getScreenHeight(2),
  },
});

export default CustomActionModal;
