import { Outlet } from 'umi';

export default function Layout() {
  console.log('we are there qwe');
  return (
    <div style={{ padding: 5000, background: 'grey' }}>
 
      <Outlet />
    </div>
  );
}
