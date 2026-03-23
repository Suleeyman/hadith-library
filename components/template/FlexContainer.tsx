import Container from "../ui/Container";

type Props = {
  children: React.ReactNode;
};

export default function FlexContainer({ children }: Props) {
  return (
    <Container className="text-xs flex justify-between items-center">
      {children}
    </Container>
  );
}
