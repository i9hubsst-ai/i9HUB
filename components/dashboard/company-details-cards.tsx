import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { MapPin, Phone, Mail, User, Shield, Briefcase, Building2 } from 'lucide-react'

interface CompanyDetailsCardsProps {
  company: any
}

export function CompanyDetailsCards({ company }: CompanyDetailsCardsProps) {
  return (
    <>
      {/* Dados Institucionais e Endereço */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Dados Institucionais
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {company.inscricaoEstadual && (
              <div>
                <span className="font-medium">Inscrição Estadual:</span> {company.inscricaoEstadual}
              </div>
            )}
            {company.inscricaoMunicipal && (
              <div>
                <span className="font-medium">Inscrição Municipal:</span> {company.inscricaoMunicipal}
              </div>
            )}
            {company.naturezaJuridica && (
              <div>
                <span className="font-medium">Natureza Jurídica:</span> {company.naturezaJuridica}
              </div>
            )}
            {company.ramoAtividade && (
              <div>
                <span className="font-medium">Ramo de Atividade:</span> {company.ramoAtividade}
              </div>
            )}
            {company.cnaePrincipal && (
              <div>
                <span className="font-medium">CNAE Principal:</span> {company.cnaePrincipal}
              </div>
            )}
            {company.cnaesSecundarios && company.cnaesSecundarios.length > 0 && (
              <div>
                <span className="font-medium">CNAEs Secundários:</span> {company.cnaesSecundarios.join(', ')}
              </div>
            )}
            {company.dataFundacao && (
              <div>
                <span className="font-medium">Data de Fundação:</span> {new Date(company.dataFundacao).toLocaleDateString('pt-BR')}
              </div>
            )}
            {!company.inscricaoEstadual && !company.naturezaJuridica && !company.ramoAtividade && (
              <p className="text-muted-foreground italic">Dados institucionais não cadastrados</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Endereço
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {company.endereco && (
              <div>
                {company.endereco}
                {company.numero && `, ${company.numero}`}
                {company.complemento && ` - ${company.complemento}`}
              </div>
            )}
            {company.bairro && <div>{company.bairro}</div>}
            {company.cidade && company.estado && (
              <div>{company.cidade} - {company.estado}</div>
            )}
            {company.cep && <div>CEP: {company.cep}</div>}
            
            {!company.endereco && !company.cidade && (
              <p className="text-muted-foreground italic">Endereço não cadastrado</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="h-5 w-5" />
              Contatos
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {company.telefone && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {company.telefone}
              </div>
            )}
            {company.telefone2 && (
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                {company.telefone2}
              </div>
            )}
            {company.email && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {company.email}
              </div>
            )}
            {company.emailInstitucional && (
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {company.emailInstitucional}
              </div>
            )}
            
            {!company.telefone && !company.email && (
              <p className="text-muted-foreground italic">Contatos não cadastrados</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Informações SST
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {company.grauRisco && (
              <div>
                <span className="font-medium">Grau de Risco:</span> {company.grauRisco}
              </div>
            )}
            {company.numeroFuncionarios && (
              <div>
                <span className="font-medium">Funcionários:</span> {company.numeroFuncionarios}
              </div>
            )}
            {company.numeroTurnos && (
              <div>
                <span className="font-medium">Turnos:</span> {company.numeroTurnos}
              </div>
            )}
            {company.jornada && (
              <div>
                <span className="font-medium">Jornada:</span> {company.jornada}
              </div>
            )}
            <div>
              <span className="font-medium">SESMT:</span> {company.temSesmt ? 'Sim' : 'Não'}
            </div>
            
            {!company.grauRisco && !company.numeroFuncionarios && (
              <p className="text-muted-foreground italic">Informações SST não cadastradas</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Responsáveis */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Responsável Legal
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {company.responsavelLegal ? (
              <>
                <div>
                  <span className="font-medium">Nome:</span> {company.responsavelLegal}
                </div>
                {company.responsavelLegalCargo && (
                  <div>
                    <span className="font-medium">Cargo:</span> {company.responsavelLegalCargo}
                  </div>
                )}
                {company.responsavelLegalEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {company.responsavelLegalEmail}
                  </div>
                )}
                {company.responsavelLegalTelefone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {company.responsavelLegalTelefone}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground italic">Responsável legal não cadastrado</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              Responsável Técnico SST
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            {company.responsavelTecnicoSST ? (
              <>
                <div>
                  <span className="font-medium">Nome:</span> {company.responsavelTecnicoSST}
                </div>
                {company.responsavelTecnicoCargo && (
                  <div>
                    <span className="font-medium">Cargo:</span> {company.responsavelTecnicoCargo}
                  </div>
                )}
                {company.responsavelTecnicoRegistro && (
                  <div>
                    <span className="font-medium">Registro:</span> {company.responsavelTecnicoRegistro}
                  </div>
                )}
                {company.responsavelTecnicoEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    {company.responsavelTecnicoEmail}
                  </div>
                )}
                {company.responsavelTecnicoTelefone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    {company.responsavelTecnicoTelefone}
                  </div>
                )}
              </>
            ) : (
              <p className="text-muted-foreground italic">Responsável técnico SST não cadastrado</p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Informações Complementares */}
      {(company.descricaoNegocio || company.missao || company.visao || company.valores || company.observacoes) && (
        <Card>
          <CardHeader>
            <CardTitle>Informações Complementares</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            {company.descricaoNegocio && (
              <div>
                <span className="font-medium block mb-1">Descrição do Negócio:</span>
                <p className="text-muted-foreground">{company.descricaoNegocio}</p>
              </div>
            )}
            {company.missao && (
              <div>
                <span className="font-medium block mb-1">Missão:</span>
                <p className="text-muted-foreground">{company.missao}</p>
              </div>
            )}
            {company.visao && (
              <div>
                <span className="font-medium block mb-1">Visão:</span>
                <p className="text-muted-foreground">{company.visao}</p>
              </div>
            )}
            {company.valores && (
              <div>
                <span className="font-medium block mb-1">Valores:</span>
                <p className="text-muted-foreground">{company.valores}</p>
              </div>
            )}
            {company.observacoes && (
              <div>
                <span className="font-medium block mb-1">Observações Internas:</span>
                <p className="text-muted-foreground">{company.observacoes}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  )
}
