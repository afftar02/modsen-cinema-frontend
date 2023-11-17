import { TFunction } from 'i18next';
import { uploadAvatar } from 'services/avatarService';
import { updateUser } from 'services/userService';
import { UserType } from 'types/User';

interface Values {
  name: string;
  surname: string;
  gender: string;
  password: string;
}

export const editProfile = async (
  values: Values,
  loadUser: () => Promise<void>,
  t: TFunction,
  avatar?: File
) => {
  try {
    if (avatar) {
      await uploadAvatar(avatar);
    }
    const editedData: Partial<UserType> = {};
    if (values.name) {
      editedData.name = values.name;
    }
    if (values.surname) {
      editedData.surname = values.surname;
    }
    if (values.gender) {
      editedData.gender = values.gender;
    }
    if (values.password) {
      editedData.password = values.password;
    }
    if (JSON.stringify(editedData) !== JSON.stringify({})) {
      await updateUser(editedData);
    }
    await loadUser();
  } catch (err) {
    alert(t('loading_error'));
    await loadUser();
  }
};
