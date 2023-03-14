import img from '../images/ok.svg';
const OrderDetails = () => {
    return (
        <>
            <p className='text text_type_digits-large mt-30' style={{textShadow: "0px 0px 16px rgba(51, 51, 255, 0.25), 0px 0px 8px rgba(51, 51, 255, 0.25), 0px 4px 32px rgba(51, 51, 255, 0.5)"}}>034536</p>
            <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
            <img className='mt-15 mb-15' src={img} alt='Ок' />
            <p className='text text_type_main-default mb-2'>Ваш заказ начали готовить</p>
            <p className='text text_type_main-default mb-30' style={{color: '#8585AD'}}>Дождитесь готовности на орбитальной станции</p>
        </>
    )
};

export default OrderDetails;