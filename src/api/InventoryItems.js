import LCC from 'lightning-container'

const _isOpen = true
const _products = [
  {
    Id: 'a060k000006HeneAAC',
    InventoryNumber: '5064072',
    ProductName: 'フロアーランプ',
    Rank: 'A',
    CurrentStatus: '発注済',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '50600',
    Size: '300×250×500(550)',
    Link: '',
    Selected: false,
    EngName: 'test 1',
    Show: true,
    Supplier: '',
    CreatedDate: '2019-03-15T12:03:50.000+0000',
    LastModifiedDate: '2019-04-15T12:03:50.000+0000',
    BigType: '111',
    MediumType: '222',
    SmallType: '333',
    DateForFilter: '07/22/2019',
    SpecialFlg: true,
    Hold: false,
    LongOrShort: '',
    UnitPriceLease: '100',
    Width: '100',
    Depth: '100',
    Height: '100'
  },
  {
    Id: 'a060k000007HeneAAC',
    InventoryNumber: '5064072',
    ProductName: 'フロアーランプ',
    Rank: 'B',
    CurrentStatus: '在庫',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '40600',
    Size: '300×250×500(550)',
    Link: '',
    Selected: false,
    EngName: 'test 234',
    Show: true,
    Supplier: '',
    CreatedDate: '2019-12-15T12:03:50.000+0000',
    LastModifiedDate: '2019-01-15T12:03:50.000+0000',
    BigType: '',
    MediumType: '',
    SmallType: '',
    DateForFilter: '07/21/2019',
    SpecialFlg: false,
    Hold: true,
    LongOrShort: '短期専用',
    UnitPriceLease: '700',
    Width: '100',
    Depth: '100',
    Height: '100'
  },
  {
    Id: 'a060k000008HeneAAC',
    InventoryNumber: '5064072',
    ProductName: 'フロアーランプ',
    Rank: 'C',
    CurrentStatus: 'リース中',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '5600',
    Size: '300×250×500(550)',
    Link: '',
    Selected: false,
    EngName: 'test 235',
    Show: true,
    Supplier: '',
    CreatedDate: '2019-05-15T12:03:50.000+0000',
    LastModifiedDate: '2019-08-15T12:03:50.000+0000',
    BigType: '',
    MediumType: '',
    SmallType: '',
    DateForFilter: '',
    SpecialFlg: true,
    Hold: true,
    LongOrShort: '',
    UnitPriceLease: '800',
    Width: '200',
    Depth: '300',
    Height: '100'
  },
  {
    Id: 'a060k000009HeneAAC',
    InventoryNumber: '5064072',
    ProductName: 'フロアーランプ',
    Rank: 'D',
    CurrentStatus: '除却',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '3600',
    Size: '300×250×500(550)',
    Link: '',
    Selected: false,
    EngName: 'test 44',
    Show: true,
    Supplier: '',
    CreatedDate: '2019-07-15T12:03:50.000+0000',
    LastModifiedDate: '2019-07-15T12:03:50.000+0000',
    BigType: '',
    MediumType: '',
    SmallType: '',
    DateForFilter: '',
    SpecialFlg: false,
    Hold: false,
    LongOrShort: '短期専用',
    UnitPriceLease: '900',
    Width: '400',
    Depth: '500',
    Height: '600'
  },
  {
    Id: 'a060k000010HeneAAC',
    InventoryNumber: '5064072',
    ProductName: 'フロアーランプ',
    Rank: 'E',
    CurrentStatus: '在庫',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '190600',
    Size: '300×250×500(550)',
    Link: '',
    EngName: 'test 567',
    Selected: false,
    Show: true,
    Supplier: '',
    CreatedDate: '2019-03-15T12:03:50.000+0000',
    LastModifiedDate: '2019-11-15T12:03:50.000+0000',
    BigType: '',
    MediumType: '',
    SmallType: '',
    DateForFilter: '',
    SpecialFlg: true,
    Hold: true,
    LongOrShort: '',
    UnitPriceLease: '300',
    Width: '100',
    Depth: '100',
    Height: '100'
  }
]
export default {
  getProducts (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'VuePOCController.getInventoryProducts',
        (result, event) => {
          if (event.status) {
            callback(result.map(product => {
              return {
                Id: product.Id,
                InventoryNumber: product.Name !== undefined ? product.Name : '',
                ProductName: product.OtherProductName__c !== undefined ? product.OtherProductName__c : '',
                Rank: product.Rank__c !== undefined ? product.Rank__c : '',
                CurrentStatus: product.CurrentStatus__c !== undefined ? product.CurrentStatus__c : '',
                CurrentAuxiliaryStatus: product.CurrentStatusAuxiliary__c !== undefined ? product.CurrentStatusAuxiliary__c : '',
                ManufacturerName: product.MakerMaster__c !== undefined ? product.MakerMaster__r.Name : '',
                ProductFixedPrice: product.ProductPrice__c !== undefined ? product.ProductPrice__c : '',
                Size: product.Size__c !== undefined ? product.Size__c : '',
                Selected: false,
                Link: product.PictureURL1__c,
                Supplier: product.PurchaseName__c !== undefined ? product.PurchaseName__c : '',
                CreatedDate: product.CreatedDate,
                LastModifiedDate: product.LastModifiedDate,
                EngName: product.EngName__c !== undefined ? product.EngName__c : '',
                Show: true,
                BigType: product.ProductCategory__c !== undefined ? product.ProductCategory__r.BigType__c : '',
                MediumType: product.ProductCategory__c !== undefined ? product.ProductCategory__r.MediumType__c : '',
                SmallType: product.ProductCategory__c !== undefined ? product.ProductCategory__r.SmallType__c : '',
                DateForFilter: product.nyukoyoteibi__c !== undefined ? product.nyukoyoteibi__c : '',
                SpecialFlg: product.specialFlg__c,
                Hold: product.HOLD__c,
                LongOrShort: product.LongOrShort__c !== undefined ? product.LongOrShort__c : '',
                UnitPriceLease: product.UnitPriceLease__c !== undefined ? product.UnitPriceLease__c : 0,
                Width: product.Width__c !== undefined ? product.Width__c : 0,
                Depth: product.Depth__c !== undefined ? product.Depth__c : 0,
                Height: product.Height__c !== undefined ? product.Height__c : 0
              }
            }))
          } else if (event.type === 'exception') {
            console.log(event.message + ' : ' + event.where)
          } else {
            console.log('Unknown Error', event)
          }
        },
        {escape: false}
      )
    } else {
      setTimeout(() => callback(_products), 100)
    }
  },
  navigateToRecord (recordId, callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        recordId: recordId,
        type: 'Navigate'
      }
      LCC.sendMessage(msg)
    } else {
      setTimeout(() => console.log(recordId), 100)
    }
  },
  updateUserInfo (isOpen, callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        isOpen: isOpen,
        type: 'UpdateUserInfo'
      }
      LCC.sendMessage(msg)
    } else {
      setTimeout(() => console.log(isOpen), 100)
    }
  },
  filterIsOpen (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'VuePOCController.getIsOpen',
        (result, event) => {
          if (event.status) {
            callback(result)
          } else if (event.type === 'exception') {
            console.log(event.message + ' : ' + event.where)
          } else {
            console.log('Unknown Error', event)
          }
        },
        {escape: false}
      )
    } else {
      setTimeout(() => callback(_isOpen), 100)
    }
  }
}
