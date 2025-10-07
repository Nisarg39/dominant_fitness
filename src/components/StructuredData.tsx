'use client'

import { useEffect } from 'react'

interface StructuredDataProps {
  type?: 'Organization' | 'LocalBusiness' | 'SportsOrganization'
}

const StructuredData = ({ type = 'Organization' }: StructuredDataProps) => {
  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": type,
      "name": "DOMINATE Sport Performance",
      "alternateName": "DOMINATE Performance",
      "description": "Elite performance isn't a privilege — it's a process. Professional sports performance training and coaching for athletes of all levels.",
      "url": "https://yourdomain.com", // Replace with your actual domain
      "logo": "https://yourdomain.com/images/logo.png", // Replace with your actual domain
      "image": "https://yourdomain.com/images/og-image.jpg", // Replace with your actual domain
      "sameAs": [
        "https://www.instagram.com/dominateperformance", // Replace with your actual social media
        "https://www.facebook.com/dominateperformance",
        "https://www.linkedin.com/company/dominateperformance",
        "https://twitter.com/dominateperformance"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+91-XXXXXXXXXX", // Replace with your actual phone
        "contactType": "customer service",
        "areaServed": "IN",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Your Street Address", // Replace with your actual address
        "addressLocality": "Your City",
        "addressRegion": "Your State",
        "postalCode": "XXXXXX",
        "addressCountry": "IN"
      },
      "foundingDate": "2024",
      "slogan": "Elite performance isn't a privilege — it's a process",
      "knowsAbout": [
        "Sports Performance Training",
        "Strength and Conditioning",
        "Athlete Development",
        "Performance Testing",
        "Sports Science",
        "UKSCA Certified Coaching",
        "Elite Performance Training"
      ],
      "serviceType": [
        "Sports Performance Training",
        "Athlete Development",
        "Strength and Conditioning",
        "Performance Testing",
        "Sports Coaching"
      ],
      "areaServed": {
        "@type": "Country",
        "name": "India"
      },
      "hasCredential": {
        "@type": "EducationalOccupationalCredential",
        "name": "UKSCA Certified",
        "description": "UK Strength & Conditioning Association Certification"
      }
    }

    // Add the structured data to the page
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(structuredData)
    document.head.appendChild(script)

    return () => {
      // Clean up the script when component unmounts
      if (document.head.contains(script)) {
        document.head.removeChild(script)
      }
    }
  }, [type])

  return null
}

export default StructuredData
