import "dotenv/config"
import {
  Prisma,
  AddressType,
  CouponStatus,
  DiscountType,
  FulfillmentStatus,
  InventoryMovementType,
  OrderStatus,
  PackageTier,
  ProductStatus,
  ProductType,
  ProofStatus,
  ReviewStatus,
  SalesChannel,
  SellableType,
  UserRole,
} from "@/lib/generated/prisma/client"
import { prisma } from "@/lib/prisma"

function cents(amount: number) {
  return Math.round(amount * 100)
}

type SeedVariantInput = {
  sku?: string
  name: string
  options?: Prisma.InputJsonValue
  priceCents?: number
  stockQty?: number | null
  isDefault?: boolean
}

type SeedProductInput = {
  serviceId?: string
  categoryId?: string
  slug: string
  sku: string
  title: string
  shortDescription: string
  description: string
  type: ProductType
  basePriceCents: number
  compareAtPriceCents?: number
  stockQty?: number | null
  lowStockThreshold?: number | null
  trackInventory?: boolean
  requiresUpload?: boolean
  requiresApproval?: boolean
  requiresAppointment?: boolean
  salesChannel?: SalesChannel
  instructions?: string
  isFeatured?: boolean
  images: {
    url: string
    alt: string
    position: number
  }[]
  variants?: SeedVariantInput[]
}

type ProductWithVariants = Prisma.ProductGetPayload<{
  include: { variants: true }
}>

async function createProduct(data: SeedProductInput): Promise<ProductWithVariants> {
  return prisma.product.create({
    data: {
      serviceId: data.serviceId,
      categoryId: data.categoryId,
      slug: data.slug,
      sku: data.sku,
      title: data.title,
      shortDescription: data.shortDescription,
      description: data.description,
      type: data.type,
      status: ProductStatus.PUBLISHED,
      currency: "USD",
      basePriceCents: data.basePriceCents,
      compareAtPriceCents: data.compareAtPriceCents,
      stockQty: data.stockQty ?? null,
      lowStockThreshold: data.lowStockThreshold ?? null,
      trackInventory: data.trackInventory ?? false,
      requiresUpload: data.requiresUpload ?? false,
      requiresApproval: data.requiresApproval ?? false,
      requiresAppointment: data.requiresAppointment ?? false,
      salesChannel: data.salesChannel ?? SalesChannel.BOTH,
      instructions: data.instructions,
      isFeatured: data.isFeatured ?? false,
      isActive: true,
      seoTitle: `${data.title} | PrimePrint Store`,
      seoDescription: data.shortDescription,
      images: {
        create: data.images,
      },
      variants: data.variants
        ? {
            create: data.variants.map((v) => ({
              sku: v.sku,
              name: v.name,
              options: v.options,
              priceCents: v.priceCents,
              stockQty: v.stockQty ?? null,
              isDefault: v.isDefault ?? false,
              isActive: true,
            })),
          }
        : undefined,
    },
    include: {
      variants: true,
    },
  })
}

