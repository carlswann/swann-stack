import LinearProgress from '@mui/material/LinearProgress';

import LoaderWrapper from '../components/ui/LoaderWrapper';

function Loader() {
  return (
    <LoaderWrapper>
      <LinearProgress color='primary' />
    </LoaderWrapper>
  );
}

export default Loader;
