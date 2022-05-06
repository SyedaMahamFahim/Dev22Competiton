import React from 'react'
import {
    Button,
  } from '@chakra-ui/react';

const BlueBtn = ({btnBlueText}) => {
  return (
    <Button
    flex={1}
    fontSize={'sm'}
    rounded={'full'}
    bg={'blue.400'}
    color={'white'}
    boxShadow={
      '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
    }
    _hover={{
      bg: 'blue.500',
    }}
    _focus={{
      bg: 'blue.500',
    }}>
    {btnBlueText}
  </Button>
  )
}

export default BlueBtn