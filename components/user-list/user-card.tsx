import { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { User } from "./types/user-list-types";

/**
 * UserCard component
 * Displays user information and allows interaction with the user's phone number and email
 * @param {Object} User - User data object containing user information
 * @returns {JSX.Element} - Rendered UserCard component
 */
const UserCard = ({ userData }: { userData: User }): JSX.Element => {
  const [showAddress, setShowAddress] = useState(false);

  /**
   * Handle button press
   * Toggles the visibility of the address area
   * @returns {void}
   */
  const handleButtonPress = () => {
    setShowAddress((prev) => !prev);
  };

  /**
   * Handle email press
   * Opens the default mail app to the selected user's email address
   * @returns {void}
   */
  const handleEmailPress = () => {
    const subject = "I found you";
    let url = `mailto:${userData.email}?subject=${subject}`;

    if (Platform.OS !== "android") {
      url = url.replace(/\+/g, "%20");
    }

    Linking.openURL(url).catch((error) =>
      console.error(`Error Occurred opening up Email: ${error}`)
    );
  };

  /**
   * Handle phone number press
   * Starts a phone call to the selected user's phone number
   * @returns {void}
   */
  const handlePhonePress = () => {
    const url =
      Platform.OS !== "android"
        ? `telPrompt:${userData.phone}`
        : `tel:${userData.phone}`;

    Linking.openURL(url).catch((error) =>
      console.error(`Error Occurred calling: ${error}`)
    );
  };

  return (
    <View style={styles.card}>
      <Text>
        {userData.id} <Text style={styles.cardTitle}>{userData.name}</Text>
      </Text>
      <Text>
        Works at: <Text style={styles.cardTitle}>{userData.company.name}</Text>
      </Text>
      <Text>"{userData.company.catchPhrase}"</Text>
      <Pressable
        onPress={handlePhonePress}
        style={({ pressed }) =>
          pressed ? { ...styles.phoneArea, color: "white" } : styles.phoneArea
        }
      >
        <Text>{userData.phone}</Text>
      </Pressable>
      <Pressable
        onPress={handleEmailPress}
        style={({ pressed }) =>
          pressed ? { ...styles.emailArea, color: "white" } : styles.emailArea
        }
      >
        <Text style={styles.email}>{userData.email}</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.cardButton,
          pressed && { backgroundColor: "white" },
        ]}
        onPress={handleButtonPress}
      >
        <Text style={styles.cardButtonText}>
          {showAddress ? "Hide Address" : "Show Address"}
        </Text>
      </Pressable>
      {showAddress && (
        <View style={styles.addressArea}>
          <Text>{userData.address.street}</Text>
          <Text>{userData.address.city}</Text>
          <Text>{userData.address.zipcode}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 2,
    borderRadius: 4,
    padding: 4,
    gap: 2,
    backgroundColor: "skyblue",
  },
  cardTitle: {
    fontWeight: 500,
  },
  phoneArea: {
    marginVertical: 4,
  },
  emailArea: {
    marginVertical: 4,
  },
  email: {
    color: "purple",
  },
  cardButton: {
    backgroundColor: "steelblue",
    color: "aliceblue",
    padding: 4,
    borderRadius: 4,
    alignSelf: "flex-start",
  },
  cardButtonText: {
    color: "aliceblue",
    fontWeight: 500,
  },
  addressArea: {
    borderWidth: 2,
    padding: 4,
    backgroundColor: "antiquewhite",
  },
});

export default UserCard;
