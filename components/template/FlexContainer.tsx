import Container from "../ui/Container";

type Props = {
  children: React.ReactNode;
  wrap?: boolean
};

export default function FlexContainer({ children, wrap = false }: Props) {
  return (
    <Container className={`text-xs flex gap-5 justify-between items-center${wrap ? " flex-wrap" : ""}`}>
      {children}
    </Container>
  );
}
