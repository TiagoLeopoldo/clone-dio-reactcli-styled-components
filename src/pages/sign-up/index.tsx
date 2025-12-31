import { Header } from "../../components/Header/index.js";
import { Input } from "../../components/Input/index.js";
import { Button } from "../../components/Button/index.jsx";
import { MdEmail, MdLock, MdPerson } from "react-icons/md";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { api } from "../../services/api.js";
import {
  Column,
  Container,
  SubtitleLogin,
  Title,
  TitleLogin,
  Wrapper,
  InfoText,
  Row,
  LoginRedirectText,
  TextHighlight,
} from "./styles.js";

const schema = yup
  .object({
    userName: yup.string().required("Nome obrigatório"),
    email: yup.string().email("E-mail inválido").required("Campo obrigatório"),
    password: yup
      .string()
      .min(3, "No mínimo 3 caracteres")
      .required("Campo obrigatório"),
  })
  .required();

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      const response = await api.post("/users", {
        name: data.userName,
        email: data.email,
        senha: data.password,
      });
      alert("Usuário cadastrado com sucesso!");
      console.log("Novo usuário:", response.data);
    } catch (error) {
      alert("Erro ao cadastrar usuário.");
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Column>
          <Title>
            A plataforma para você aprender com experts, dominar as principais
            tecnologias e entrar mais rápido nas empresas mais desejadas.
          </Title>
        </Column>
        <Column>
          <Wrapper>
            <TitleLogin>Comece agora grátis</TitleLogin>
            <SubtitleLogin>Crie sua conta e make the change._</SubtitleLogin>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                name="userName"
                control={control}
                errorMessage={errors.userName?.message}
                placeholder="Nome completo"
                leftIcon={<MdPerson />}
              />
              <Input
                name="email"
                control={control}
                errorMessage={errors.email?.message}
                placeholder="E-mail"
                leftIcon={<MdEmail />}
              />
              <Input
                name="password"
                control={control}
                errorMessage={errors.password?.message}
                placeholder="Senha"
                type="password"
                leftIcon={<MdLock />}
              />
              <Button
                title="Criar minha conta"
                variant="secondary"
                type="submit"
              />
            </form>
            <InfoText>
              Ao clicar em "criar minha conta grátis", declaro que aceito as
              Políticas de Privacidade e os Termos de Uso da DIO.
            </InfoText>
            <Row>
              <LoginRedirectText>
                Já possui conta?{" "}
                <TextHighlight href="/login">Fazer login</TextHighlight>
              </LoginRedirectText>
            </Row>
          </Wrapper>
        </Column>
      </Container>
    </>
  );
};

export { SignUp };
