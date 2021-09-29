import axios from 'axios';
import { environment } from '../environments/environment.prod';
import { autenticacaoService } from './account/autenticacao.service';
// const axios = require('axios');

// Etapa 1: Crie uma nova instância do Axios com uma configuração personalizada.
// O tempo limite é definido para 10s. Se a solicitação demorar mais do que
// que então a solicitação será abortada.

export const request_headers = {
        'Accept': 'application/json',
};

const mapsApi = axios.create({
    baseURL: environment.hereMaps.URL,
    timeout: 10000, 
    headers: request_headers
});


// Passo-2: Crie manipuladores de solicitação, resposta e erro
const requestHandler = async (request: any) => {
    // O token será dinâmico, então podemos usar qualquer maneira específica do aplicativo para sempre 
    // busque o novo token antes de fazer a chamada
    
    request.headers.Authorization = `Bearer ${environment.hereMaps.ACCESS_KEY_SECRET}`;  
  
    return request;
};

const responseHandler = (response: any) => {
    if (response.status === 401) {
        return 'teste';
    }
    if (response.status === 404) {
        return 'teste';
    }

    return response;
};

const errorHandler = (error: any) => {
    return Promise.reject(error);
};

// Passo-3: Configurar / fazer uso de interceptores de solicitação e resposta da Axios
// Nota: Você pode criar um método, como configureInterceptors, adicione abaixo nisso,
// exportar e chamá-lo em uma função init do aplicativo / página.
mapsApi.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
);

mapsApi.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
 );


// Etapa 4: Exporte a instância do Axios recém-criada para ser usada em diferentes locais.
export default mapsApi;