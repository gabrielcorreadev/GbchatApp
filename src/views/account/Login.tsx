import * as React from 'react';
import {
  Input,
  Stack,
  FormControl,
  Center,
  Button,
  Icon,
  Image,
  Select,
  CheckIcon,
  useToast,
  useColorMode,
  useColorModeValue
} from 'native-base';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import { autenticacaoService } from '../../services/account/autenticacao.service';
import { useEffect, useState } from 'react';
import { Credentials } from '../../types/system/credentials';
import { AxiosError } from 'axios';
import { SessionData } from '../../types/system/session-data';
import { useAuth } from '../../contexts/Auth';
import { FocusAwareStatusBar } from '../../components/FocusAwareStatusBar';
import { useForm, Controller } from 'react-hook-form';
import { Platform } from 'react-native';
import useLocation from '../../hooks/useLocation';

type FormData = {
  login: string;
  password: string;
};


export default function Login({ navigation }:any) {

  const [isCancelled, setIsCancelled] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();

  const auth = useAuth();
  const toast = useToast();
  const { coords, errorMsg } = useLocation();	    //utilizando o hook que vai nos fornecer a posição do usuário.

  useEffect(() => {
    return () => (setIsCancelled(true))
  }, [])
  

  const onSubmit = (data:FormData) => {
    const device_name = Platform.OS === 'ios' ? `${Platform.OS} - ${Platform.Version}`: `${Platform.OS} - ${(Platform.constants as any).Model}`;
    const credenciais = new Credentials(data.login, data.password, device_name, coords.latitude.toString(), coords.longitude.toString());
    console.log(credenciais)
    setLoading(true);
    autenticacaoService.login(credenciais).then((response) => {
      handleLogin(response.data);
    }).catch((error: AxiosError) => {
      toast.show({
        title: error.response?.data.message,
      })
    }).then(() => {
      setLoading(false);
    })
  };

  const handleLogin = async (dadosSessao:SessionData) => {
    setLoading(true);
    console.log(dadosSessao)
    await auth.signIn(dadosSessao);

    toast.show({
      title: `Bem vindo(a), ${dadosSessao.user.name}`,
    });
  }

  return (
    <Center flex={1} bg={useColorModeValue('white', 'black')}>
      <FocusAwareStatusBar barStyle={useColorModeValue('dark-content', 'light-content')} backgroundColor={useColorModeValue('white', 'black')} />
      <FormControl>
        <Stack mx={5} alignItems="center">
        <Image
        source={require('../../assets/app/logo.png')}
        borderRadius={10}
      size={'sm'}

      alt="Alternate Text"
    />
        </Stack>
        </FormControl>
      <FormControl isRequired isInvalid={'login' in errors}>
        <Stack mx={5} marginTop={2}>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              onBlur={onBlur}
              placeholder="Email"
              _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              variant="underlined"
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="login"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.login?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors}>
        <Stack mx={5} marginTop={2}>
        <Controller
          control={control}
          render={({field: { onChange, onBlur, value }}) => (
            <Input
              type="password"
              onBlur={onBlur}
              variant="underlined"
              placeholder="Senha"
                   _light={{
                placeholderTextColor: "blueGray.400",
              }}
              _dark={{
                placeholderTextColor: "blueGray.50",
              }}
              onChangeText={(val) => onChange(val)}
              value={value}
            />
          )}
          name="password"
          rules={{ required: 'Campo é obrigatório', minLength: 3 }}
          defaultValue=""
        />
          <FormControl.ErrorMessage>
          {errors?.password?.message}
          </FormControl.ErrorMessage>
        </Stack>
      </FormControl>
      <FormControl isRequired>
        <Stack mx={5} marginTop={5}>
          <Button
            bg="primary.900"
            isLoading={loading} isLoadingText="Entrando"
            startIcon={<Icon as={MaterialCommunityIcons} name="login" size={5} />}
            onPress={handleSubmit(onSubmit)}
          >Acessar sua conta</Button>
        </Stack>
      </FormControl>
    </Center>
  );
}