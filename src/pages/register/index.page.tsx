import { Button, Heading, MultiStep, Text, TextInput } from '@ignite-ui/react'
import {
  FormErrorMessage,
  Header,
  RegisterContainer,
  RegisterForm,
} from './styles'
import { useForm } from 'react-hook-form'
import { ArrowRight } from 'phosphor-react'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { api } from '@/lib/axios'
import { AxiosError } from 'axios'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, { message: 'O usuário precisa ter pelo menos 3 letras.' })
    .regex(/^([a-z\\-]+)$/i, {
      message: 'O usuário pode ter apenas letras e hífen.',
    })
    .transform((username) => username.toLowerCase()),
  name: z
    .string()
    .min(3, { message: 'O nome precisa ter pelo menos 3 letras.' }),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
  })

  const router = useRouter()

  useEffect(() => {
    if (router.query.username) {
      setValue('username', String(router.query.username))
    }
  }, [router.query?.username, setValue])

  async function handleRegister(data: RegisterFormData) {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })
    } catch (err) {
      if (err instanceof AxiosError && err?.response?.data?.message) {
        alert(err.response.data.message)
        return
      }
      console.error(err)
    }
  }

  return (
    <RegisterContainer>
      <Header>
        <Heading size={'2xl'}>Bem-vindo ao Ignite Call!</Heading>
        <Text size={'md'}>
          Precisamos de algumas informações para criar seu perfil! Ah, você pode
          editar essas informações depois.
        </Text>
        <MultiStep currentStep={1} size={4} />
      </Header>
      <RegisterForm as={'form'} onSubmit={handleSubmit(handleRegister)}>
        <label>
          <Text size={'sm'}>Nome de usuário</Text>
          <TextInput
            prefix="cal.com/"
            placeholder="seu-usuario"
            {...register('username')}
          />
          {errors.username && (
            <FormErrorMessage size={'sm'}>
              {errors.username.message}
            </FormErrorMessage>
          )}
        </label>
        <label>
          <Text size={'sm'}>Nome completo</Text>
          <TextInput placeholder="Digite seu nome" {...register('name')} />
          {errors.name && (
            <FormErrorMessage size={'sm'}>
              {errors.name.message}
            </FormErrorMessage>
          )}
        </label>
        <Button type="submit" size={'md'} disabled={isSubmitting}>
          {' '}
          Próximo passo <ArrowRight />
        </Button>
      </RegisterForm>
    </RegisterContainer>
  )
}