async function main() {
  console.log("🌱 Seeding database...")

  await prisma.proofApproval.deleteMany()
  await prisma.inventoryMovement.deleteMany()
  await prisma.review.deleteMany()
  await prisma.couponUsage.deleteMany()
  await prisma.coupon.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()
  await prisma.productImage.deleteMany()
  await prisma.productVariant.deleteMany()
  await prisma.product.deleteMany()
  await prisma.package.deleteMany()
  await prisma.category.deleteMany()
  await prisma.subService.deleteMany()
  await prisma.service.deleteMany()
  await prisma.address.deleteMany()
  await prisma.contact.deleteMany()
  await prisma.post.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.verification.deleteMany()
  await prisma.user.deleteMany()

  // USERS
  const admin = await prisma.user.create({
    data: {
      name: "PrimePrint Admin",
      email: "admin@primeprintstore.com",
      emailVerified: true,
      role: UserRole.ADMIN,
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500&auto=format&fit=crop",
    },
  })

  const mohamed = await prisma.user.create({
    data: {
      name: "Mohamed Soumah",
      email: "mohamed@example.com",
      emailVerified: true,
      role: UserRole.USER,
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500&auto=format&fit=crop",
    },
  })

  const fatou = await prisma.user.create({
    data: {
      name: "Fatou Diallo",
      email: "fatou@example.com",
      emailVerified: true,
      role: UserRole.USER,
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500&auto=format&fit=crop",
    },
  })

  const mariam = await prisma.user.create({
    data: {
      name: "Mariam Sow",
      email: "mariam@example.com",
      emailVerified: true,
      role: UserRole.USER,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500&auto=format&fit=crop",
    },
  })

  // POSTS
  await prisma.post.createMany({
    data: [
      {
        title: "Welcome to PrimePrint Store",
        content: "Professional printing, notary and in-store business services.",
        userId: admin.id,
      },
      {
        title: "Print File Guide",
        content: "Use 300 DPI images, PDF preferred, add bleed when needed.",
        userId: admin.id,
      },
      {
        title: "Store Services Overview",
        content: "We offer mailing, passport photos, faxing, shredding, computer rental and more.",
        userId: admin.id,
      },
    ],
  })

  // AUTH SAMPLE DATA
  await prisma.account.create({
    data: {
      accountId: "admin-credentials",
      providerId: "credentials",
      userId: admin.id,
      password: "seed-password-placeholder",
      scope: "admin",
    },
  })

  await prisma.session.create({
    data: {
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      token: "seed-admin-session-token",
      userId: admin.id,
      ipAddress: "127.0.0.1",
      userAgent: "Seed Script",
    },
  })

  await prisma.verification.createMany({
    data: [
      {
        identifier: "mohamed@example.com",
        value: "123456",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        identifier: "fatou@example.com",
        value: "654321",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      {
        identifier: "mariam@example.com",
        value: "789012",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
    ],
  })

  // 8 MAIN SERVICES
  const printing = await prisma.service.create({
    data: {
      slug: "printing",
      title: "Printing",
      description: "Professional custom printing for business and personal needs.",
      icon: "Printer",
      image:
        "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const notary = await prisma.service.create({
    data: {
      slug: "notary-public",
      title: "Notary Public",
      description: "Reliable notary service for official documents.",
      icon: "FileCheck",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const uspsMailing = await prisma.service.create({
    data: {
      slug: "usps-mailing",
      title: "USPS Mailing",
      description: "Mailing and shipping assistance for letters and packages.",
      icon: "Mail",
      image:
        "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const passportPhotosService = await prisma.service.create({
    data: {
      slug: "passport-id-photos",
      title: "Passport & ID Photos",
      description: "Passport, visa and ID photo services.",
      icon: "Camera",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      position: 4,
    },
  })

  const faxingService = await prisma.service.create({
    data: {
      slug: "faxing",
      title: "Faxing",
      description: "Send and receive faxes quickly in-store.",
      icon: "Fax",
      image:
        "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
      position: 5,
    },
  })

  const shreddingService = await prisma.service.create({
    data: {
      slug: "shredding",
      title: "Shredding",
      description: "Secure document shredding services.",
      icon: "Trash2",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
      position: 6,
    },
  })

  const computerRentalService = await prisma.service.create({
    data: {
      slug: "computer-rental",
      title: "Computer Rental",
      description: "Short-term computer access for documents and applications.",
      icon: "Monitor",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      position: 7,
    },
  })

  const moneyOrdersService = await prisma.service.create({
    data: {
      slug: "money-orders",
      title: "Money Orders",
      description: "Money order services for secure payments.",
      icon: "BadgeDollarSign",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      position: 8,
    },
  })

  // 2+ SUBSERVICES PER MAIN SERVICE
  const graphicDesign = await prisma.subService.create({
    data: {
      serviceId: printing.id,
      slug: "graphic-design",
      title: "Graphic Design",
      description: "Design support for print-ready artwork.",
      image:
        "https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const directMail = await prisma.subService.create({
    data: {
      serviceId: printing.id,
      slug: "direct-mailing",
      title: "Direct Mailing",
      description: "Printing and mailing workflow support.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const largeFormat = await prisma.subService.create({
    data: {
      serviceId: printing.id,
      slug: "large-format-printing",
      title: "Large Format Printing",
      description: "Banners, posters and large visual displays.",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const documentNotarization = await prisma.subService.create({
    data: {
      serviceId: notary.id,
      slug: "document-notarization",
      title: "Document Notarization",
      description: "Acknowledgments and general notarial acts.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const affidavitSupport = await prisma.subService.create({
    data: {
      serviceId: notary.id,
      slug: "affidavit-support",
      title: "Affidavit Support",
      description: "Affidavit preparation support and notarization workflow.",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const travelConsentSupport = await prisma.subService.create({
    data: {
      serviceId: notary.id,
      slug: "travel-consent-support",
      title: "Travel Consent Support",
      description: "Travel letter support and notarization assistance.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const letterMailing = await prisma.subService.create({
    data: {
      serviceId: uspsMailing.id,
      slug: "letter-mailing",
      title: "Letter Mailing",
      description: "Mailing support for letters and important documents.",
      image:
        "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const packageDropOff = await prisma.subService.create({
    data: {
      serviceId: uspsMailing.id,
      slug: "package-drop-off",
      title: "Package Drop-Off",
      description: "Drop-off and mailing support for packages.",
      image:
        "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const shippingLabelHelp = await prisma.subService.create({
    data: {
      serviceId: uspsMailing.id,
      slug: "shipping-label-help",
      title: "Shipping Label Help",
      description: "Help printing and attaching mailing labels.",
      image:
        "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const passportPhotosSub = await prisma.subService.create({
    data: {
      serviceId: passportPhotosService.id,
      slug: "passport-photos",
      title: "Passport Photos",
      description: "US passport photo services in-store.",
      image:
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const visaPhotosSub = await prisma.subService.create({
    data: {
      serviceId: passportPhotosService.id,
      slug: "visa-photos",
      title: "Visa Photos",
      description: "Visa photo services and formatting support.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const idPhotoFilesSub = await prisma.subService.create({
    data: {
      serviceId: passportPhotosService.id,
      slug: "digital-photo-files",
      title: "Digital Photo Files",
      description: "Digital delivery of approved ID photo files.",
      image:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const faxSendingSub = await prisma.subService.create({
    data: {
      serviceId: faxingService.id,
      slug: "fax-sending",
      title: "Fax Sending",
      description: "Local and national fax sending.",
      image:
        "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const faxReceivingSub = await prisma.subService.create({
    data: {
      serviceId: faxingService.id,
      slug: "fax-receiving",
      title: "Fax Receiving",
      description: "Receive incoming faxes in-store.",
      image:
        "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const documentScanningSub = await prisma.subService.create({
    data: {
      serviceId: faxingService.id,
      slug: "document-scanning",
      title: "Document Scanning",
      description: "Scan documents to email or USB.",
      image:
        "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const personalShreddingSub = await prisma.subService.create({
    data: {
      serviceId: shreddingService.id,
      slug: "personal-shredding",
      title: "Personal Shredding",
      description: "Secure shredding for personal documents.",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const businessShreddingSub = await prisma.subService.create({
    data: {
      serviceId: shreddingService.id,
      slug: "business-shredding",
      title: "Business Shredding",
      description: "Shredding support for business records and files.",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const shredBagSub = await prisma.subService.create({
    data: {
      serviceId: shreddingService.id,
      slug: "shred-bag-service",
      title: "Shred Bag Service",
      description: "Bag-based document shredding option.",
      image:
        "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const workstationRentalSub = await prisma.subService.create({
    data: {
      serviceId: computerRentalService.id,
      slug: "workstation-rental",
      title: "Workstation Rental",
      description: "In-store computer workstation rental.",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const onlineFormsSub = await prisma.subService.create({
    data: {
      serviceId: computerRentalService.id,
      slug: "online-forms-assistance",
      title: "Online Forms Assistance",
      description: "Use computer access to complete forms and applications.",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const documentEditingSub = await prisma.subService.create({
    data: {
      serviceId: computerRentalService.id,
      slug: "document-editing-access",
      title: "Document Editing Access",
      description: "Short-term computer access for editing and printing documents.",
      image:
        "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  const billPaymentSub = await prisma.subService.create({
    data: {
      serviceId: moneyOrdersService.id,
      slug: "bill-payment-money-orders",
      title: "Bill Payment Money Orders",
      description: "Money orders for rent, utilities and official payments.",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      position: 1,
    },
  })

  const rentPaymentSub = await prisma.subService.create({
    data: {
      serviceId: moneyOrdersService.id,
      slug: "rent-money-orders",
      title: "Rent Money Orders",
      description: "Money order support for rent payments.",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      position: 2,
    },
  })

  const officialPaymentsSub = await prisma.subService.create({
    data: {
      serviceId: moneyOrdersService.id,
      slug: "official-payment-money-orders",
      title: "Official Payment Money Orders",
      description: "Money orders for official filing and processing fees.",
      image:
        "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
      position: 3,
    },
  })

  void largeFormat
  void affidavitSupport
  void travelConsentSupport
  void letterMailing
  void packageDropOff
  void shippingLabelHelp
  void passportPhotosSub
  void visaPhotosSub
  void idPhotoFilesSub
  void faxSendingSub
  void faxReceivingSub
  void documentScanningSub
  void personalShreddingSub
  void businessShreddingSub
  void shredBagSub
  void workstationRentalSub
  void onlineFormsSub
  void documentEditingSub
  void billPaymentSub
  void rentPaymentSub
  void officialPaymentsSub

  // CATEGORIES: 2+ PER SERVICE
  const categories = {
    businessCards: await prisma.category.create({
      data: {
        serviceId: printing.id,
        slug: "business-cards",
        name: "Business Cards",
        description: "Premium and standard business cards.",
        icon: "CreditCard",
        position: 1,
      },
    }),
    flyers: await prisma.category.create({
      data: {
        serviceId: printing.id,
        slug: "flyers",
        name: "Flyers",
        description: "Flyers for promotions and events.",
        icon: "FileText",
        position: 2,
      },
    }),
    banners: await prisma.category.create({
      data: {
        serviceId: printing.id,
        slug: "banners",
        name: "Banners",
        description: "Indoor and outdoor banner printing.",
        icon: "Image",
        position: 3,
      },
    }),
    posters: await prisma.category.create({
      data: {
        serviceId: printing.id,
        slug: "posters",
        name: "Posters",
        description: "Large-format posters for events and marketing.",
        icon: "PanelTop",
        position: 4,
      },
    }),

    notaryDocs: await prisma.category.create({
      data: {
        serviceId: notary.id,
        slug: "notary-documents",
        name: "Notary Documents",
        description: "Notary services for official paperwork.",
        icon: "FileSignature",
        position: 5,
      },
    }),
    affidavits: await prisma.category.create({
      data: {
        serviceId: notary.id,
        slug: "affidavits",
        name: "Affidavits",
        description: "Affidavit-related notarization services.",
        icon: "FileText",
        position: 6,
      },
    }),
    travelLetters: await prisma.category.create({
      data: {
        serviceId: notary.id,
        slug: "travel-consent-letters",
        name: "Travel Consent Letters",
        description: "Notarized travel letter services.",
        icon: "Plane",
        position: 7,
      },
    }),

    uspsLetters: await prisma.category.create({
      data: {
        serviceId: uspsMailing.id,
        slug: "letters-mailing",
        name: "Letter Mailing",
        description: "Mailing support for letters and flat mail.",
        icon: "Mail",
        position: 8,
      },
    }),
    uspsPackages: await prisma.category.create({
      data: {
        serviceId: uspsMailing.id,
        slug: "package-mailing",
        name: "Package Mailing",
        description: "Shipping and package mailing assistance.",
        icon: "Package",
        position: 9,
      },
    }),
    labelPrinting: await prisma.category.create({
      data: {
        serviceId: uspsMailing.id,
        slug: "label-printing",
        name: "Label Printing",
        description: "Mailing label printing and support.",
        icon: "Printer",
        position: 10,
      },
    }),

    passportPhotos: await prisma.category.create({
      data: {
        serviceId: passportPhotosService.id,
        slug: "passport-photos",
        name: "Passport Photos",
        description: "US passport photo services.",
        icon: "Camera",
        position: 11,
      },
    }),
    visaPhotos: await prisma.category.create({
      data: {
        serviceId: passportPhotosService.id,
        slug: "visa-photos",
        name: "Visa Photos",
        description: "Visa photo services and sizing support.",
        icon: "Image",
        position: 12,
      },
    }),
    digitalPhotoFiles: await prisma.category.create({
      data: {
        serviceId: passportPhotosService.id,
        slug: "digital-photo-files",
        name: "Digital Photo Files",
        description: "Digital export for passport and ID photos.",
        icon: "Download",
        position: 13,
      },
    }),

    faxing: await prisma.category.create({
      data: {
        serviceId: faxingService.id,
        slug: "faxing",
        name: "Faxing",
        description: "Send and receive fax documents.",
        icon: "Fax",
        position: 14,
      },
    }),
    scanning: await prisma.category.create({
      data: {
        serviceId: faxingService.id,
        slug: "document-scanning",
        name: "Document Scanning",
        description: "Scan documents to digital formats.",
        icon: "Scan",
        position: 15,
      },
    }),

    shredding: await prisma.category.create({
      data: {
        serviceId: shreddingService.id,
        slug: "shredding",
        name: "Shredding",
        description: "Secure shredding service for sensitive documents.",
        icon: "Trash2",
        position: 16,
      },
    }),
    shredBags: await prisma.category.create({
      data: {
        serviceId: shreddingService.id,
        slug: "shred-bags",
        name: "Shred Bags",
        description: "Bag-based shredding solutions.",
        icon: "ShoppingBag",
        position: 17,
      },
    }),

    computerRental: await prisma.category.create({
      data: {
        serviceId: computerRentalService.id,
        slug: "computer-rental",
        name: "Computer Rental",
        description: "Computer access for forms, applications and document editing.",
        icon: "Monitor",
        position: 18,
      },
    }),
    onlineForms: await prisma.category.create({
      data: {
        serviceId: computerRentalService.id,
        slug: "online-forms",
        name: "Online Forms",
        description: "Computer access for online applications and forms.",
        icon: "FileText",
        position: 19,
      },
    }),

    moneyOrders: await prisma.category.create({
      data: {
        serviceId: moneyOrdersService.id,
        slug: "money-orders",
        name: "Money Orders",
        description: "Money order services for secure payments.",
        icon: "BadgeDollarSign",
        position: 20,
      },
    }),
    billPayments: await prisma.category.create({
      data: {
        serviceId: moneyOrdersService.id,
        slug: "bill-payments",
        name: "Bill Payments",
        description: "Money orders for bills and official payments.",
        icon: "Receipt",
        position: 21,
      },
    }),
  }

  // PACKAGES: 3+ total
  const starterPackage = await prisma.package.create({
    data: {
      serviceId: printing.id,
      subServiceId: graphicDesign.id,
      tier: PackageTier.STARTER,
      slug: "starter-design-package",
      name: "Starter Design Package",
      description: "Simple design support for one print item.",
      image:
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?q=80&w=1200&auto=format&fit=crop",
      currency: "USD",
      priceMonthCents: cents(12),
      priceYearCents: cents(99),
      deliveryDays: 3,
      points: ["1 concept", "2 revisions", "Print-ready PDF"],
    },
  })

  const growthPackage = await prisma.package.create({
    data: {
      serviceId: printing.id,
      subServiceId: graphicDesign.id,
      tier: PackageTier.GROWTH,
      slug: "growth-design-package",
      name: "Growth Design Package",
      description: "Design support for growing businesses.",
      image:
        "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
      currency: "USD",
      priceMonthCents: cents(22),
      priceYearCents: cents(199),
      deliveryDays: 5,
      points: ["3 concepts", "5 revisions", "Multi-format export", "Priority support"],
    },
  })

  const ultimatePackage = await prisma.package.create({
    data: {
      serviceId: printing.id,
      subServiceId: directMail.id,
      tier: PackageTier.ULTIMATE,
      slug: "ultimate-marketing-package",
      name: "Ultimate Marketing Package",
      description: "Print, design and mailing workflow package.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      currency: "USD",
      priceMonthCents: cents(42),
      priceYearCents: cents(399),
      deliveryDays: 7,
      points: ["Advanced design", "Print production support", "Mail prep", "Priority turnaround"],
    },
  })

  const notaryPrepPackage = await prisma.package.create({
    data: {
      serviceId: notary.id,
      subServiceId: documentNotarization.id,
      tier: PackageTier.STARTER,
      slug: "document-notary-prep-package",
      name: "Document Notary Prep Package",
      description: "Support package for document preparation and notarization flow.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
      currency: "USD",
      priceMonthCents: cents(15),
      priceYearCents: cents(129),
      deliveryDays: 2,
      points: ["Document checklist", "Signing guidance", "Appointment priority"],
    },
  })

  const mailingSupportPackage = await prisma.package.create({
    data: {
      serviceId: uspsMailing.id,
      subServiceId: shippingLabelHelp.id,
      tier: PackageTier.STARTER,
      slug: "mailing-support-package",
      name: "Mailing Support Package",
      description: "Small business mailing support package.",
      image:
        "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
      currency: "USD",
      priceMonthCents: cents(10),
      priceYearCents: cents(99),
      deliveryDays: 2,
      points: ["Label help", "Mail prep", "Package guidance"],
    },
  })

  // PRODUCTS
  const businessCards = await createProduct({
    serviceId: printing.id,
    categoryId: categories.businessCards.id,
    slug: "premium-business-cards",
    sku: "BC-001",
    title: "Premium Business Cards",
    shortDescription: "Professional business cards with premium finishes.",
    description: "Premium business cards for networking, meetings and daily brand presence.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(45),
    compareAtPriceCents: cents(55),
    stockQty: 100,
    lowStockThreshold: 10,
    trackInventory: true,
    requiresUpload: true,
    requiresApproval: true,
    instructions: "Upload PDF or PNG. 300 DPI recommended.",
    isFeatured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=1200&auto=format&fit=crop",
        alt: "Business card mockup",
        position: 1,
      },
      {
        url: "https://images.unsplash.com/photo-1620287341056-6d4c4b9f58c1?q=80&w=1200&auto=format&fit=crop",
        alt: "Stack of business cards",
        position: 2,
      },
    ],
    variants: [
      {
        sku: "BC-001-100-MATTE",
        name: "100 Cards / Matte",
        options: {
          quantity: 100,
          paper: "14pt Matte",
          finish: "Matte",
        } as Prisma.InputJsonValue,
        priceCents: cents(45),
        stockQty: 50,
        isDefault: true,
      },
      {
        sku: "BC-001-250-GLOSS",
        name: "250 Cards / Gloss",
        options: {
          quantity: 250,
          paper: "16pt Gloss",
          finish: "Gloss",
        } as Prisma.InputJsonValue,
        priceCents: cents(69),
        stockQty: 30,
      },
    ],
  })

  const foldedBusinessCards = await createProduct({
    serviceId: printing.id,
    categoryId: categories.businessCards.id,
    slug: "folded-business-cards",
    sku: "BC-002",
    title: "Folded Business Cards",
    shortDescription: "Folded cards with extra space for services and promotions.",
    description: "A practical option for businesses that need more information on their business cards.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(59),
    compareAtPriceCents: cents(69),
    stockQty: 70,
    lowStockThreshold: 10,
    trackInventory: true,
    requiresUpload: true,
    requiresApproval: true,
    instructions: "Upload front and inside layout in print-ready format.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop",
        alt: "Folded business cards",
        position: 1,
      },
    ],
    variants: [
      {
        sku: "BC-002-100",
        name: "100 Folded Cards",
        options: {
          quantity: 100,
          fold: "Half Fold",
        } as Prisma.InputJsonValue,
        priceCents: cents(59),
        stockQty: 35,
        isDefault: true,
      },
    ],
  })

  const flyers = await createProduct({
    serviceId: printing.id,
    categoryId: categories.flyers.id,
    slug: "marketing-flyers",
    sku: "FL-001",
    title: "Marketing Flyers",
    shortDescription: "Flyers for promotions, events and business marketing.",
    description: "High-quality flyer printing with vibrant colors and flexible quantities.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(29),
    compareAtPriceCents: cents(35),
    stockQty: 300,
    lowStockThreshold: 25,
    trackInventory: true,
    requiresUpload: true,
    requiresApproval: true,
    isFeatured: true,
    instructions: "Preferred file: PDF, CMYK, 300 DPI.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=1200&auto=format&fit=crop",
        alt: "Flyer printing sample",
        position: 1,
      },
    ],
    variants: [
      {
        sku: "FL-001-100",
        name: "100 Flyers / 8.5x11",
        options: {
          quantity: 100,
          size: "8.5x11",
          paper: "100lb Gloss",
        } as Prisma.InputJsonValue,
        priceCents: cents(29),
        stockQty: 120,
        isDefault: true,
      },
      {
        sku: "FL-001-500",
        name: "500 Flyers / 8.5x11",
        options: {
          quantity: 500,
          size: "8.5x11",
          paper: "100lb Gloss",
        } as Prisma.InputJsonValue,
        priceCents: cents(79),
        stockQty: 60,
      },
    ],
  })

  const handbills = await createProduct({
    serviceId: printing.id,
    categoryId: categories.flyers.id,
    slug: "event-handbills",
    sku: "FL-002",
    title: "Event Handbills",
    shortDescription: "Simple handbills for churches, events and community outreach.",
    description: "Affordable handbills for mass distribution and local promotion.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(19),
    compareAtPriceCents: cents(25),
    stockQty: 250,
    lowStockThreshold: 20,
    trackInventory: true,
    requiresUpload: true,
    requiresApproval: true,
    instructions: "Best with bold titles and high-contrast images.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1523726491678-bf852e717f6a?q=80&w=1200&auto=format&fit=crop",
        alt: "Handbill sample",
        position: 1,
      },
    ],
    variants: [
      {
        sku: "FL-002-100",
        name: "100 Handbills",
        options: {
          quantity: 100,
          size: "5.5x8.5",
        } as Prisma.InputJsonValue,
        priceCents: cents(19),
        stockQty: 100,
        isDefault: true,
      },
    ],
  })

  const banners = await createProduct({
    serviceId: printing.id,
    categoryId: categories.banners.id,
    slug: "vinyl-banners",
    sku: "BN-001",
    title: "Vinyl Banners",
    shortDescription: "Custom banners for stores, events and outdoor advertising.",
    description: "Durable full-color banner printing for indoor and outdoor use.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(89),
    compareAtPriceCents: cents(99),
    stockQty: 40,
    lowStockThreshold: 5,
    trackInventory: true,
    requiresUpload: true,
    requiresApproval: true,
    isFeatured: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
        alt: "Banner printing sample",
        position: 1,
      },
    ],
    variants: [
      {
        sku: "BN-001-2X6",
        name: "2ft x 6ft Banner",
        options: {
          size: "2ft x 6ft",
          material: "13oz Vinyl",
        } as Prisma.InputJsonValue,
        priceCents: cents(89),
        stockQty: 15,
        isDefault: true,
      },
      {
        sku: "BN-001-3X8",
        name: "3ft x 8ft Banner",
        options: {
          size: "3ft x 8ft",
          material: "13oz Vinyl",
        } as Prisma.InputJsonValue,
        priceCents: cents(129),
        stockQty: 8,
      },
    ],
  })

  const poster = await createProduct({
    serviceId: printing.id,
    categoryId: categories.posters.id,
    slug: "event-posters",
    sku: "PO-001",
    title: "Event Posters",
    shortDescription: "Posters for promotions, events and storefront display.",
    description: "High-impact posters for business advertising and event promotion.",
    type: ProductType.PRINT_PRODUCT,
    basePriceCents: cents(24),
    compareAtPriceCents: cents(30),
    stockQty: 150,
    lowStockThreshold: 20,
    trackInventory: true,
    requiresUpload: true,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=1200&auto=format&fit=crop",
        alt: "Poster print sample",
        position: 1,
      },
    ],
    variants: [
      {
        sku: "PO-001-11X17",
        name: "11x17 Poster",
        options: {
          size: "11x17",
          paper: "Gloss",
        } as Prisma.InputJsonValue,
        priceCents: cents(24),
        stockQty: 75,
        isDefault: true,
      },
      {
        sku: "PO-001-24X36",
        name: "24x36 Poster",
        options: {
          size: "24x36",
          paper: "Semi-Gloss",
        } as Prisma.InputJsonValue,
        priceCents: cents(49),
        stockQty: 30,
      },
    ],
  })

  const notaryAck = await createProduct({
    serviceId: notary.id,
    categoryId: categories.notaryDocs.id,
    slug: "notary-acknowledgment",
    sku: "NT-001",
    title: "Notary Acknowledgment",
    shortDescription: "Acknowledgment notarization for official documents.",
    description: "Reliable notary acknowledgment service with valid ID verification.",
    type: ProductType.SERVICE,
    basePriceCents: cents(15),
    compareAtPriceCents: cents(20),
    requiresAppointment: true,
    salesChannel: SalesChannel.BOTH,
    images: [
      {
        url: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop",
        alt: "Notary acknowledgment",
        position: 1,
      },
    ],
  })

  const affidavitNotary = await createProduct({
    serviceId: notary.id,
    categoryId: categories.affidavits.id,
    slug: "affidavit-notarization",
    sku: "NT-002",
    title: "Affidavit Notarization",
    shortDescription: "Notarization service for affidavits and sworn statements.",
    description: "Professional notarization for affidavits and supporting documents.",
    type: ProductType.SERVICE,
    basePriceCents: cents(15),
    compareAtPriceCents: cents(20),
    requiresAppointment: true,
    salesChannel: SalesChannel.BOTH,
    images: [
      {
        url: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop",
        alt: "Affidavit notarization",
        position: 1,
      },
    ],
  })

  const travelConsent = await createProduct({
    serviceId: notary.id,
    categoryId: categories.travelLetters.id,
    slug: "travel-consent-letter-notary",
    sku: "NT-003",
    title: "Travel Consent Letter Notary",
    shortDescription: "Notary service for travel consent letters.",
    description: "Prepare and notarize travel consent letters for minors and family travel.",
    type: ProductType.SERVICE,
    basePriceCents: cents(20),
    compareAtPriceCents: cents(25),
    requiresAppointment: true,
    salesChannel: SalesChannel.BOTH,
    images: [
      {
        url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
        alt: "Travel consent letter service",
        position: 1,
      },
    ],
  })

  const uspsFirstClass = await createProduct({
    serviceId: uspsMailing.id,
    categoryId: categories.uspsLetters.id,
    slug: "usps-first-class-mail",
    sku: "USPS-001",
    title: "USPS First-Class Mail Assistance",
    shortDescription: "Help preparing and sending letters through USPS.",
    description: "In-store mailing assistance for letters, envelopes and standard USPS mail preparation.",
    type: ProductType.SERVICE,
    basePriceCents: cents(5),
    compareAtPriceCents: cents(7),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
        alt: "USPS mailing service",
        position: 1,
      },
    ],
  })

  const priorityPackageMail = await createProduct({
    serviceId: uspsMailing.id,
    categoryId: categories.uspsPackages.id,
    slug: "priority-package-mail",
    sku: "USPS-002",
    title: "Priority Package Mailing Assistance",
    shortDescription: "Support for mailing packages with USPS.",
    description: "Get help preparing and mailing priority packages in-store.",
    type: ProductType.SERVICE,
    basePriceCents: cents(8),
    compareAtPriceCents: cents(10),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1200&auto=format&fit=crop",
        alt: "Package mailing service",
        position: 1,
      },
    ],
  })

  const labelPrintingService = await createProduct({
    serviceId: uspsMailing.id,
    categoryId: categories.labelPrinting.id,
    slug: "shipping-label-printing",
    sku: "USPS-003",
    title: "Shipping Label Printing",
    shortDescription: "Print your USPS or shipping labels in-store.",
    description: "Print labels and prepare packages for mailing quickly.",
    type: ProductType.SERVICE,
    basePriceCents: cents(3),
    compareAtPriceCents: cents(5),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1586769852044-692d6e3703f0?q=80&w=1200&auto=format&fit=crop",
        alt: "Shipping label printing",
        position: 1,
      },
    ],
  })

  const passportPhotos = await createProduct({
    serviceId: passportPhotosService.id,
    categoryId: categories.passportPhotos.id,
    slug: "passport-photo-service",
    sku: "PP-001",
    title: "Passport Photo Service",
    shortDescription: "Fast in-store passport and ID photo service.",
    description: "Quick and professional passport photos with standard formatting.",
    type: ProductType.SERVICE,
    basePriceCents: cents(18),
    compareAtPriceCents: cents(22),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
        alt: "Passport photo service",
        position: 1,
      },
    ],
  })

  const visaPhotosService = await createProduct({
    serviceId: passportPhotosService.id,
    categoryId: categories.visaPhotos.id,
    slug: "visa-photo-service",
    sku: "PP-002",
    title: "Visa Photo Service",
    shortDescription: "Visa and immigration photo service.",
    description: "Photo sizing support for visa applications and official submissions.",
    type: ProductType.SERVICE,
    basePriceCents: cents(20),
    compareAtPriceCents: cents(24),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
        alt: "Visa photo service",
        position: 1,
      },
    ],
  })

  const digitalPhotoFile = await createProduct({
    serviceId: passportPhotosService.id,
    categoryId: categories.digitalPhotoFiles.id,
    slug: "digital-photo-file",
    sku: "PP-003",
    title: "Digital Passport Photo File",
    shortDescription: "Digital copy of your passport or ID photo.",
    description: "Receive a digital file version of your passport or identification photo.",
    type: ProductType.SERVICE,
    basePriceCents: cents(8),
    compareAtPriceCents: cents(10),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1200&auto=format&fit=crop",
        alt: "Digital passport photo file",
        position: 1,
      },
    ],
  })

  const faxService = await createProduct({
    serviceId: faxingService.id,
    categoryId: categories.faxing.id,
    slug: "fax-service",
    sku: "FX-001",
    title: "Fax Service",
    shortDescription: "Send and receive faxes in-store.",
    description: "Simple in-store fax service for official and personal documents.",
    type: ProductType.SERVICE,
    basePriceCents: cents(3),
    compareAtPriceCents: cents(5),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
        alt: "Fax machine service",
        position: 1,
      },
    ],
  })

  const faxReceive = await createProduct({
    serviceId: faxingService.id,
    categoryId: categories.faxing.id,
    slug: "fax-receive-service",
    sku: "FX-002",
    title: "Fax Receive Service",
    shortDescription: "Receive incoming faxes in-store.",
    description: "Receive business or personal fax documents securely at our store.",
    type: ProductType.SERVICE,
    basePriceCents: cents(2),
    compareAtPriceCents: cents(4),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
        alt: "Fax receive service",
        position: 1,
      },
    ],
  })

  const scanningService = await createProduct({
    serviceId: faxingService.id,
    categoryId: categories.scanning.id,
    slug: "document-scanning-service",
    sku: "SC-001",
    title: "Document Scanning Service",
    shortDescription: "Scan documents to email or USB.",
    description: "Convenient scanning service for personal and business documents.",
    type: ProductType.SERVICE,
    basePriceCents: cents(2),
    compareAtPriceCents: cents(4),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1516321310764-8d45c6d5b5db?q=80&w=1200&auto=format&fit=crop",
        alt: "Document scanning service",
        position: 1,
      },
    ],
  })

  const secureShredding = await createProduct({
    serviceId: shreddingService.id,
    categoryId: categories.shredding.id,
    slug: "secure-document-shredding",
    sku: "SH-001",
    title: "Secure Document Shredding",
    shortDescription: "Secure shredding for sensitive and confidential documents.",
    description: "Destroy private records and business documents safely with our shredding service.",
    type: ProductType.SERVICE,
    basePriceCents: cents(5),
    compareAtPriceCents: cents(7),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
        alt: "Document shredding service",
        position: 1,
      },
    ],
  })

  const businessShredService = await createProduct({
    serviceId: shreddingService.id,
    categoryId: categories.shredding.id,
    slug: "business-records-shredding",
    sku: "SH-002",
    title: "Business Records Shredding",
    shortDescription: "Shredding service for business records.",
    description: "Secure shredding for invoices, employee records and archived business paperwork.",
    type: ProductType.SERVICE,
    basePriceCents: cents(10),
    compareAtPriceCents: cents(12),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
        alt: "Business shredding service",
        position: 1,
      },
    ],
  })

  const shredBagService = await createProduct({
    serviceId: shreddingService.id,
    categoryId: categories.shredBags.id,
    slug: "shred-bag-service",
    sku: "SH-003",
    title: "Shred Bag Service",
    shortDescription: "Bag-based secure shredding service.",
    description: "Drop off a shred bag and securely destroy private documents.",
    type: ProductType.SERVICE,
    basePriceCents: cents(12),
    compareAtPriceCents: cents(15),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1200&auto=format&fit=crop",
        alt: "Shred bag service",
        position: 1,
      },
    ],
  })

  const computerRental30 = await createProduct({
    serviceId: computerRentalService.id,
    categoryId: categories.computerRental.id,
    slug: "computer-rental-30-min",
    sku: "CR-001",
    title: "Computer Rental - 30 Minutes",
    shortDescription: "Short-term computer access for email, forms and document work.",
    description: "Rent a workstation for online applications, document editing, printing preparation and email access.",
    type: ProductType.SERVICE,
    basePriceCents: cents(5),
    compareAtPriceCents: cents(7),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        alt: "Computer rental service",
        position: 1,
      },
    ],
  })

  const computerRental60 = await createProduct({
    serviceId: computerRentalService.id,
    categoryId: categories.computerRental.id,
    slug: "computer-rental-60-min",
    sku: "CR-002",
    title: "Computer Rental - 60 Minutes",
    shortDescription: "One-hour computer access in-store.",
    description: "Use a computer in-store for one hour for document creation, uploads, email and forms.",
    type: ProductType.SERVICE,
    basePriceCents: cents(10),
    compareAtPriceCents: cents(12),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        alt: "One-hour computer rental",
        position: 1,
      },
    ],
  })

  const onlineFormsAccess = await createProduct({
    serviceId: computerRentalService.id,
    categoryId: categories.onlineForms.id,
    slug: "online-forms-computer-access",
    sku: "CR-003",
    title: "Online Forms Computer Access",
    shortDescription: "Computer access for online forms and applications.",
    description: "Use a workstation to complete applications, upload files and print supporting documents.",
    type: ProductType.SERVICE,
    basePriceCents: cents(8),
    compareAtPriceCents: cents(10),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?q=80&w=1200&auto=format&fit=crop",
        alt: "Online forms computer access",
        position: 1,
      },
    ],
  })

  const moneyOrderService = await createProduct({
    serviceId: moneyOrdersService.id,
    categoryId: categories.moneyOrders.id,
    slug: "money-order-service",
    sku: "MO-001",
    title: "Money Order Service",
    shortDescription: "Money order service for secure payments.",
    description: "Convenient in-store money order support for rent, bills and official payments.",
    type: ProductType.SERVICE,
    basePriceCents: cents(3),
    compareAtPriceCents: cents(5),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        alt: "Money order service",
        position: 1,
      },
    ],
  })

  const rentMoneyOrder = await createProduct({
    serviceId: moneyOrdersService.id,
    categoryId: categories.moneyOrders.id,
    slug: "rent-money-order",
    sku: "MO-002",
    title: "Rent Money Order",
    shortDescription: "Money order service for rent payments.",
    description: "Use money orders for rent payments and property management requirements.",
    type: ProductType.SERVICE,
    basePriceCents: cents(4),
    compareAtPriceCents: cents(6),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        alt: "Rent money order",
        position: 1,
      },
    ],
  })

  const billPaymentMoneyOrder = await createProduct({
    serviceId: moneyOrdersService.id,
    categoryId: categories.billPayments.id,
    slug: "bill-payment-money-order",
    sku: "MO-003",
    title: "Bill Payment Money Order",
    shortDescription: "Money order support for bill payments.",
    description: "Secure payment option for utility bills and official payment requests.",
    type: ProductType.SERVICE,
    basePriceCents: cents(4),
    compareAtPriceCents: cents(6),
    salesChannel: SalesChannel.IN_STORE,
    images: [
      {
        url: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1200&auto=format&fit=crop",
        alt: "Bill payment money order",
        position: 1,
      },
    ],
  })

  // ADDRESSES
  const billingMohamed = await prisma.address.create({
    data: {
      userId: mohamed.id,
      type: AddressType.BILLING,
      fullName: "Mohamed Soumah",
      company: "MHM Digital",
      line1: "9040 Rainier Ave S #2",
      city: "Seattle",
      state: "WA",
      postalCode: "98118",
      country: "USA",
      phoneNumber: "+1 206 771 0038",
      isDefault: true,
    },
  })

  const shippingMohamed = await prisma.address.create({
    data: {
      userId: mohamed.id,
      type: AddressType.SHIPPING,
      fullName: "Mohamed Soumah",
      company: "MHM Digital",
      line1: "3815 S Othello St, Ste 100-389",
      city: "Seattle",
      state: "WA",
      postalCode: "98118",
      country: "USA",
      phoneNumber: "+1 206 771 0038",
      isDefault: true,
    },
  })

  const billingFatou = await prisma.address.create({
    data: {
      userId: fatou.id,
      type: AddressType.BILLING,
      fullName: "Fatou Diallo",
      company: "Diallo Consulting",
      line1: "1200 Example Street",
      line2: "Suite 12",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "USA",
      phoneNumber: "+1 206 555 2222",
      isDefault: true,
    },
  })

  const shippingFatou = await prisma.address.create({
    data: {
      userId: fatou.id,
      type: AddressType.SHIPPING,
      fullName: "Fatou Diallo",
      company: "Diallo Consulting",
      line1: "1200 Example Street",
      line2: "Suite 12",
      city: "Seattle",
      state: "WA",
      postalCode: "98101",
      country: "USA",
      phoneNumber: "+1 206 555 2222",
      isDefault: true,
    },
  })

  const billingMariam = await prisma.address.create({
    data: {
      userId: mariam.id,
      type: AddressType.BILLING,
      fullName: "Mariam Sow",
      company: "Local Client",
      line1: "2500 Main Street",
      city: "Seattle",
      state: "WA",
      postalCode: "98104",
      country: "USA",
      phoneNumber: "+1 206 555 8787",
      isDefault: true,
    },
  })

  // COUPONS
  const welcome10 = await prisma.coupon.create({
    data: {
      code: "WELCOME10",
      name: "Welcome 10% Off",
      description: "10% off eligible first order.",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      currency: "USD",
      minimumOrderCents: cents(20),
      maximumDiscountCents: cents(15),
      usageLimit: 100,
      usedCount: 1,
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      endsAt: new Date("2026-12-31T23:59:59.000Z"),
      status: CouponStatus.ACTIVE,
      isActive: true,
      appliesToProducts: true,
      appliesToPackages: true,
    },
  })

  const save5 = await prisma.coupon.create({
    data: {
      code: "SAVE5",
      name: "Save 5 Dollars",
      description: "$5 off selected product orders.",
      discountType: DiscountType.FIXED,
      discountValue: cents(5),
      currency: "USD",
      minimumOrderCents: cents(30),
      maximumDiscountCents: cents(5),
      usageLimit: 50,
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      endsAt: new Date("2026-06-30T23:59:59.000Z"),
      status: CouponStatus.ACTIVE,
      isActive: true,
      appliesToProducts: true,
      appliesToPackages: false,
    },
  })

  const print20 = await prisma.coupon.create({
    data: {
      code: "PRINT20",
      name: "20% Print Promo",
      description: "20% off selected print products.",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      currency: "USD",
      minimumOrderCents: cents(50),
      maximumDiscountCents: cents(25),
      usageLimit: 30,
      startsAt: new Date("2026-01-01T00:00:00.000Z"),
      endsAt: new Date("2026-09-30T23:59:59.000Z"),
      status: CouponStatus.ACTIVE,
      isActive: true,
      appliesToProducts: true,
      appliesToPackages: false,
    },
  })

  void save5
  void print20

  // ORDERS
  const bcGlossVariant = businessCards.variants.find((v) => v.sku === "BC-001-250-GLOSS")
  const flyerDefaultVariant = flyers.variants.find((v) => v.sku === "FL-001-100")
  const bannerDefaultVariant = banners.variants.find((v) => v.sku === "BN-001-2X6")

  const order1 = await prisma.order.create({
    data: {
      orderNumber: "PP-1001",
      userId: mohamed.id,
      status: OrderStatus.PAID,
      currency: "USD",
      subtotalCents: cents(72),
      taxCents: cents(7.2),
      discountCents: cents(7.2),
      shippingCents: cents(12),
      totalCents: cents(84),
      customerName: "Mohamed Soumah",
      customerEmail: "mohamed@example.com",
      customerPhone: "+1 206 771 0038",
      billingAddressId: billingMohamed.id,
      shippingAddressId: shippingMohamed.id,
      paymentProvider: "stripe",
      paymentRef: "pi_seed_order_1001",
      paidAt: new Date("2026-03-10T14:00:00.000Z"),
      invoiceNumber: "INV-1001",
      invoiceSentAt: new Date("2026-03-10T15:00:00.000Z"),
      invoicePdfUrl: "/invoices/inv-1001.pdf",
      notes: "Customer requested quick turnaround.",
    },
  })

  const order2 = await prisma.order.create({
    data: {
      orderNumber: "PP-1002",
      userId: fatou.id,
      status: OrderStatus.PROCESSING,
      currency: "USD",
      subtotalCents: growthPackage.priceYearCents,
      taxCents: cents(18),
      discountCents: 0,
      shippingCents: 0,
      totalCents: growthPackage.priceYearCents + cents(18),
      customerName: "Fatou Diallo",
      customerEmail: "fatou@example.com",
      customerPhone: "+1 206 555 2222",
      billingAddressId: billingFatou.id,
      shippingAddressId: shippingFatou.id,
      paymentProvider: "paypal",
      paymentRef: "pp_seed_order_1002",
      paidAt: new Date("2026-03-12T10:00:00.000Z"),
      invoiceNumber: "INV-1002",
      invoiceSentAt: new Date("2026-03-12T12:00:00.000Z"),
      invoicePdfUrl: "/invoices/inv-1002.pdf",
    },
  })

  const order3 = await prisma.order.create({
    data: {
      orderNumber: "PP-1003",
      userId: mohamed.id,
      status: OrderStatus.COMPLETED,
      currency: "USD",
      subtotalCents: cents(18),
      taxCents: cents(1.8),
      discountCents: 0,
      shippingCents: 0,
      totalCents: cents(19.8),
      customerName: "Mohamed Soumah",
      customerEmail: "mohamed@example.com",
      customerPhone: "+1 206 771 0038",
      billingAddressId: billingMohamed.id,
      shippingAddressId: billingMohamed.id,
      paymentProvider: "cash",
      paymentRef: "cash-1003",
      paidAt: new Date("2026-03-13T10:30:00.000Z"),
      invoiceNumber: "INV-1003",
      invoicePdfUrl: "/invoices/inv-1003.pdf",
    },
  })

  const order4 = await prisma.order.create({
    data: {
      orderNumber: "PP-1004",
      userId: fatou.id,
      status: OrderStatus.PENDING,
      currency: "USD",
      subtotalCents: cents(129),
      taxCents: cents(12.9),
      discountCents: 0,
      shippingCents: cents(15),
      totalCents: cents(156.9),
      customerName: "Fatou Diallo",
      customerEmail: "fatou@example.com",
      customerPhone: "+1 206 555 2222",
      billingAddressId: billingFatou.id,
      shippingAddressId: shippingFatou.id,
    },
  })

  const order5 = await prisma.order.create({
    data: {
      orderNumber: "PP-1005",
      userId: mariam.id,
      status: OrderStatus.COMPLETED,
      currency: "USD",
      subtotalCents: cents(5),
      taxCents: cents(0.5),
      discountCents: 0,
      shippingCents: 0,
      totalCents: cents(5.5),
      customerName: "Mariam Sow",
      customerEmail: "mariam@example.com",
      customerPhone: "+1 206 555 8787",
      billingAddressId: billingMariam.id,
      shippingAddressId: billingMariam.id,
      paymentProvider: "cash",
      paymentRef: "cash-1005",
      paidAt: new Date("2026-03-13T11:30:00.000Z"),
      invoiceNumber: "INV-1005",
      invoicePdfUrl: "/invoices/inv-1005.pdf",
    },
  })

  const order6 = await prisma.order.create({
    data: {
      orderNumber: "PP-1006",
      userId: fatou.id,
      status: OrderStatus.PAID,
      currency: "USD",
      subtotalCents: cents(13),
      taxCents: cents(1.3),
      discountCents: 0,
      shippingCents: 0,
      totalCents: cents(14.3),
      customerName: "Fatou Diallo",
      customerEmail: "fatou@example.com",
      customerPhone: "+1 206 555 2222",
      billingAddressId: billingFatou.id,
      shippingAddressId: shippingFatou.id,
      paymentProvider: "cash",
      paymentRef: "cash-1006",
      paidAt: new Date("2026-03-13T13:30:00.000Z"),
      invoiceNumber: "INV-1006",
      invoicePdfUrl: "/invoices/inv-1006.pdf",
    },
  })

  // ORDER ITEMS
  const order1Item1 = await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(69),
      totalPriceCents: cents(69),
      currency: "USD",
      productId: businessCards.id,
      productVariantId: bcGlossVariant?.id,
      titleSnapshot: "Premium Business Cards",
      skuSnapshot: bcGlossVariant?.sku ?? "BC-001-250-GLOSS",
      customization: {
        customerName: "Mohamed Soumah",
        finish: "Gloss",
        sides: "Double-Sided",
      } as Prisma.InputJsonValue,
      uploadedFiles: ["/uploads/business-card-front.pdf", "/uploads/business-card-back.pdf"],
      fulfillmentStatus: FulfillmentStatus.IN_PROGRESS,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order1.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(3),
      totalPriceCents: cents(3),
      currency: "USD",
      productId: faxService.id,
      titleSnapshot: "Fax Service",
      skuSnapshot: "FX-001",
      customization: {
        pages: 3,
        destination: "Domestic",
      } as Prisma.InputJsonValue,
      uploadedFiles: [],
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order2.id,
      type: SellableType.PACKAGE,
      quantity: 1,
      unitPriceCents: growthPackage.priceYearCents,
      totalPriceCents: growthPackage.priceYearCents,
      currency: "USD",
      packageId: growthPackage.id,
      titleSnapshot: "Growth Design Package",
      skuSnapshot: "PK-GROWTH",
      customization: {
        requestedAssets: ["Flyer", "Business Card", "Social Graphic"],
      } as Prisma.InputJsonValue,
      uploadedFiles: ["/uploads/brand-assets.zip"],
      fulfillmentStatus: FulfillmentStatus.IN_PROGRESS,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order3.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(18),
      totalPriceCents: cents(18),
      currency: "USD",
      productId: passportPhotos.id,
      titleSnapshot: "Passport Photo Service",
      skuSnapshot: "PP-001",
      customization: {
        photoType: "US Passport",
      } as Prisma.InputJsonValue,
      uploadedFiles: [],
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order4.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(129),
      totalPriceCents: cents(129),
      currency: "USD",
      productId: banners.id,
      productVariantId: bannerDefaultVariant?.id,
      titleSnapshot: "Vinyl Banners",
      skuSnapshot: bannerDefaultVariant?.sku ?? "BN-001-2X6",
      customization: {
        businessName: "Diallo Consulting",
        size: "2ft x 6ft",
        grommets: true,
      } as Prisma.InputJsonValue,
      uploadedFiles: ["/uploads/banner-artwork.pdf"],
      fulfillmentStatus: FulfillmentStatus.NOT_STARTED,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order5.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(5),
      totalPriceCents: cents(5),
      currency: "USD",
      productId: uspsFirstClass.id,
      titleSnapshot: "USPS First-Class Mail Assistance",
      skuSnapshot: "USPS-001",
      customization: {
        mailType: "Letter",
        destination: "Domestic",
      } as Prisma.InputJsonValue,
      uploadedFiles: [],
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order6.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(10),
      totalPriceCents: cents(10),
      currency: "USD",
      productId: computerRental60.id,
      titleSnapshot: "Computer Rental - 60 Minutes",
      skuSnapshot: "CR-002",
      customization: {
        purpose: "Immigration forms",
        duration: "60 minutes",
      } as Prisma.InputJsonValue,
      uploadedFiles: [],
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
    },
  })

  await prisma.orderItem.create({
    data: {
      orderId: order6.id,
      type: SellableType.PRODUCT,
      quantity: 1,
      unitPriceCents: cents(3),
      totalPriceCents: cents(3),
      currency: "USD",
      productId: moneyOrderService.id,
      titleSnapshot: "Money Order Service",
      skuSnapshot: "MO-001",
      customization: {
        amount: 250,
      } as Prisma.InputJsonValue,
      uploadedFiles: [],
      fulfillmentStatus: FulfillmentStatus.DELIVERED,
    },
  })

  // COUPON USAGES
  await prisma.couponUsage.createMany({
    data: [
      {
        couponId: welcome10.id,
        orderId: order1.id,
        userId: mohamed.id,
        discountCents: cents(7.2),
      },
      {
        couponId: print20.id,
        orderId: order4.id,
        userId: fatou.id,
        discountCents: cents(20),
      },
    ],
  })

  // REVIEWS
  await prisma.review.createMany({
    data: [
      {
        userId: mohamed.id,
        productId: businessCards.id,
        rating: 5,
        title: "Excellent quality",
        comment: "The cards looked premium and very professional.",
        status: ReviewStatus.APPROVED,
        isVerified: true,
      },
      {
        userId: fatou.id,
        productId: flyers.id,
        rating: 4,
        title: "Good flyer print",
        comment: "Nice colors and clean paper finish.",
        status: ReviewStatus.APPROVED,
        isVerified: true,
      },
      {
        userId: mohamed.id,
        productId: passportPhotos.id,
        rating: 5,
        title: "Fast service",
        comment: "Quick and professional passport photo service.",
        status: ReviewStatus.APPROVED,
        isVerified: false,
      },
      {
        userId: fatou.id,
        productId: banners.id,
        rating: 5,
        title: "Great banner quality",
        comment: "The banner was vibrant and durable.",
        status: ReviewStatus.APPROVED,
        isVerified: true,
      },
      {
        userId: mohamed.id,
        productId: poster.id,
        rating: 4,
        title: "Nice poster print",
        comment: "The poster looked clean and sharp.",
        status: ReviewStatus.APPROVED,
        isVerified: true,
      },
      {
        userId: mariam.id,
        productId: uspsFirstClass.id,
        rating: 5,
        title: "Helpful mailing service",
        comment: "Fast help with my USPS mail and forms.",
        status: ReviewStatus.APPROVED,
        isVerified: false,
      },
      {
        userId: fatou.id,
        productId: secureShredding.id,
        rating: 5,
        title: "Secure and quick",
        comment: "The shredding service was quick and professional.",
        status: ReviewStatus.APPROVED,
        isVerified: false,
      },
      {
        userId: fatou.id,
        productId: computerRental60.id,
        rating: 4,
        title: "Very useful computer access",
        comment: "Good option for filling forms and printing documents.",
        status: ReviewStatus.APPROVED,
        isVerified: false,
      },
      {
        userId: mariam.id,
        productId: moneyOrderService.id,
        rating: 4,
        title: "Convenient service",
        comment: "Easy and quick money order service.",
        status: ReviewStatus.APPROVED,
        isVerified: false,
      },
    ],
  })

  // INVENTORY MOVEMENTS
  const allProducts = await prisma.product.findMany({
    include: {
      variants: true,
    },
  })

  for (const product of allProducts) {
    if (product.trackInventory && product.variants.length > 0) {
      for (const variant of product.variants) {
        if (variant.stockQty && variant.stockQty > 0) {
          await prisma.inventoryMovement.create({
            data: {
              productId: product.id,
              productVariantId: variant.id,
              type: InventoryMovementType.IN,
              quantity: variant.stockQty,
              note: "Initial seeded stock",
              reference: `INIT-${variant.sku ?? variant.id}`,
            },
          })
        }
      }
    }
  }

  if (bcGlossVariant) {
    await prisma.inventoryMovement.create({
      data: {
        productId: businessCards.id,
        productVariantId: bcGlossVariant.id,
        type: InventoryMovementType.OUT,
        quantity: 1,
        note: "Used for order PP-1001",
        reference: "PP-1001",
      },
    })
  }

  if (flyerDefaultVariant) {
    await prisma.inventoryMovement.create({
      data: {
        productId: flyers.id,
        productVariantId: flyerDefaultVariant.id,
        type: InventoryMovementType.ADJUSTMENT,
        quantity: 5,
        note: "Manual stock correction",
        reference: "ADJ-001",
      },
    })
  }

  await prisma.inventoryMovement.createMany({
    data: [
      {
        productId: secureShredding.id,
        type: InventoryMovementType.ADJUSTMENT,
        quantity: 0,
        note: "Service product tracked for dashboard visibility",
        reference: "SRV-001",
      },
      {
        productId: computerRental60.id,
        type: InventoryMovementType.ADJUSTMENT,
        quantity: 0,
        note: "Service product tracked for dashboard visibility",
        reference: "SRV-002",
      },
      {
        productId: moneyOrderService.id,
        type: InventoryMovementType.ADJUSTMENT,
        quantity: 0,
        note: "Service product tracked for dashboard visibility",
        reference: "SRV-003",
      },
    ],
  })

  // PROOF APPROVALS
  await prisma.proofApproval.createMany({
    data: [
      {
        orderItemId: order1Item1.id,
        productVariantId: bcGlossVariant?.id,
        fileUrl: "/proofs/order-pp-1001-business-cards-proof.pdf",
        message: "Please review your business card proof before production.",
        status: ProofStatus.SENT,
        sentAt: new Date("2026-03-10T16:00:00.000Z"),
      },
      {
        orderItemId: order1Item1.id,
        productVariantId: bcGlossVariant?.id,
        fileUrl: "/proofs/order-pp-1001-business-cards-revision-2.pdf",
        message: "Updated proof after requested revision.",
        status: ProofStatus.REVISION_REQUESTED,
        sentAt: new Date("2026-03-10T17:00:00.000Z"),
        respondedAt: new Date("2026-03-10T17:30:00.000Z"),
        customerNote: "Please adjust the phone number placement.",
      },
      {
        orderItemId: order1Item1.id,
        productVariantId: bcGlossVariant?.id,
        fileUrl: "/proofs/order-pp-1001-business-cards-final.pdf",
        message: "Final proof approved for printing.",
        status: ProofStatus.APPROVED,
        sentAt: new Date("2026-03-10T18:00:00.000Z"),
        respondedAt: new Date("2026-03-10T18:20:00.000Z"),
        customerNote: "Approved.",
      },
    ],
  })

  // CONTACTS
  await prisma.contact.createMany({
    data: [
      {
        name: "John Smith",
        email: "john@example.com",
        phoneNumber: "+1 206 555 1111",
        company: "Smith Realty",
        service: "Printing",
        subject: "Need flyer printing",
        description: "I need 500 flyers for a real estate open house.",
      },
      {
        name: "Amina Traore",
        email: "amina@example.com",
        phoneNumber: "+1 206 555 3333",
        company: "Community Group",
        service: "Notary Public",
        subject: "Document notarization",
        description: "Need help notarizing an affidavit and travel consent letter.",
      },
      {
        name: "Carlos Mendes",
        email: "carlos@example.com",
        phoneNumber: "+1 206 555 4545",
        company: "Local Restaurant",
        service: "Printing",
        subject: "Need a grand opening banner",
        description: "We need a retractable banner and one outdoor vinyl banner.",
      },
      {
        name: "Selam Abebe",
        email: "selam@example.com",
        phoneNumber: "+1 206 555 7676",
        company: "Community Support",
        service: "USPS Mailing",
        subject: "Need help mailing documents",
        description: "I need assistance sending immigration documents by mail.",
      },
      {
        name: "Mariam Sow",
        email: "mariam.client@example.com",
        phoneNumber: "+1 206 555 8787",
        company: "Local Client",
        service: "Computer Rental",
        subject: "Need computer access",
        description: "I need a computer for 1 hour to complete online forms and print documents.",
      },
      {
        name: "Fatimata Barry",
        email: "fatimata@example.com",
        phoneNumber: "+1 206 555 9898",
        company: "Tenant Support",
        service: "Money Orders",
        subject: "Need money order for rent",
        description: "I need help purchasing a money order for my rent payment.",
      },
    ],
  })

  void starterPackage
  void ultimatePackage
  void notaryPrepPackage
  void mailingSupportPackage
  void foldedBusinessCards
  void handbills
  void faxReceive
  void scanningService
  void digitalPhotoFile
  void affidavitNotary
  void travelConsent
  void priorityPackageMail
  void labelPrintingService
  void visaPhotosService
  void businessShredService
  void shredBagService
  void computerRental30
  void onlineFormsAccess
  void rentMoneyOrder
  void billPaymentMoneyOrder

  console.log("✅ Seed completed successfully.")
}

main()
  .catch((error) => {
    console.error("❌ Seed failed")
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })