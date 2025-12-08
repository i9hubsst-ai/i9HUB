'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2 } from 'lucide-react'
import { updateCompanyComplete, updateCompanyCNAEs } from '@/app/actions/companies'
import { CNAEFormTab } from '@/components/dashboard/cnae-form-tab'
import { CompanyLogoUpload } from '@/components/dashboard/company-logo-upload'

interface CompanyFormProps {
  company: any
}

export function CompanyEditForm({ company }: CompanyFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCnaeIds, setSelectedCnaeIds] = useState<string[]>([])
  const [principalCnaeId, setPrincipalCnaeId] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    
    // Processar CNAEs secundários
    const cnaesSecundarios = formData.get('cnaesSecundarios') as string
    const cnaesArray = cnaesSecundarios ? cnaesSecundarios.split(',').map(c => c.trim()).filter(Boolean) : []

    const data = {
      // Dados Institucionais
      name: formData.get('name') as string,
      razaoSocial: formData.get('razaoSocial') as string || undefined,
      cnpj: formData.get('cnpj') as string,
      inscricaoEstadual: formData.get('inscricaoEstadual') as string || undefined,
      inscricaoMunicipal: formData.get('inscricaoMunicipal') as string || undefined,
      naturezaJuridica: formData.get('naturezaJuridica') as string || undefined,
      ramoAtividade: formData.get('ramoAtividade') as string || undefined,
      cnaePrincipal: formData.get('cnaePrincipal') as string || undefined,
      cnaesSecundarios: cnaesArray,
      dataFundacao: formData.get('dataFundacao') as string || undefined,
      
      // Endereço
      endereco: formData.get('endereco') as string || undefined,
      numero: formData.get('numero') as string || undefined,
      complemento: formData.get('complemento') as string || undefined,
      bairro: formData.get('bairro') as string || undefined,
      cidade: formData.get('cidade') as string || undefined,
      estado: formData.get('estado') as string || undefined,
      cep: formData.get('cep') as string || undefined,
      
      // Contatos
      telefone: formData.get('telefone') as string || undefined,
      telefone2: formData.get('telefone2') as string || undefined,
      email: formData.get('email') as string || undefined,
      emailInstitucional: formData.get('emailInstitucional') as string || undefined,
      
      // Responsável Legal
      responsavelLegal: formData.get('responsavelLegal') as string || undefined,
      responsavelLegalCargo: formData.get('responsavelLegalCargo') as string || undefined,
      responsavelLegalEmail: formData.get('responsavelLegalEmail') as string || undefined,
      responsavelLegalTelefone: formData.get('responsavelLegalTelefone') as string || undefined,
      
      // Responsável Técnico SST
      responsavelTecnicoSST: formData.get('responsavelTecnicoSST') as string || undefined,
      responsavelTecnicoCargo: formData.get('responsavelTecnicoCargo') as string || undefined,
      responsavelTecnicoRegistro: formData.get('responsavelTecnicoRegistro') as string || undefined,
      responsavelTecnicoEmail: formData.get('responsavelTecnicoEmail') as string || undefined,
      responsavelTecnicoTelefone: formData.get('responsavelTecnicoTelefone') as string || undefined,
      
      // SST
      grauRisco: formData.get('grauRisco') as string || undefined,
      temSesmt: formData.get('temSesmt') === 'on',
      numeroFuncionarios: formData.get('numeroFuncionarios') ? parseInt(formData.get('numeroFuncionarios') as string) : undefined,
      numeroTurnos: formData.get('numeroTurnos') ? parseInt(formData.get('numeroTurnos') as string) : undefined,
      jornada: formData.get('jornada') as string || undefined,
      
      // Complementares
      descricaoNegocio: formData.get('descricaoNegocio') as string || undefined,
      missao: formData.get('missao') as string || undefined,
      visao: formData.get('visao') as string || undefined,
      valores: formData.get('valores') as string || undefined,
      observacoes: formData.get('observacoes') as string || undefined,
    }

    try {
      const result = await updateCompanyComplete(company.id, data)
      
      if (result.error) {
        alert(result.error)
        setIsSubmitting(false)
        return
      }

      // Salvar CNAEs se foram selecionados
      if (selectedCnaeIds.length > 0 && principalCnaeId) {
        const cnaeResult = await updateCompanyCNAEs(company.id, selectedCnaeIds, principalCnaeId)
        if (cnaeResult.error) {
          alert('Empresa atualizada, mas houve erro ao salvar CNAEs: ' + cnaeResult.error)
        }
      }
      
      router.push(`/dashboard/companies/${company.id}`)
      router.refresh()
    } catch (error) {
      console.error('Erro ao atualizar empresa:', error)
      alert('Erro ao atualizar empresa')
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Tabs defaultValue="institutional" className="space-y-6">
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="institutional">Dados Institucionais</TabsTrigger>
          <TabsTrigger value="logo">Logo</TabsTrigger>
          <TabsTrigger value="address">Endereço</TabsTrigger>
          <TabsTrigger value="contacts">Contatos</TabsTrigger>
          <TabsTrigger value="cnaes">CNAEs</TabsTrigger>
          <TabsTrigger value="sst">SST</TabsTrigger>
          <TabsTrigger value="additional">Complementares</TabsTrigger>
        </TabsList>

        {/* Aba 1: Dados Institucionais */}
        <TabsContent value="institutional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dados Institucionais</CardTitle>
              <CardDescription>Informações legais e cadastrais da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome Fantasia *</Label>
                  <Input id="name" name="name" defaultValue={company.name} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="razaoSocial">Razão Social</Label>
                  <Input id="razaoSocial" name="razaoSocial" defaultValue={company.razaoSocial || ''} />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnpj">CNPJ *</Label>
                  <Input id="cnpj" name="cnpj" defaultValue={company.cnpj} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoEstadual">Inscrição Estadual</Label>
                  <Input id="inscricaoEstadual" name="inscricaoEstadual" defaultValue={company.inscricaoEstadual || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inscricaoMunicipal">Inscrição Municipal</Label>
                  <Input id="inscricaoMunicipal" name="inscricaoMunicipal" defaultValue={company.inscricaoMunicipal || ''} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="naturezaJuridica">Natureza Jurídica</Label>
                  <Input id="naturezaJuridica" name="naturezaJuridica" defaultValue={company.naturezaJuridica || ''} placeholder="Ex: Sociedade Limitada" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ramoAtividade">Ramo de Atividade</Label>
                  <Input id="ramoAtividade" name="ramoAtividade" defaultValue={company.ramoAtividade || ''} placeholder="Ex: Construção Civil" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cnaePrincipal">CNAE Principal</Label>
                  <Input id="cnaePrincipal" name="cnaePrincipal" defaultValue={company.cnaePrincipal || ''} placeholder="Ex: 4120-4/00" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dataFundacao">Data de Fundação</Label>
                  <Input 
                    id="dataFundacao" 
                    name="dataFundacao" 
                    type="date" 
                    defaultValue={company.dataFundacao ? new Date(company.dataFundacao).toISOString().split('T')[0] : ''} 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cnaesSecundarios">CNAEs Secundários</Label>
                <Input 
                  id="cnaesSecundarios" 
                  name="cnaesSecundarios" 
                  defaultValue={company.cnaesSecundarios?.join(', ') || ''} 
                  placeholder="Separe por vírgula. Ex: 4120-4/01, 4120-4/02" 
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 2: Logo */}
        <TabsContent value="logo" className="space-y-4">
          <CompanyLogoUpload companyId={company.id} currentLogo={company.logo} />
        </TabsContent>

        {/* Aba 3: Endereço */}
        <TabsContent value="address" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Endereço da Matriz</CardTitle>
              <CardDescription>Localização principal da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-2 space-y-2">
                  <Label htmlFor="endereco">Logradouro</Label>
                  <Input id="endereco" name="endereco" defaultValue={company.endereco || ''} placeholder="Rua, Avenida, etc" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numero">Número</Label>
                  <Input id="numero" name="numero" defaultValue={company.numero || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input id="complemento" name="complemento" defaultValue={company.complemento || ''} placeholder="Sala, Andar, etc" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bairro">Bairro</Label>
                  <Input id="bairro" name="bairro" defaultValue={company.bairro || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade</Label>
                  <Input id="cidade" name="cidade" defaultValue={company.cidade || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estado">Estado</Label>
                  <Input id="estado" name="estado" defaultValue={company.estado || ''} placeholder="UF" maxLength={2} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cep">CEP</Label>
                <Input id="cep" name="cep" defaultValue={company.cep || ''} placeholder="00000-000" className="max-w-xs" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 3: Contatos */}
        <TabsContent value="contacts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contatos Gerais</CardTitle>
              <CardDescription>Telefones e e-mails da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone Principal</Label>
                  <Input id="telefone" name="telefone" defaultValue={company.telefone || ''} placeholder="(00) 0000-0000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telefone2">Telefone Secundário</Label>
                  <Input id="telefone2" name="telefone2" defaultValue={company.telefone2 || ''} placeholder="(00) 0000-0000" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail de Contato</Label>
                  <Input id="email" name="email" type="email" defaultValue={company.email || ''} placeholder="contato@empresa.com.br" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailInstitucional">E-mail Institucional</Label>
                  <Input id="emailInstitucional" name="emailInstitucional" type="email" defaultValue={company.emailInstitucional || ''} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsável Legal</CardTitle>
              <CardDescription>Representante legal da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavelLegal">Nome Completo</Label>
                  <Input id="responsavelLegal" name="responsavelLegal" defaultValue={company.responsavelLegal || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelLegalCargo">Cargo</Label>
                  <Input id="responsavelLegalCargo" name="responsavelLegalCargo" defaultValue={company.responsavelLegalCargo || ''} placeholder="Ex: Diretor" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavelLegalEmail">E-mail</Label>
                  <Input id="responsavelLegalEmail" name="responsavelLegalEmail" type="email" defaultValue={company.responsavelLegalEmail || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelLegalTelefone">Telefone</Label>
                  <Input id="responsavelLegalTelefone" name="responsavelLegalTelefone" defaultValue={company.responsavelLegalTelefone || ''} />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Responsável Técnico SST</CardTitle>
              <CardDescription>Engenheiro ou Técnico de Segurança do Trabalho</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavelTecnicoSST">Nome Completo</Label>
                  <Input id="responsavelTecnicoSST" name="responsavelTecnicoSST" defaultValue={company.responsavelTecnicoSST || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelTecnicoCargo">Cargo</Label>
                  <Input id="responsavelTecnicoCargo" name="responsavelTecnicoCargo" defaultValue={company.responsavelTecnicoCargo || ''} placeholder="Ex: Engenheiro de Segurança" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelTecnicoRegistro">Registro Profissional</Label>
                  <Input id="responsavelTecnicoRegistro" name="responsavelTecnicoRegistro" defaultValue={company.responsavelTecnicoRegistro || ''} placeholder="Ex: CREA 12345/SP" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="responsavelTecnicoEmail">E-mail</Label>
                  <Input id="responsavelTecnicoEmail" name="responsavelTecnicoEmail" type="email" defaultValue={company.responsavelTecnicoEmail || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsavelTecnicoTelefone">Telefone</Label>
                  <Input id="responsavelTecnicoTelefone" name="responsavelTecnicoTelefone" defaultValue={company.responsavelTecnicoTelefone || ''} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 4: CNAEs */}
        <TabsContent value="cnaes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CNAEs da Empresa</CardTitle>
              <CardDescription>
                Classifique a empresa com os códigos CNAE. O CNAE principal determina automaticamente o grau de risco.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CNAEFormTab
                companyId={company.id}
                onCNAEsChange={(cnaeIds, principalId) => {
                  setSelectedCnaeIds(cnaeIds)
                  setPrincipalCnaeId(principalId)
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 5: SST */}
        <TabsContent value="sst" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações de Segurança e Saúde do Trabalho</CardTitle>
              <CardDescription>Dados técnicos para gestão de SST</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-4">
                <p className="text-sm text-blue-900">
                  <strong>Nota:</strong> O grau de risco é determinado automaticamente com base no CNAE principal da empresa (definido na aba CNAEs).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="numeroFuncionarios">Número de Funcionários</Label>
                  <Input id="numeroFuncionarios" name="numeroFuncionarios" type="number" defaultValue={company.numeroFuncionarios || ''} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="numeroTurnos">Número de Turnos</Label>
                  <Input id="numeroTurnos" name="numeroTurnos" type="number" defaultValue={company.numeroTurnos || ''} placeholder="Ex: 1, 2, 3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jornada">Jornada de Trabalho</Label>
                  <Input id="jornada" name="jornada" defaultValue={company.jornada || ''} placeholder="Ex: 8h/dia - 44h/semana" />
                </div>
                <div className="flex items-center space-x-2 pt-8">
                  <Checkbox id="temSesmt" name="temSesmt" defaultChecked={company.temSesmt} />
                  <Label htmlFor="temSesmt" className="cursor-pointer">Possui SESMT</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Aba 6: Complementares */}
        <TabsContent value="additional" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Complementares</CardTitle>
              <CardDescription>Dados adicionais da empresa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="descricaoNegocio">Descrição do Negócio</Label>
                <Textarea id="descricaoNegocio" name="descricaoNegocio" defaultValue={company.descricaoNegocio || ''} rows={3} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="missao">Missão</Label>
                <Textarea id="missao" name="missao" defaultValue={company.missao || ''} rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="visao">Visão</Label>
                <Textarea id="visao" name="visao" defaultValue={company.visao || ''} rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valores">Valores</Label>
                <Textarea id="valores" name="valores" defaultValue={company.valores || ''} rows={2} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações Internas</Label>
                <Textarea id="observacoes" name="observacoes" defaultValue={company.observacoes || ''} rows={3} placeholder="Anotações internas relevantes" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="flex gap-4 justify-end mt-6">
        <Button type="button" variant="outline" onClick={() => router.back()} disabled={isSubmitting}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </>
          ) : (
            'Salvar Alterações'
          )}
        </Button>
      </div>
    </form>
  )
}
