import { ToastContainer, toast } from 'react-toastify';
import { clearError, selectErrorMsg } from '../../slices/errorSLice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

const Error = () => {
  const errorMsg = useSelector(selectErrorMsg);
  const dispatch = useDispatch();

  useEffect(() => {
    if (errorMsg) {
      toast.info(errorMsg);
      dispatch(clearError());
    }
  }, [errorMsg, dispatch]);

  return <ToastContainer position="top-right" autoClose={2000} />;
};

export default Error;
