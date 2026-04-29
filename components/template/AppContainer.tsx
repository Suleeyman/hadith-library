import Container from "../ui/Container";

type Props = {
  children: React.ReactNode;
};

export default function AppContainer({ children }: Props) {
  return (
    <Container>
      {children}
    </Container>
  );
}
