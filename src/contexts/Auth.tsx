import { AxiosError } from 'axios';
import { useToast } from 'native-base';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { SessionData } from '../types/system/session-data';
import { autenticacaoService } from '../services/account/autenticacao.service';

type AuthContextData = {
  authData?: SessionData;
  loading: boolean;
  signIn(authData: SessionData): Promise<void>;
  signOut(): void;
};

//Crie o contexto de autenticação com o tipo de dados especificado
//e um objeto vazio
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [authData, setAuthData] = useState<SessionData>();

  //o AuthContext começa com o carregamento igual a true
  //e ficar assim, até que os dados sejam carregados do Async Storage
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    //Cada vez que o aplicativo é aberto, este provedor é processado
    //e chamar a função loadStorage.
    loadStorageData();
  }, []);

  async function loadStorageData(): Promise<void> {
    try {
      //Tente obter os dados do Async Storage
      const authDataSerialized = await autenticacaoService.obterDadosSessaoDoStorage();
      if (authDataSerialized) {
        //Se houver dados, eles serão convertidos em Objeto e o estado será atualizado.
        const _authData: SessionData = authDataSerialized;
        setAuthData(_authData);
      }
    } catch (error) {
    } finally {
      //carregamento terminado
      setLoading(false);
    }
  }

  const signIn = async (_authData: SessionData) => {

    //Defina os dados no contexto, para que o aplicativo possa ser notificado
    //e enviar o usuário para o AuthStack
    setAuthData(_authData);

    //Persistir os dados no armazenamento assíncrono
    //a ser recuperado na próxima sessão do usuário.
    await autenticacaoService.salvarDadosSessao(_authData);
  };

  const signOut = async () => {
    setLoading(true);
    autenticacaoService.logout().then(async (response) => {
      toast.show({
        title: response?.data.message,
      });
      //Remova os dados do contexto, para que o aplicativo possa ser notificado
      //e enviar o usuário para o AuthStack
      setAuthData(undefined);

      //Remova os dados do Async Storage
      //para NÃO ser recuperado na próxima sessão.
      await autenticacaoService.removerSessao();
    }).catch((error: AxiosError) => {
      toast.show({
        title: error.response?.data.message,
      })
    }).then(() => {
      setLoading(false);
    })
  };

  return (
    //Este componente será usado para encapsular todo o aplicativo,
    //então todos os componentes terão acesso ao Contexto
    <AuthContext.Provider value={{ authData, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

//Um gancho simples para facilitar o acesso ao AuthContext
// e permitir que os componentes se inscrevam em atualizações do AuthContext
function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthContext, AuthProvider, useAuth };