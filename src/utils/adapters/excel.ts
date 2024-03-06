export const httpToExcel = (response: any, name: string) => {
  const url = window.URL.createObjectURL(new Blob([response]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute(
    'download',
    name,
  );
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link); // Remove o link após o download
};
