import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'
import { PROJECT_TYPES, type ProjectType } from '@/lib/constants'
import type { ContactFormData } from '@/types'

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  projectType: z.enum(PROJECT_TYPES),
})

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [searchParams] = useSearchParams()
  const urlType = searchParams.get('type')
  const initialType: ProjectType =
    urlType && (PROJECT_TYPES as readonly string[]).includes(urlType)
      ? (urlType as ProjectType)
      : 'Kitchen'

  const [status, setStatus] = useState<FormStatus>('idle')

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { projectType: initialType },
  })

  useEffect(() => {
    if (urlType && (PROJECT_TYPES as readonly string[]).includes(urlType)) {
      setValue('projectType', urlType as ProjectType)
    }
  }, [urlType, setValue])

  const onSubmit = async (data: ContactFormData) => {
    setStatus('sending')

    // Simulated submission delay
    void data
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setStatus('success')
    reset()

    setTimeout(() => setStatus('idle'), 4000)
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-start gap-5 py-10 sm:py-12"
      >
        <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full border border-gold bg-gold/10">
          <Check size={28} className="text-gold" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-2xl sm:text-3xl font-light text-black">Message Sent</h3>
        <p className="text-sm font-light text-gray leading-relaxed max-w-md">
          Thank you for reaching out. We will review your project details and contact you shortly.
        </p>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 sm:space-y-7" noValidate>
      <div>
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input id="name" type="text" placeholder="Your full name" className="form-input" {...register('name')} />
        {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name.message}</p>}
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input id="email" type="email" placeholder="name@domain.com" className="form-input" {...register('email')} />
          {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input id="phone" type="tel" placeholder="+44 7400 000000" className="form-input" {...register('phone')} />
          {errors.phone && <p className="mt-1.5 text-xs text-red-600">{errors.phone.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="projectType" className="form-label">
          Project Type
        </label>
        <select
          id="projectType"
          className="form-input cursor-pointer appearance-none bg-transparent"
          {...register('projectType')}
        >
          {PROJECT_TYPES.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Project Details / Dimensions
        </label>
        <textarea
          id="message"
          rows={4}
          placeholder="Tell us about the space, required stone, edges, or timelines..."
          className="form-input resize-none"
          {...register('message')}
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-600">{errors.message.message}</p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn-gold w-full sm:w-auto shadow-md disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span>{status === 'sending' ? 'Sending Enquiry...' : 'Send Enquiry'}</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </form>
  )
}
