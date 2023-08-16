import { useJsApiLoader } from '@react-google-maps/api';
import { connect } from 'dva';
import { FunctionComponent, ReactNode, useEffect } from 'react';

type Props = {
  dispatch?: any;
  children: ReactNode;
};

const Loader: FunctionComponent<Props> = (props) => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: '&key=AIzaSyAQKe7iZYZV4kufAQiYWMLVMqvdNtvnQrU',
    libraries: ['geometry', 'drawing'],
  });

  useEffect(() => {
    if (loadError) {
      props.dispatch({
        type: 'googleMaps/queryGoogleMapsError',
        payload: loadError,
      });
    }
    if (!isLoaded) {
      props.dispatch({
        type: 'googleMaps/queryGoogleMapsStart',
        payload: {},
      });
    }
    if (isLoaded) {
      props.dispatch({
        type: 'googleMaps/queryGoogleMapsSuccess',
        payload: {},
      });
    }
  }, [isLoaded, loadError]);

  return <>{props.children}</>;
};

export default connect(({ googleMaps }: { googleMaps: any }) => ({
  googleMaps,
}))(Loader);
