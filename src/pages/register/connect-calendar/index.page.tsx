import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Header, RegisterContainer } from '../styles'
import { ArrowRight } from 'phosphor-react'
import { ConnectBox, ConnectItem } from './styles'
import { signIn } from 'next-auth/react'

export default function Register() {
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
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              signIn('google')
            }}
          >
            {' '}
            Conectar
            <ArrowRight />
          </Button>
        </ConnectItem>
        <Button type="submit" size={'md'}>
          {' '}
          Próximo passo <ArrowRight />
        </Button>
      </ConnectBox>
    </RegisterContainer>
  )
}
