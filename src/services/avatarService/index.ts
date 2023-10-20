import { request } from 'services/axiosService';

export const uploadAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  await request({
    method: 'POST',
    url: '/avatar',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
