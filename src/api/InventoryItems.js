import LCC from 'lightning-container'

const _products = [
  { Id: '1', Name: 'Product 1', Rank: '1', CurrentStatus: 'Done', ModelNumber: '1', ProductPrice: '123', Size: '100', Link: '' },
  { Id: '2', Name: 'Product 2', Rank: '2', CurrentStatus: 'Done', ModelNumber: '2', ProductPrice: '345', Size: '100', Link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3OTtNp0hAcHQj_471li29R3mDd0wCxcMzJU6CHCzPWgeJUMPX' },
  { Id: '3', Name: 'Product 3', Rank: '3', CurrentStatus: 'Done', ModelNumber: '3', ProductPrice: '456', Size: '100', Link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHuv7R6YAuQoBhAD3Di4OhCpP1sD-G-H_61xWYF1dqrmxEc3gE5A' },
  { Id: '4', Name: 'Product 4', Rank: '4', CurrentStatus: 'Done', ModelNumber: '4', ProductPrice: '484', Size: '100', Link: '' },
  { Id: '5', Name: 'Product 5', Rank: '5', CurrentStatus: 'Done', ModelNumber: '5', ProductPrice: '978', Size: '100', Link: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSDMr8dTQfOEWADFo-00fHGtpsrJZPLt-VVdyHjpqax5Cw50Z2' }
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
                Name: product.Name,
                Rank: product.Rank__c,
                CurrentStatus: product.CurrentStatus__c,
                ModelNumber: product.ModelNumber__c,
                ProductPrice: product.ProductPrice__c,
                Size: product.Size__c,
                Link: product.PictureURL1__c
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
  }
}
