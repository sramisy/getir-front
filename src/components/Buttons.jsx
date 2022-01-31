import styled, { css } from 'styled-components';

export const FacebookBtn = styled.button`
  display: flex;
  width: 100%;
  border: none;
  border-radius: 0.5rem;
  padding: 0.875rem;
  background-color: rgba(60, 90, 153, 0.1);
`;

export const ExpandButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.5rem;
  height: 1.5rem;
  border: none;
  border-radius: 0.5rem;
  background-color: var(--color-primary-light);

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border: none;
  text-align: center;
  font-size: 0.875rem;
  font-weight: var(--font-weight-semi-bold);

  ${({ kind }) => kind === "brand" && css`
    background-color: var(--color-brand-yellow);
    color: var(--color-primary);
    transition: background-color 0.2s ease-in-out;

    :hover {
      background-color: var(--color-primary);
      color: var(--color-brand-yellow);
    }
  `}

  ${({ kind }) => kind === "primary" && css`
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    color: var(--color-white);
  `}

  ${({ kind }) => kind === "secondary" && css`
    background-color: var(--color-white);
    border: 1px solid var(--color-primary);
    color: var(--color-primary);
    border-radius: 0.5rem;
  `}

  ${({ size }) => size === "small" && css`
    padding: 0.75rem;
  `}

  ${({ size }) => size === "medium" && css`
    padding: 0.875rem;
    border-radius: 0.5rem;
  `}

  ${props => props.disabled && css`
    background-color: var(--color-gray);
    cursor: not-allowed;
  `}

  ${props => props.loading === true && css`
    cursor: not-allowed;
  `}
`