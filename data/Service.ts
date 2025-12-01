interface Product {
      id: number;
      name: string;
    };
    
interface SubService {
      id: number;
      name: string;
    };
    
export interface Services {
      id: number;
      name: string;
      icon: string;
      products: Product[];
      subServices: SubService[];
    };

export const service: Services[] = [
      {
            id: 1,
            name: 'printing',
            icon: 'Printing.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 2,
            name: 'notary',
            icon: 'NOTARY PUBLIC.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 3,
            name: 'usps mailing',
            icon: 'USPS MAILLING SERVICES.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 4,
            name: 'passport / photo',
            icon: 'PASSPORT PHOTO ID.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 5,
            name: 'faxing',
            icon: 'FAXES.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 6,
            name: 'shredding',
            icon: 'SHREDDING.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 7,
            name: 'computer rental',
            icon: 'COMPUTER RENTAL.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      },
      {
            id: 8,
            name: 'money orders',
            icon: 'MONEY ORDER.png',
            products: [
                  {
                        id: 101,
                        name: 'invitations'
                  },
                  {
                        id: 102,
                        name: 'flyers'
                  },
                  {
                        id: 103,
                        name: 'brochures'
                  },
                  {
                        id: 104,
                        name: 'menus'
                  }
            ],
            subServices: [
                  {
                        id: 105,
                        name: 'stapling'
                  },
                  {
                        id: 106,
                        name: 'mobile printing'
                  },
                  {
                        id: 107,
                        name: 'full service digital printing'
                  },
                  {
                        id: 108,
                        name: 'collating'
                  },
            ]
      }
]