import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchFeaturedBrands } from '../../slices/HomePageSlice/featuredBrandSlice';

const useFeacturedBrand = () => {
  const dispatch = useDispatch();
  const featuredBrands = useSelector((state) => state.featuredBrands.data);
  const status = useSelector((state) => state.featuredBrands.status);
  const error = useSelector((state) => state.featuredBrands.error);

  useEffect(() => {
    // Check if data is already in localStorage
    const cachedBrands = localStorage.getItem('featuredBrands');

    if (cachedBrands) {
      // If data exists in localStorage, do not dispatch the action
      dispatch({
        type: 'featuredBrands/fetchSuccess',
        payload: JSON.parse(cachedBrands),
      });
    } else if (status === 'idle') {
      // Fetch the data if not already fetched and store it in localStorage
      dispatch(fetchFeaturedBrands())
        .unwrap()
        .then((data) => {
          localStorage.setItem('featuredBrands', JSON.stringify(data));
        })
        .catch((err) => {
          console.error('Failed to fetch featured brands:', err);
        });
    }
  }, [status, dispatch]);

  return { featuredBrands, status, error };
};

export default useFeacturedBrand;
