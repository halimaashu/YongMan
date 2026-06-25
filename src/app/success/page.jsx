// import { PostPaymentInfo } from '@/lib/actions/payment'
import { PostPaymentInfo } from '@/lib/actions/payment'
import { stripe } from '@/lib/stripe'
import { redirect } from 'next/navigation'
import { Card, Button } from "@heroui/react"
import { CircleCheck } from '@gravity-ui/icons'
import Image from 'next/image'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
    metadata,
    customer_details
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  const customerEmail = customer_details?.email

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    const data = { ...metadata, sessionId: session_id }
    
    try {
      await PostPaymentInfo(data)
    } catch (error) {
      console.error("Error updating payment log: ", error)
    }

    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12 bg-background">
        
        {/* Brand Header with your public folder logo */}
        <div className="flex items-center gap-2 mb-6">
          <Image 
            src="/YongMan-logo.png" 
            alt="YoungMan Logo" 
            width={40} 
            height={40} 
            className="object-contain rounded-md"
          />
          <span className="text-xl font-black tracking-wider text-foreground">
            Young<span className='text-sky-400'>Man</span>
          </span>
        </div>

        <Card className="max-w-md w-full border border-divider shadow-md">
          
          <Card.Header className="flex flex-col items-center text-center p-6 pb-2 space-y-4">
            {/* Visual Success Indicator */}
            <span className="p-4 bg-success-50 rounded-full text-success text-5xl inline-flex">
              <CircleCheck className="w-12 h-12" />
            </span>
            
            <Card.Title className="text-2xl font-bold text-foreground">
              Payment Successful!
            </Card.Title>
            
            {/* Safe phrasing using spans instead of nested block elements */}
            <Card.Description className="text-sm text-default-500 leading-relaxed">
              <span>Thank you for choosing YoungMan! A confirmation email will be sent to </span>
              <span className="font-semibold text-foreground">{customerEmail}</span>.
            </Card.Description>
          </Card.Header>

          <Card.Content className="px-6 py-4 space-y-4 text-center">
            <hr className="w-full border-divider" />
            
            <p className="text-xs text-default-400">
              If you have any questions about your order, please contact our support desk at{' '}
              <a 
                href="mailto:support@youngman.com" 
                className="text-primary hover:underline font-medium"
              >
                support@youngman.com
              </a>.
            </p>
          </Card.Content>

          <Card.Footer className="p-6 pt-2 flex flex-col gap-2">
            <Link
            href="/" >
            <Button 
              
              
              color="primary" 
              className="w-full font-bold shadow-md shadow-primary/20"
              size="lg"
            >
              Return to Homepage
            </Button>
            </Link>
          </Card.Footer>

        </Card>
      </div>
    )
  }

  return null
}