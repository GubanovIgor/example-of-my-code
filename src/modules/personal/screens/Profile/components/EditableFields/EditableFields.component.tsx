import { FormTextInput } from 'components/FormTextInput';
import { TextField } from 'components/TextField';
import React, { FC, useState } from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

interface EditableFieldsProps {
  phoneNumber?: string;
  email?: string;
}

const getPreviewFieldsRenderer = (phoneNumber: string, email: string) => (
  <View>
    <TextField label="Placeholder" value={phoneNumber} />
    <TextField label="Email" value={email} />
  </View>
);

const getEditableFieldsRenderer = () => (
  <View>
    <Controller
      control={control}
      name="password"
      render={({ field: { onChange, value } }) => (
        <FormTextInput
          value={value}
          isSecure
          placeholder="New password"
          onChangeText={onChange}
          caption={errors?.password?.message?.toString()}
        />
      )}
    />
  </View>
);

export const EditableFields: FC<EditableFieldsProps> = ({
  phoneNumber = '',
  email = '',
}) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const renderFields = isEditMode
    ? getEditableFieldsRenderer()
    : getPreviewFieldsRenderer(phoneNumber, email);

  const onPressFavButton = () => {
    if (isEditMode) return;

    setIsEditMode(true);
  };

  return (
    <View>
      {/* TODO: uncomment when backend for data editing will be ready
       <FavButton
        containerStyle={styles.button}
        text={isEditMode ? 'Save' : 'Edit'}
        onPress={onPressFavButton}
      /> */}
      {renderFields}
    </View>
  );
};
