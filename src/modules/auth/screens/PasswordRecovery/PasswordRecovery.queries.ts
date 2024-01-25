import { graphql } from 'react-relay';

export const PasswordRecoveryMutation = graphql`
  mutation PasswordRecovery_resetMutation($input: String!) {
    resetPassword(identity: $input) {
      userId
      state
      resetToken
    }
  }
`;

export const GenerateSmsMutation = graphql`
  mutation PasswordRecovery_generateSmsMutation($userId: Long!) {
    generateSmsCode(userId: $userId)
  }
`;
