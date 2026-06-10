import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
      position: "absolute",
      top: 60,
      width: "100%",
      alignItems: "center",
      zIndex: 9999,
      paddingHorizontal: 10,
    },
    alert: {
      width: "100%",
      minHeight: 60,
      backgroundColor: "#E53935",
      borderRadius: 16,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 14,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 6,
      },
      shadowOpacity: 0.2,
      shadowRadius: 10,
      elevation: 8,
    },
    msg: {
      flex: 1,
      marginLeft: 12,
      color: "#FFFFFF",
      fontSize: 15,
      fontWeight: "600",
      lineHeight: 20,
    },
  });