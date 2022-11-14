import React from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export default function DialogComponent({ title, description, onSave, onClose, isVisible, label, onChangeText, value }) {
  return (
    <View style={styles.container}>
      <Dialog.Container visible={isVisible} onBackdropPress={onClose}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Description>
          {description}
        </Dialog.Description>
        <Dialog.Input
          label={label}
          onChangeText={onChangeText}
          value={value}
        />
        <Dialog.Button label="Cancelar" onPress={onClose} />
        <Dialog.Button label="Ok" onPress={onSave} />
      </Dialog.Container>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});