import React, { Component } from 'react';
import { Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, Form, Input, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    Keyboard.dismiss();
    const { users, newUser } = this.state;
    const response = await api.get(`/users/${newUser}`);
    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };
    this.setState({
      users: [...users, data],
      newUser: '',
    });
  };

  render() {
    const { users, newUser } = this.state;

    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar usuário"
            value={newUser}
            onChangeText={(text) => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser} // Método onSubmitEditing é o executado quando o usuário clica no "send"
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}
