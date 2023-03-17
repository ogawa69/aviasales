import { Alert } from 'antd'
import React from 'react'

const ErrorMessage = () => {
  return (
    <Alert
      style={{ height: 120, paddingTop: 45, textAlign: 'center' }}
      type="error"
      description="Упс... Что-то пошло не так, перезагрузите страницу."
    />
  )
}

export default ErrorMessage
