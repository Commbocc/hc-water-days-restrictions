export const providers = [
  {
    id: 0,
    label: 'Hillsborough County',
    website:
      'https://www.hillsboroughcounty.org/residents/property-owners-and-renters/water-and-sewer',
    address: '925 E. Twiggs Street, Tampa, FL 33602',
    phone: '(813) 272-6680',
    email: 'mailto:PublicUtilities@HCFLGov.net',
  },
  {
    id: 1,
    label: 'City of Tampa',
    website: 'https://www.tampagov.net/water',
    address: '306 E. Jackson St. Tampa, FL, 33602',
    phone: '(813) 274-8811',
    email:
      'https://apps.tampagov.net/appl_customer_service_center/form.asp?strServiceID=75',
  },
  {
    id: 2,
    label: 'City of Temple Terrace',
    website: 'https://templeterrace.com/190/Water-Sewer',
    address: '11210 N 53rd St. Tampa, FL, 33617',
    phone: '(813) 506-6400',
    email: 'mailto:pwcustservice@templeterrace.com',
  },
  {
    id: 3,
    label: 'Plant City',
    website: 'https://www.plantcitygov.com/54/Public-Works',
    address: '1500 W Victoria Street, Plant City, FL',
    phone: '(813) 757-9191',
    email: 'mailto:lspivey@plantcitygov.com',
  },
]

export function findProvider(id) {
  return providers.find((x) => x.id == id)
}

export function findProviderByName(name) {
  switch (name) {
    case 'CITY OF PLANTCITY':
      return findProvider(3)

    case 'CITY OF TEMPLE TERRACE':
      return findProvider(2)

    case 'CITY OF TAMPA':
      return findProvider(1)

    default:
      return findProvider(0)
  }
}
