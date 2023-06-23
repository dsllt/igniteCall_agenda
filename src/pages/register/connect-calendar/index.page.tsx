import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Header, RegisterContainer } from '../styles'
import { ArrowRight, Check } from 'phosphor-react'
import { AuthError, ConnectBox, ConnectItem } from './styles'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCalendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google')
  }

  async function handleNavigateToNextStep() {
    await router.push('/register/time-intervals')
  }
  return (
    <RegisterContainer>
      <Header>
        <Heading size={'2xl'}>Conecte sua agenda!</Heading>
        <Text size={'md'}>
          Conecte o seu calendário para verificar automaticamente as horas
          ocupadas e os novos eventos à medida em que são agendados.
        </Text>
        <MultiStep currentStep={2} size={4} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              {' '}
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar ao Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar
          </AuthError>
        )}

        <Button
          type="submit"
          size={'md'}
          disabled={!isSignedIn}
          onClick={handleNavigateToNextStep}
        >
          {' '}
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
