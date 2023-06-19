import { Box, Heading, Text, styled } from '@ignite-ui/react'

export const RegisterContainer = styled('div', {
  maxWidth: 540,
  margin: '$20 auto',
})

export const Header = styled('div', {
  padding: '0 $6',
  marginBottom: '$6',

  [`> ${Heading}`]: {
    lineHeight: '$base',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$6',
  },
})

export const RegisterForm = styled(Box, {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  padding: '$6',
  gap: '$4',

  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: '$2',
  },
})

export const FormErrorMessage = styled(Text, {
  color: '#f75a68',
})
