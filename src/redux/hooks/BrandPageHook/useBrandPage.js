import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBrandPage } from '../../slices/BrandPageSlice/BrandPageSlice';

const useBrandPage = () => {
  const dispatch = useDispatch();
  const BrandPage = useSelector((state) => state.BrandPage.data);
  const status = useSelector((state) => state.BrandPage.status);
  const error = useSelector((state) => state.BrandPage.error);

  useEffect(() => {
    const cachedBrandPage = localStorage.getItem('BrandPage');

    if (cachedBrandPage) {
      dispatch({
        type: 'BrandPage/fetchSuccess',
        payload: JSON.parse(cachedBrandPage),
      });
    } else if (status === 'idle') {
      dispatch(fetchBrandPage())
        .unwrap()
        .then((data) => {
          localStorage.setItem('BrandPage', JSON.stringify(data));
        })
        .catch((err) => {
          console.error('Failed to fetch BrandPage:', err);
        });
    }
  }, [status, dispatch]);

  return { BrandPage, status, error };
};

export default useBrandPage;
