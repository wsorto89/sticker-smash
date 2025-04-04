import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
} from "react-native";
import UserCard from "./user-card";
import useDebounce from "./hooks/use-debounce";
import useFetch from "./hooks/use-fetch";
import { User } from "./types/user-list-types";

/**
 * UserList component fetches and displays a list of users with a filter input.
 *
 * @returns {JSX.Element} The rendered UserList component.
 */
const UserList = (): JSX.Element => {
  const [filter, setFilter] = useState("");
  const {
    isLoading,
    error,
    data: users,
  } = useFetch<User[]>({ url: `https://jsonplaceholder.typicode.com/users` });

  // Debounce the filter input to avoid excessive re-renders
  const debouncedFilter = useDebounce(filter);


  // Filter the users based on the debounced filter input
  // Use useMemo to optimize performance by memoizing the filtered data
  const filteredData = useMemo(
    () =>
      (users ?? []).filter((u) =>
        u.name.toLowerCase().includes(debouncedFilter.toLowerCase())
      ),
    [users, debouncedFilter]
  );

  return (
    <SafeAreaView style={styles.app}>
      <View style={styles.container}>
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        {error && <Text>{error}</Text>}
        {!isLoading && !error && (
          <>
            <TextInput
              placeholder={"Filter by Name"}
              value={filter}
              onChangeText={setFilter}
              style={styles.input}
            />
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              data={filteredData}
              renderItem={({ item }) => <UserCard userData={item} />}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: "aliceblue",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 32,
  },
  input: {
    borderWidth: 2,
    marginBottom: 8,
    padding: 4,
    borderRadius: 4,
    backgroundColor: "white",
  },
});

export default UserList;
