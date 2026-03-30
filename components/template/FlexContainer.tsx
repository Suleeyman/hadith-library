import Container from "../ui/Container";

type Props = {
  children: React.ReactNode;
  wrap?: boolean
};

export default function FlexContainer({ children, wrap = false }: Props) {
  return (
    <Container className={`flex gap-5 items-center${wrap ? " flex-wrap justify-center md:justify-between" : "justify-between"}`}>
      {children}
    </Container>
  );
}
