import { CoreMenu } from '@core/types'

export const menu: CoreMenu[] = [
  {
    id: 'home',
    title: 'Home',
    translate: 'MENU.HOME',
    type: 'item',
    icon:'home',
    url: 'dashboard/home'
  },
  {
    id: 'all-investment',
    title: 'All Investment',
    translate: 'MENU.ALLINVESTMENT',
    type: 'item',
    icon:'home',
    url: 'dashboard/allInvestment'
    
  },
  {
    id: 'all-cutomer',
    title: 'All Customer',
    translate: 'MENU.ALLCUSTOMER',
    type: 'item',
    icon:'file-plus',
    url: 'dashboard/allCustomer'
    
  },
  {
    id: 'kyc-list',
    title: 'Kyc List',
    translate: 'MENU.KYCLIST',
    type: 'item',
    icon:'file-plus',
    url: 'dashboard/kycList'
    
  },
  {
    id: 'settelment',
    title: 'Settelment',
    translate: 'MENU.SETTELMENT',
    type: 'item',
    icon:'file-plus',
    url: 'dashboard/settelment'
    
  },
  
  
  {
    id: 'referal',
    title: 'Referal',
    translate: 'MENU.REFERAL',
    type: 'item',
    icon:'share-2',
    url: 'dashboard/referal'
  },
  
 
  
]
