import LCC from 'lightning-container'

const _isOpen = true
const _products = [
  {
    Id: 'a060k000006HeneAAC',
    InventoryNumber: '5064071',
    ProductName: 'Test eRty',
    Rank: 'A',
    CurrentStatus: '発注済',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '50600',
    Size: '300×250×500(550)',
    Link: 'https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.png',
    LinkPreview: 'https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.png',
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
    Height: '100',
    Estimate: '2',
    EstimateName: '2',
    EstimateSelect: false,
    SelectHold: false,
    Remark: '123',
    PurchaseRate: '1',
    RecoveryRate: '2',
    Links: [],
    ModelNumber: '123456',
    SizeInput: '123',
    ModelTotal: 'Test Model Total',
    EstimateSelected: false,
    Allowed: true,
    NotShowHold: false
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
    LinkPreview: '',
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
    Height: '100',
    Estimate: '2',
    EstimateName: '2',
    EstimateSelect: false,
    SelectHold: false,
    Remark: '123',
    PurchaseRate: '1',
    RecoveryRate: '2',
    Links: [],
    ModelNumber: '123456',
    SizeInput: '123',
    ModelTotal: 'Test Model Total',
    EstimateSelected: false,
    Allowed: true,
    NotShowHold: false
  },
  {
    Id: 'a060k000008HeneAAC',
    InventoryNumber: '5064073',
    ProductName: 'フロアーランプ',
    Rank: 'C',
    CurrentStatus: 'リース中',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '5600',
    Size: '300×250×500(550)',
    Link: '',
    LinkPreview: '',
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
    Height: '100',
    Estimate: '1',
    EstimateName: '1',
    EstimateSelect: false,
    SelectHold: false,
    Remark: '123',
    PurchaseRate: '1',
    RecoveryRate: '2',
    Links: [],
    ModelNumber: '123456',
    SizeInput: '123',
    ModelTotal: 'Test Model Total',
    EstimateSelected: false,
    Allowed: true,
    NotShowHold: false
  },
  {
    Id: 'a060k000009HeneAAC',
    InventoryNumber: '5064074',
    ProductName: 'フロアーランプ',
    Rank: 'D',
    CurrentStatus: '除却',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '3600',
    Size: '300×250×500(550)',
    Link: '',
    LinkPreview: '',
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
    Height: '600',
    Estimate: '6',
    EstimateName: '6',
    EstimateSelect: false,
    SelectHold: false,
    Remark: '123',
    PurchaseRate: '1',
    RecoveryRate: '2',
    Links: [],
    ModelNumber: '123456',
    SizeInput: '123',
    ModelTotal: 'Test Model Total',
    EstimateSelected: false,
    Allowed: true,
    NotShowHold: false
  },
  {
    Id: 'a060k000010HeneAAC',
    InventoryNumber: '5064075',
    ProductName: 'フロアーランプ',
    Rank: 'E',
    CurrentStatus: '在庫',
    CurrentAuxiliaryStatus: '入庫ﾁｪｯｸ済',
    ManufacturerName: '山田照明',
    ProductFixedPrice: '190600',
    Size: '300×250×500(550)',
    Link: '',
    LinkPreview: '',
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
    Height: '100',
    Estimate: '',
    EstimateName: '',
    EstimateSelect: false,
    SelectHold: false,
    Remark: '123',
    PurchaseRate: '1',
    RecoveryRate: '2',
    Links: [],
    ModelNumber: '123456',
    SizeInput: '123',
    ModelTotal: 'Test Model Total',
    EstimateSelected: false,
    Allowed: true,
    NotShowHold: false
  }
]
const _estimate = [
  {Id: '1', Name: '1 name', LastModifiedDate: '2019-01-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '2', Name: '2 name', LastModifiedDate: '2019-05-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '3', Name: '3 name', LastModifiedDate: '2019-04-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '4', Name: '4 name', LastModifiedDate: '2019-07-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '5', Name: '5 name', LastModifiedDate: '2019-10-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '6', Name: '6 name', LastModifiedDate: '2019-12-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '7', Name: '7 name', LastModifiedDate: '2019-11-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '8', Name: '8 name', LastModifiedDate: '2019-09-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''},
  {Id: '9', Name: '9 name', LastModifiedDate: '2019-02-15T12:03:50.000+0000', LeaseMonth: '12', MonthlyLeaseRate: '6', Created: 'Alex', Account: ''}
]
const _types = [
  {BigType__c: '1', MediumType__c: '1 name', SmallType__c: '5'},
  {BigType__c: '1', MediumType__c: '2 name', SmallType__c: '6'},
  {BigType__c: '2', MediumType__c: '1 name', SmallType__c: ''},
  {BigType__c: '2', MediumType__c: '1 name', SmallType__c: '9'},
  {BigType__c: '3', MediumType__c: '1 name', SmallType__c: ''}
]
const _imageMap = {
  a060k000006HeneAAC: ['https://www.imgacademy.com/themes/custom/imgacademy/images/helpbox-contact.png', 'https://media.gq.com/photos/5977b52896d98d4091bcf6b7/16:9/w_1280%2Cc_limit/2017-07_GQ_Jet-Lag-TE_3x2.jpg'], a060k000010HeneAAC: []
}
export default {
  getProducts (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'InventorySearchController.getInventoryProducts',
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
                ManufacturerName: product.MakerMaster__c !== undefined && product.MakerMaster__r.Name !== undefined ? product.MakerMaster__r.Name : '',
                ProductFixedPrice: product.ProductPrice__c !== undefined ? product.ProductPrice__c : '',
                Size: product.Size__c !== undefined ? product.Size__c : '',
                Selected: false,
                Link: product.PictureURL1__c,
                LinkPreview: product.PictureURL1__c,
                Supplier: product.PurchaseName__c !== undefined && product.PurchaseName__r.Name !== undefined ? product.PurchaseName__r.Name : '',
                CreatedDate: product.CreatedDate,
                LastModifiedDate: product.LastModifiedDate,
                EngName: product.EngName__c !== undefined ? product.EngName__c : '',
                Show: true,
                BigType: product.ProductCategory__c !== undefined && product.ProductCategory__r.BigType__c !== undefined ? product.ProductCategory__r.BigType__c : '',
                MediumType: product.ProductCategory__c !== undefined && product.ProductCategory__r.MediumType__c !== undefined ? product.ProductCategory__r.MediumType__c : '',
                SmallType: product.ProductCategory__c !== undefined && product.ProductCategory__r.SmallType__c !== undefined ? product.ProductCategory__r.SmallType__c : '',
                DateForFilter: product.nyukoyoteibi__c !== undefined ? product.nyukoyoteibi__c : '',
                SpecialFlg: product.specialFlg__c,
                Hold: product.HOLD__c,
                LongOrShort: product.LongOrShort__c !== undefined ? product.LongOrShort__c : '',
                UnitPriceLease: product.UnitPriceLease__c !== undefined ? product.UnitPriceLease__c : 0,
                Width: product.Width__c !== undefined ? product.Width__c : 0,
                Depth: product.Depth__c !== undefined ? product.Depth__c : 0,
                Height: product.Height__c !== undefined ? product.Height__c : 0,
                Estimate: product.Estimate__c !== undefined ? product.Estimate__c : '',
                EstimateSelect: false,
                SelectHold: false,
                Remark: product.Remark__c,
                PurchaseRate: product.PurchaseRate__c,
                RecoveryRate: product.RecoveryRate__c,
                Links: [],
                ModelNumber: product.ModelNumber__c !== undefined ? product.ModelNumber__c : '',
                SizeInput: product.sizeInput__c !== undefined ? product.sizeInput__c : '',
                ModelTotal: product.ModelTotal__c !== undefined ? product.ModelTotal__c : '',
                EstimateSelected: product.Estimate__c !== undefined,
                EstimateName: product.Estimate__c !== undefined ? product.Estimate__r.Name : '',
                Allowed: (product.CurrentStatus__c !== undefined && product.CurrentStatus__c.indexOf('在庫') > -1) ||
                (product.CurrentStatus__c !== undefined && product.CurrentStatus__c.indexOf('リース中') > -1 &&
                product.CurrentStatusAuxiliary__c !== undefined && product.CurrentStatusAuxiliary__c.indexOf('返却予定') > -1),
                NotShowHold: (product.CurrentStatus__c !== undefined && product.CurrentStatus__c.indexOf('リース中') > -1 &&
                product.CurrentStatusAuxiliary__c !== undefined && product.CurrentStatusAuxiliary__c.indexOf('返却予定') > -1)
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
  getEstimates (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'InventorySearchController.getEstimate',
        (result, event) => {
          if (event.status) {
            callback(result.map(estimate => {
              return {
                Id: estimate.Id,
                Name: estimate.Name,
                LastModifiedDate: estimate.LastModifiedDate,
                LeaseMonth: estimate.LeaseMonth__c !== undefined ? estimate.LeaseMonth__c : '',
                MonthlyLeaseRate: estimate.MonthlyLeaseRate__c !== undefined ? estimate.MonthlyLeaseRate__c : 0,
                Created: estimate.CreatedBy.Name,
                Account: estimate.Account__c !== undefined ? estimate.Account__c : ''
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
      setTimeout(() => callback(_estimate), 100)
    }
  },
  getTypes (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'InventorySearchController.getTypes',
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
      setTimeout(() => callback(_types), 100)
    }
  },
  getImageMap (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'InventorySearchController.getImageMap',
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
      setTimeout(() => callback(_imageMap), 100)
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
  navigateToEstimate (recordId, callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        recordId: recordId,
        type: 'Navigate to Record'
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
        'InventorySearchController.getIsOpen',
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
  },
  addNewQuote (callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        type: 'New Quote'
      }
      LCC.sendMessage(msg)
    } else {
      setTimeout(() => console.log('New Quote'), 100)
    }
  },
  updateProductEstimate (estimateId, productId, callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        estimateId: estimateId,
        productId: productId,
        type: 'Update Product Estimate'
      }
      LCC.sendMessage(msg)
    } else {
      setTimeout(() => console.log('Update Product Estimate ' + estimateId + ' ' + productId), 100)
    }
  },
  updateEstimates (callback) {
    if (process.env.NODE_ENV === 'production') {
      let msg = {
        type: 'New Quote'
      }
      LCC.sendMessage(msg)
    }
  }
}
