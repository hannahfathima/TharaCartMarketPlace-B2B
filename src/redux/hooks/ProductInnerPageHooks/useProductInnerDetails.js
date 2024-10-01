import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductInnerDetails } from '../../slices/productInnerSlice/productInnerSlice';
import { useParams } from 'react-router-dom';

const useProductInnerDetails = () => {
  const dispatch = useDispatch();
  const { prodId } = useParams();
  const productInnerDetails = useSelector((state) => state.productInnerDetails.data); 
  const status = useSelector((state) => state.productInnerDetails.status);
  const error = useSelector((state) => state.productInnerDetails.error);

  useEffect(() => {
    if (!prodId) return;

    try {
      const cachedProductDetails = localStorage.getItem(`productInnerDeatils_${prodId}`);

      if (cachedProductDetails) {
        const parsedData = JSON.parse(cachedProductDetails);
        dispatch({
          type: 'productInnerDetails/fetchSuccess',
          payload: parsedData,
        });
      } else if (status === 'idle') {
        dispatch(fetchProductInnerDetails(prodId))
          .unwrap()
          .then((data) => {
            localStorage.setItem(`productInnerDeatils_${prodId}`, JSON.stringify(data));
          })
          .catch((err) => {
            console.error('Failed to fetch:', err);
          });
      }
    } catch (error) {
      console.error('Error parsing cached data:', error);
      localStorage.removeItem(`productInnerDeatils_${prodId}`);
    }
  }, [prodId, status, dispatch]);

  return { productInnerDetails, status, error };
};

export default useProductInnerDetails;
