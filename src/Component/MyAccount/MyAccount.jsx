import { useEffect, useState } from 'react'
import MyAccountSidebar from '../MyAcSlideBar/MyAccountSidebar'
import Navbar from '../Navbar/Navbar'
import PersonalInformation from './Personalnformation/PersonalInformation'
import './MyAccount.scss'
import Address from './Address/Address'
import Footer from '../Footer/Footer'
import WalletSection from './WalletSection/WalletSection'
import WhishList from './WhishList/WhishList'
import MyAccountDefault from './MyAccoutDefault/MyAccountDefault'
import MyAccountOrders from './MyAccoutOrders/MyAccountOrders'
import useFetchUser from '../../redux/hooks/myAccountHooks/useFetchUser'
import useWishListProducts from '../../redux/hooks/cartPageHooks/useWishListProducts'

const MyAccount = () => {
    const [rightSection, setRightSection] = useState('MyAcDefault');

    const {user, status, error}=useFetchUser();
    const {wishListProduct, status:sishListProdStatus, error:wishListProdError, refetch}=useWishListProducts()

    const renderRightSection = () => {
        switch (rightSection) {
            case 'MyAcDefault':
                return <MyAccountDefault user={user} />
            case 'personal-information':
                return <PersonalInformation user={user} />
            case 'address':
                return <Address user={user}/>
            case 'wallet':
                return <WalletSection user={user}/>
            case 'whishlist':
                return <WhishList user={user} wishList={wishListProduct} refetch={refetch}/>
            case 'my-orders':
                return <MyAccountOrders user={user}/>
            default:
                return <div>Item Not Selected</div>
        }
    }
    useEffect(()=>{
        if(user){
            console.log('main',user);
        
          }
        
    },[user])

    return (
        <div className='MyAccountMainWrapper'>
            <Navbar />
            <div className="my-account">
                <div className="my-ac-left">
                    <MyAccountSidebar user={user} rightSection={rightSection} setRightSection={setRightSection} />
                </div>
                <div className="my-ac-right">
                    {renderRightSection()}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default MyAccount
