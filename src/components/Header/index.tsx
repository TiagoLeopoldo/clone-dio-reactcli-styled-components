import {
  BuscarInputContainer,
  Column,
  Container,
  Input,
  Menu,
  MenuRight,
  Row,
  UserPicture,
  Wrapper,
} from "./styles";
import logo from "../../assets/logo-dio.png";
import { Button } from "../Button";
import { useNavigate } from "react-router-dom";

const Header = ({ autenticado }) => {
  const navegate = useNavigate();

  const handleClickSignUp = () => {
    navegate("/sign-up");
  };

  const handleClickSingIn = () => {
    navegate("/login");
  };

  return (
    <Wrapper>
      <Container>
        <Row>
          <a href="/"><img src={logo} alt="Logo da DIO" /></a>
          {autenticado ? (
            <>
              <BuscarInputContainer>
                <Input placeholder="Buscar..." />
              </BuscarInputContainer>
              <Menu>Live Code</Menu>
              <Menu>Global</Menu>
            </>
          ) : null}
        </Row>
        <Row>
          {autenticado ? (
            <UserPicture src="https://avatars.githubusercontent.com/u/122064619?s=96&v=4" />
          ) : (
            <>
              <MenuRight href="#">Home</MenuRight>
              <Button title="Entrar" onClick={handleClickSingIn} />
              <Button title="Cadastrar" onClick={handleClickSignUp} />
            </>
          )}
        </Row>
      </Container>
    </Wrapper>
  );
};

export { Header };
