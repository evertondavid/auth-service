

---

## 🛠️ Configuração do Google OAuth2

Para que o login com Google funcione, siga estes passos:

1. Acesse: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Crie um projeto novo ou selecione um existente.
3. Vá em "Credenciais" > "Criar credencial" > "ID do cliente OAuth 2.0"
4. Tipo de aplicativo: **Aplicativo da Web**
5. Adicione o seguinte URI de redirecionamento autorizado:
   ```
   http://localhost:3000/auth/google
   ```
6. Copie o **Client ID** e coloque em seu arquivo `.env`:
   ```env
   GOOGLE_CLIENT_ID=seu_client_id_aqui
   ```

---

## 🧪 Testes com Google OAuth Playground

1. Acesse: [https://developers.google.com/oauthplayground/](https://developers.google.com/oauthplayground/)
2. Clique na engrenagem ⚙️ e marque a opção **"Use your own OAuth credentials"**
3. Insira seu `Client ID` no campo correspondente
4. Siga os passos para autenticar e gerar um `id_token`
5. Envie o `id_token` para sua API no Postman:

```json
POST http://localhost:3000/auth/google
Body (raw JSON):
{
  "idToken": "copie_o_token_aqui"
}
```

---

## 🗄️ Configuração do MongoDB com Docker

Você pode iniciar rapidamente um banco MongoDB local com Docker:

```bash
docker run -d \
  --name auth-mongo \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=admin \
  mongo:6
```

No seu `.env`, configure assim:

```env
MONGODB_URI=mongodb://admin:admin@localhost:27017
```

Certifique-se de que o Docker esteja instalado e rodando. Para instalar:

- macOS: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
- Windows: [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

---