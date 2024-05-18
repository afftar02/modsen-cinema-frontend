export const openOAuth = (authUrl: string) => {
  try {
    window.open(authUrl, '_self');
  } catch (err) {
    alert('Authorization error!');
  }
}