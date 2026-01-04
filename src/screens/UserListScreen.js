/* eslint-disable react-native/no-inline-styles */
import {
  FlatList,
  KeyboardAvoidingView,
  Alert,
  View,
  Platform,
} from 'react-native';
import {
  Button,
  TextInput,
  Text,
  Checkbox,
  MD3LightTheme,
  PaperProvider,
  IconButton,
  Tooltip,
} from 'react-native-paper';
import { asp } from '../apis/apiService';
import React, { useState, useEffect } from 'react';
import InsertIcon from '../assets/insert-icon.svg';
import UpdateIcon from '../assets/update-icon.svg';
import DeleteIcon from '../assets/delete-icon.svg';
import styles from '../styles/global';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from 'react-native-paper';
import { Dropdown, MultiSelectDropdown } from 'react-native-paper-dropdown';
import { useIsFocused } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const theme = {
  ...MD3LightTheme, // or MD3DarkTheme
  roundness: 5,
  colors: {
    ...MD3LightTheme.colors,
    // primary: '#3498db',
    primary: 'black',
    secondary: '#f1c40f',
    // tertiary: '#a1b2c3',
    tertiary: 'black',
  },
};

const UserListScreen = ({ navigation }) => {
  const thisName = '▶ ' + UserListScreen.name + ' ::: ';
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userIdS, setUserIdS] = useState('');

  useEffect(() => {
    setUserIdS('');
    handleSearchRows;
  }, []);

  const onChangeTextUserIdS = userIdS => {
    setUserIdS(userIdS);
  };

  const handleSearchRows = async () => {
    setLoading(true);
    try {
      const args = {
        sp_name: 'asp_users_s',
        user_id_s: userIdS,
      };
      console.log(thisName + 'args: ' + JSON.stringify(args));
      const data = await asp(args);
      setItems(data);
      console.log(
        thisName + 'handleInsertOrUpdateItem:' + JSON.stringify(data),
      );
      //fetchItems(); // 목록 갱신
    } catch (err) {
      console.err('Failed to update item', err);
    } finally {
      setLoading(false);
      console.log(thisName + '사용자 등록이 완료 되었습니다.');
    }
  };

  const handleDeleteRow = async user_id => {
    setLoading(true);

    Alert.alert(
      '사용자삭제',
      '정말로 사용자(' + user_id + ')를 삭제하시겠습니까?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
          },
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const args = {
                sp_name: 'asp_users_d',
                user_id: user_id,
              };
              console.log(thisName + 'args: ' + JSON.stringify(args));
              const data = await asp(args);
              setItems(data);
              console.log(thisName + 'handleDeleteRow:' + JSON.stringify(data));
              //fetchItems(); // 목록 갱신
            } catch (err) {
              console.err(thisName + 'Failed to update item', err);
            } finally {
              setLoading(false);
              console.log(thisName + '사용자 삭제가 완료 되었습니다.');
              handleSearchRows;
            }
          },
        },
      ],
    );
  };

  const renderItem = ({ item }) => (
    <View style={[styles.viewRowContainer, { alignItems: 'center' }]}>
      <Text
        style={[styles.textCon, { width: '75%', fontSize: 16 }]}
        variant="bodyMedium"
      >
        {/* UserId: {item.user_id}, Name: {item.name}, Age: {item.age}, SexTy:
        {item.sex_ty}, Note: {item.note} */}
        {item.user_id} {item.name}
      </Text>
      <Tooltip
        style={[styles.tooltipCon, { width: 40, height: 40 }]}
        title="편집"
      >
        <View>
          <MaterialIcons
            name="update"
            style={[styles.iconCon, {}]}
            size={24}
            color="white"
            onPress={() =>
              navigation.navigate('UserInfo', {
                user_id: item.user_id,
                name: item.name,
                age: item.age,
                sex_ty: item.sex_ty,
                note: item.note,
              })
            }
          />
        </View>
      </Tooltip>

      <Tooltip
        style={[styles.tooltipCon, { width: 40, height: 40 }]}
        title="삭제"
      >
        <View>
          <MaterialIcons
            style={[styles.iconCon, {}]}
            name="delete"
            size={40}
            color="black"
            onPress={() => handleDeleteRow(item.user_id)}
          />
        </View>
      </Tooltip>
    </View>
  );

  return (
    <PaperProvider theme={theme}>
      <SafeAreaView style={styles.safeAreaViewContainer}>
        <Text style={[styles.appTitleContainer, {}]}>사용자 목록</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
          <View style={[styles.viewTotalContainer, {}]}>
            <View style={[styles.viewRowContainer, { marginBottom: 10 }]}>
              <TextInput
                id="txtUserIdS"
                style={[styles.textInputCon, { width: '100%' }]}
                label="사용자ID"
                mode="outlined"
                placeholder="사용자ID 검색어 입력..."
                value={userIdS}
                onChangeText={onChangeTextUserIdS}
                right={
                  <TextInput.Icon icon="magnify" onPress={handleSearchRows} />
                }
              />
            </View>
            <View style={[styles.viewColumnContainer, { marginBottom: 100 }]}>
              <FlatList
                data={items}
                // keyboardShouldPersistTaps="handled"
                keyExtractor={item => item.user_id}
                // ItemSeparatorComponent={() => (
                //   <View style={styles.renderSeparator} />
                // )}
                renderItem={renderItem}
              />
            </View>
          </View>
          <View style={[styles.viewTotalContainer, { flex: 0 }]}>
            <View
              style={[
                styles.viewColumnContainer,
                {
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                },
              ]}
            >
              <Button
                icon="plus-circle"
                style={[styles.buttonCon, { width: '100%' }]}
                mode="contained"
                onPress={() =>
                  navigation.navigate('UserInfo', {
                    user_id: '',
                    name: '',
                    age: '',
                    sex_ty: '',
                    note: '',
                  })
                }
              >
                <Text style={[styles.buttonTextCon, {}]}>사용자 추가하기</Text>
              </Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </PaperProvider>
  );
};

export default UserListScreen;
