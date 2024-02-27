import { ErrorText, ErrorWrapper } from './ErrorNotification.styled';

export default function ErrorNotification({ error }) {
  return (
    <ErrorWrapper>
      <ErrorText>{error}</ErrorText>
    </ErrorWrapper>
  );
}
