import { Outlet } from 'umi';

export default function Layout() {
  return (
    <div style={{ padding: 5000, background: 'grey' }}>
 
      <Outlet />
    </div>
  );
}
