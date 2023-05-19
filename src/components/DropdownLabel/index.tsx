import { ReactNode } from 'react';

import { Container } from './styles';

type DropdownLabelProps = {
  title: string;
  children: ReactNode;
};

const DropdownLabel = ({ title = '', children }: DropdownLabelProps) => (
  <Container>
    <h6>{title}</h6>
    <span>{children}</span>
  </Container>
);

export { DropdownLabel };
