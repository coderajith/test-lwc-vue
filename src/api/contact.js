import LCC from 'lightning-container'

const _contacts = [
  { id: '1', name: 'Contact 1' },
  { id: '2', name: 'Contact 2' },
  { id: '3', name: 'Contact 3' }
]
export default {
  getContacts (callback) {
    if (process.env.NODE_ENV === 'production') {
      LCC.callApex(
        'VuePOCController.getContacts',
        (result, event) => {
          if (event.status) {
            callback(result.map(contact => {
              return {
                id: contact.Id,
                name: contact.Name,
                phone: contact.Phone,
                email: contact.Email
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
      setTimeout(() => callback(_contacts), 100)
    }
  }
}
