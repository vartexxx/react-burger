import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WS_CONNECTION_ORDERS_END, WS_CONNECTION_ORDERS_START } from '../../services/actions/wsActions';
import styles from './AuthOrderFullWindow.module.scss';

const AuthOrderFullWindow = () => {
  const dispatch = useDispatch();
  const { orders } = useSelector(state => state.wsReducerForOrders)

  const ingredientsData = useSelector(state => state.burgerIngredientsReducer.burgerIngredientsList);
  const params = useParams();
  const order = orders.find((item) => item._id === params.id)

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_ORDERS_START });
    return () => { dispatch({ type: WS_CONNECTION_ORDERS_END }) }
  }, [dispatch]);

  const ingredientsUniq = useMemo(() => {
    return Array.from(new Set(
      ingredientsData.filter((item) => order?.ingredients.includes(item._id))
    ));
  }, [ingredientsData, order]);

  const status =
    order?.status === 'done' ? 'Выполнен'
      : order?.status === 'created' ? 'Создан'
        : order?.status === 'pending' ? 'Готовится' : '';

  const countsObject = useMemo(() => {
    const counts = order?.ingredients.reduce((acc, i) => {
      if (acc.hasOwnProperty(i)) {
        acc[i] += 1;
      } else {
        acc[i] = 1;
      }
      return acc;
    }, {});
    return counts
  }, [order])

  const cost = useMemo(() => {
    let totalCost = 0;
    order?.ingredients.forEach((id) => {
      const ingredient = ingredientsUniq.find((item) => (item._id === id));
      totalCost += ingredient?.price;
    });
    return totalCost

  }, [ingredientsUniq, order])

  return (
    order &&
    <div className={styles.container}>
      <p className='text text_type_digits-default'
        style={{ height: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>{`#${order?.number}`}</p>
      <p className='text text_type_main-medium pt-5'>{order?.name}</p>
      <p className='text text_type_main-default pt-2' style={order?.status === 'done' ? { color: '#00CCCC' } : {}}>{status}</p>
      <p className='text text_type_main-medium pt-15'>Состав:</p>
      <div className={styles.ingredients}>
        {
          ingredientsUniq.map((ingredient, index) => (
            <div className={styles.ingredients_box} key={index}>
              <div className={styles.ingredient}>
                <div className={styles.image_container} >
                  <img className={styles.image} src={ingredient?.image_mobile} alt={ingredient?.name} />
                </div>
                <p className='text text_type_main-default' style={{ maxWidth: '320px' }}>{ingredient?.name}</p>
              </div>


              <div className={styles.cost}>
                <p className='text text_type_digits-default'>{`${countsObject[ingredient._id]} x ${ingredient?.price} `}</p>
                <CurrencyIcon />
              </div>
            </div>
          ))
        }
      </div>
      <div className={styles.date_and_cost}>
        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order?.createdAt)} />
        </p>
        <div className={styles.total}>
          <p className='text text_type_digits-default'>{`${cost}`}</p>
          <CurrencyIcon />
        </div>
      </div>
    </div>
  )
};

export default AuthOrderFullWindow;