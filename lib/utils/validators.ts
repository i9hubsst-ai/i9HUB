// Validation utilities for Brazilian documents and formats

export function validateCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '')
  
  if (cpf.length !== 11) return false
  if (/^(\d)\1{10}$/.test(cpf)) return false // All same digits

  let sum = 0
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i)
  }
  let checkDigit1 = 11 - (sum % 11)
  if (checkDigit1 >= 10) checkDigit1 = 0

  if (checkDigit1 !== parseInt(cpf.charAt(9))) return false

  sum = 0
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i)
  }
  let checkDigit2 = 11 - (sum % 11)
  if (checkDigit2 >= 10) checkDigit2 = 0

  return checkDigit2 === parseInt(cpf.charAt(10))
}

export function formatCPF(cpf: string): string {
  cpf = cpf.replace(/\D/g, '')
  if (cpf.length <= 11) {
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2')
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2')
  }
  return cpf
}

export function formatPhone(phone: string): string {
  phone = phone.replace(/\D/g, '')
  if (phone.length <= 10) {
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2')
    phone = phone.replace(/(\d{4})(\d)/, '$1-$2')
  } else {
    phone = phone.replace(/(\d{2})(\d)/, '($1) $2')
    phone = phone.replace(/(\d{5})(\d)/, '$1-$2')
  }
  return phone
}
